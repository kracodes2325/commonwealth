import app from 'state';

import EdgewareChain from 'controllers/chain/edgeware/shared';
import SubstrateAccounts, { SubstrateAccount } from 'controllers/chain/substrate/account';
import SubstrateDemocracy from 'controllers/chain/substrate/democracy';
import SubstrateDemocracyProposals from 'controllers/chain/substrate/democracy_proposals';
import { SubstrateCouncil } from 'controllers/chain/substrate/collective';
import SubstrateTreasury from 'controllers/chain/substrate/treasury';
import SubstratePhragmenElections from 'controllers/chain/substrate/phragmen_elections';

import { ChainClass, IChainAdapter, ChainBase } from 'models/models';
import { u128 } from '@polkadot/types';
import { SubstrateCoin } from 'shared/adapters/chain/substrate/types';
import EdgewareSignaling from './signaling';
import ProposalArchiveController from '../../server/proposals';
import WebWalletController from '../../app/web_wallet';
import SubstrateIdentities from '../substrate/identity';

import * as edgewareDefinitions from 'edgeware-node-types/dist/definitions';

class Edgeware extends IChainAdapter<SubstrateCoin, SubstrateAccount> {
  public readonly chain: EdgewareChain = new EdgewareChain(); // edgeware chain id

  public readonly accounts: SubstrateAccounts = new SubstrateAccounts();

  public readonly phragmenElections: SubstratePhragmenElections = new SubstratePhragmenElections();

  public readonly council: SubstrateCouncil = new SubstrateCouncil();

  public readonly identities: SubstrateIdentities = new SubstrateIdentities();

  // eslint-disable-next-line max-len
  public readonly democracyProposals: SubstrateDemocracyProposals = new SubstrateDemocracyProposals();

  public readonly democracy: SubstrateDemocracy = new SubstrateDemocracy();

  public readonly treasury: SubstrateTreasury = new SubstrateTreasury();

  public readonly signaling: EdgewareSignaling = new EdgewareSignaling();

  public readonly server = {
    //proposals: new ProposalArchiveController(),
  };

  public readonly webWallet: WebWalletController = new WebWalletController();

  public readonly base = ChainBase.Substrate;

  public readonly class = ChainClass.Edgeware;

  private _loaded: boolean = false;

  get loaded() { return this._loaded; }

  private _serverLoaded: boolean = false;

  get serverLoaded() { return this._serverLoaded; }

  public init = async (onServerLoaded?) => {
    console.log(`Starting ${this.meta.chain.id} on node: ${this.meta.url}`);

    await app.threads.refreshAll(this.id, null, true);
    await app.comments.refreshAll(this.id, null, true);
    await app.reactions.refreshAll(this.id, null, true);
    //await this.server.proposals.init();
    this._serverLoaded = true;
    if (onServerLoaded) await onServerLoaded();

    const types = Object.values(edgewareDefinitions).reduce((res, { types }): object => ({ ...res, ...types }), {});

    await this.chain.resetApi(this.meta, {
      types: {
        ...types,
        // aliases that don't do well as part of interfaces
        'voting::VoteType': 'VoteType',
        'voting::TallyType': 'TallyType',
        // chain-specific overrides
        Address: 'GenericAddress',
        Keys: 'SessionKeys4',
        StakingLedger: 'StakingLedgerTo223',
        Votes: 'VotesTo230',
        ReferendumInfo: 'ReferendumInfoTo239',
      },
      // override duplicate type name
      typesAlias: { voting: { Tally: 'VotingTally' } },
    });
    await this.chain.initMetadata();
    await this.accounts.init(this.chain);
    await Promise.all([
      this.phragmenElections.init(this.chain, this.accounts, 'elections'),
      this.council.init(this.chain, this.accounts),
      this.democracyProposals.init(this.chain, this.accounts),
      this.democracy.init(this.chain, this.accounts),
      this.treasury.init(this.chain, this.accounts),
      this.identities.init(this.chain, this.accounts),
      this.signaling.init(this.chain, this.accounts),
    ]);
    await this.chain.initEventLoop();

    this._loaded = true;
  }

  public deinit = async (): Promise<void> => {
    this._loaded = false;
    this._serverLoaded = false;
    app.threads.deinit();
    app.comments.deinit();
    app.reactions.deinit();
    //this.server.proposals.deinit();
    this.chain.deinitEventLoop();
    await Promise.all([
      this.phragmenElections.deinit(),
      this.council.deinit(),
      this.democracyProposals.deinit(),
      this.democracy.deinit(),
      this.treasury.deinit(),
      this.identities.deinit(),
      this.signaling.deinit(),
    ]);
    this.accounts.deinit();
    this.chain.deinitMetadata();
    this.chain.deinitApi();
    console.log('Edgeware stopped.');
  }
}

export default Edgeware;