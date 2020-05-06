import { takeWhile } from 'rxjs/operators';
import { ApiRx } from '@polkadot/api';
import { Option } from '@polkadot/types';
import { VoteRecord } from 'edgeware-node-types/dist/types';
import { IEdgewareSignalingProposal } from 'adapters/chain/edgeware/types';
import {
  Account, Proposal, ProposalStatus, ProposalEndTime, IVote, VotingType,
  VotingUnit, ChainClass, ChainEntity, ChainEvent
} from 'models';
import { default as SubstrateChain } from 'controllers/chain/substrate/shared';
import SubstrateAccounts, { SubstrateAccount } from 'controllers/chain/substrate/account';
import { BehaviorSubject, Unsubscribable } from 'rxjs';
import { SubstrateCoin } from 'adapters/chain/substrate/types';
import { ISubstrateSignalingNewProposal, SubstrateEventKind } from 'events/edgeware/types';
import { VoteOutcome } from 'edgeware-node-types/dist';
import EdgewareSignaling from './signaling';

export enum SignalingProposalStage {
  PreVoting = 'prevoting',
  Commit = 'commit',
  Voting = 'voting',
  Completed = 'completed',
}

const backportEventToAdapter = (
  ChainInfo: SubstrateChain,
  event: ISubstrateSignalingNewProposal,
): IEdgewareSignalingProposal => {
  return {
    identifier: event.voteId.toString(),
    voteIndex: +event.voteId,
    hash: event.proposalHash,
    author: event.proposer,
    title: event.title,
    description: event.description,
    tallyType: ChainInfo.createType('TallyType', event.tallyType),
    voteType: ChainInfo.createType('VoteType', event.voteType),
    choices: event.choices.map((c) => ChainInfo.createType('VoteOutcome', c)),
  };
};

export class SignalingVote implements IVote<SubstrateCoin> {
  public readonly account: SubstrateAccount;
  public readonly choices: VoteOutcome[];
  private _balance: SubstrateCoin;
  public get balance(): SubstrateCoin { return this._balance; }

  constructor(proposal: EdgewareSignalingProposal, account: SubstrateAccount, choices: VoteOutcome[]) {
    this.account = account;
    this.choices = choices;
    this.account.balance.pipe(takeWhile(() => !proposal.completed)).subscribe((bal) => { this._balance = bal; });
  }
}

export class EdgewareSignalingProposal
  extends Proposal<ApiRx, SubstrateCoin, IEdgewareSignalingProposal, SignalingVote> {
  public get shortIdentifier() {
    return `#${this.data.voteIndex.toString()}`;
  }
  public get title() { return this.data.title; }
  public get description() { return this.data.description; }
  public get author() { return this.data.author ? this._Accounts.fromAddress(this.data.author) : null; }

  public get support() {
    // TODO: support multi-option votes
    // TODO: support ranked-choice votes
    // TODO: support 1p1v
    if (this.getVotes().some((v) => v.balance === undefined)) {
      // balances haven't resolved yet!
      console.error('Balances haven\'t resolved');
      return 0;
    }
    const yesVotes = this.getVotes()
      .filter((vote) => vote.choices.length === 1
        && vote.choices[0].toHex() === this._Chain.createType('VoteOutcome', [1]).toHex());
    const noVotes = this.getVotes()
      .filter((vote) => vote.choices.length === 1
        && vote.choices[0].toHex() === this._Chain.createType('VoteOutcome', [0]).toHex());
    if (yesVotes.length === 0 && noVotes.length === 0) return 0;

    const yesSupport = yesVotes.reduce(((total, vote) => vote.balance.inDollars + total), 0);
    const noSupport = noVotes.reduce(((total, vote) => vote.balance.inDollars + total), 0);
    return yesSupport / (yesSupport + noSupport);
  }
  public get turnout() {
    if (this.getVotes().some((v) => v.balance === undefined)) {
      // balances haven't resolved yet!
      console.error('Balances haven\'t resolved');
      return 0;
    }
    const totalWeight = this.getVotes().reduce(
      (total, vote) => this._Chain.coins(vote.balance.add(total)),
      this._Chain.coins(0)
    );
    return totalWeight.inDollars / this._Chain.totalbalance.inDollars;
  }

  public get votingType() {
    // TODO: support ranked-choice votes
    return (this.data.voteType.toString() === 'binary')
      ? VotingType.SimpleYesNoVoting // TODO: generalize this to what the options are
      : (this.data.voteType.toString() === 'multioption')
        ? VotingType.MultiOptionVoting
        : VotingType.RankedChoiceVoting;
  }
  public get votingUnit() {
    return VotingUnit.CoinVote;
  }
  public canVoteFrom(account : Account<any>) {
    return account.chainClass === ChainClass.Edgeware;
  }
  get isPassing() {
    return ProposalStatus.None;
  }

  private _stage: BehaviorSubject<SignalingProposalStage> = new BehaviorSubject(SignalingProposalStage.PreVoting);
  get stage() {
    return this._stage.getValue();
  }

  private _endBlock: BehaviorSubject<number> = new BehaviorSubject(undefined);
  get endTime(): ProposalEndTime {
    return this.completed
      ? { kind: 'unavailable' }
      : this._endBlock.getValue()
        ? { kind: 'fixed_block', blocknum: this._endBlock.getValue() }
        : { kind: 'not_started' };
  }

  // CONSTRUCTOR
  private _Chain: SubstrateChain;
  private _Accounts: SubstrateAccounts;
  private _Signaling: EdgewareSignaling;

  constructor(
    ChainInfo: SubstrateChain,
    Accounts: SubstrateAccounts,
    Signaling: EdgewareSignaling,
    entity: ChainEntity,
  ) {
    super('signalingproposal', backportEventToAdapter(
      ChainInfo,
      entity.chainEvents
        .find((e) => e.data.kind === SubstrateEventKind.SignalingNewProposal).data as ISubstrateSignalingNewProposal
    ));
    this._Chain = ChainInfo;
    this._Accounts = Accounts;
    this._Signaling = Signaling;

    entity.chainEvents.forEach((e) => this.update(e));

    this._initialized.next(true);
    this._subscribeVoters();
    this._Signaling.store.add(this);
  }

  protected complete() {
    super.complete(this._Signaling.store);
  }

  public update(e: ChainEvent) {
    switch (e.data.kind) {
      case SubstrateEventKind.SignalingNewProposal: {
        break;
      }
      case SubstrateEventKind.SignalingCommitStarted: {
        if (this.stage !== SignalingProposalStage.PreVoting) {
          throw new Error('signaling stage out of order!');
        }
        this._stage.next(SignalingProposalStage.Commit);
        this._endBlock.next(e.data.endBlock);
        break;
      }
      case SubstrateEventKind.SignalingVotingStarted: {
        if (this.stage !== SignalingProposalStage.Commit && this.stage !== SignalingProposalStage.PreVoting) {
          throw new Error('signaling stage out of order!');
        }
        this._stage.next(SignalingProposalStage.Voting);
        this._endBlock.next(e.data.endBlock);
        break;
      }
      case SubstrateEventKind.SignalingVotingCompleted: {
        if (this.stage !== SignalingProposalStage.Voting) {
          throw new Error('signaling stage out of order!');
        }
        this._stage.next(SignalingProposalStage.Completed);
        this.complete();
        break;
      }
      default: {
        throw new Error('invalid event update');
      }
    }
  }

  private _subscribeVoters(): Unsubscribable {
    return this._Chain.query((api) => api.query.voting.voteRecords<Option<VoteRecord>>(this.data.voteIndex))
      .pipe(takeWhile((v) => v.isSome && this.initialized && !this.completed))
      .subscribe((v) => {
        const record = v.unwrap();
        // eslint-disable-next-line no-restricted-syntax
        for (const [ voter, reveals ] of record.reveals) {
          const acct = this._Accounts.fromAddress(voter.toString());
          this.addOrUpdateVote(new SignalingVote(this, acct, reveals));
        }
      });
  }

  public submitVoteTx(vote: SignalingVote) {
    if (this.stage !== SignalingProposalStage.Voting) {
      throw new Error('Proposal not in voting stage');
    }
    if (vote.choices.find((p) => !this.data.choices.map((d) => d.toHex()).includes(p.toHex()))) {
      throw new Error('invalid choice in vote');
    }
    if (this.data.voteType.toString() === 'RankedChoice') {
      if (vote.choices.length !== this.data.choices.length) {
        throw new Error('must provide rankings for all choices');
      }
    } else {
      if (vote.choices.length !== 1) {
        throw new Error('can only vote for one option');
      }
    }
    return this._Chain.createTXModalData(
      vote.account,
      (api: ApiRx) => api.tx.voting.reveal(this.data.voteIndex, vote.choices, null),
      'submitSignalingVote',
      this.title
    );
  }
}