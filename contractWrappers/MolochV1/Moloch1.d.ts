/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface Moloch1Contract extends Truffle.Contract<Moloch1Instance> {
  "new"(
    summoner: string,
    _approvedToken: string,
    _periodDuration: number | BN | string,
    _votingPeriodLength: number | BN | string,
    _gracePeriodLength: number | BN | string,
    _abortWindow: number | BN | string,
    _proposalDeposit: number | BN | string,
    _dilutionBound: number | BN | string,
    _processingReward: number | BN | string,
    meta?: Truffle.TransactionDetails
  ): Promise<Moloch1Instance>;
}

export interface Abort {
  name: "Abort";
  args: {
    proposalIndex: BN;
    applicantAddress: string;
    0: BN;
    1: string;
  };
}

export interface ProcessProposal {
  name: "ProcessProposal";
  args: {
    proposalIndex: BN;
    applicant: string;
    memberAddress: string;
    tokenTribute: BN;
    sharesRequested: BN;
    didPass: boolean;
    0: BN;
    1: string;
    2: string;
    3: BN;
    4: BN;
    5: boolean;
  };
}

export interface Ragequit {
  name: "Ragequit";
  args: {
    memberAddress: string;
    sharesToBurn: BN;
    0: string;
    1: BN;
  };
}

export interface SubmitProposal {
  name: "SubmitProposal";
  args: {
    proposalIndex: BN;
    delegateKey: string;
    memberAddress: string;
    applicant: string;
    tokenTribute: BN;
    sharesRequested: BN;
    0: BN;
    1: string;
    2: string;
    3: string;
    4: BN;
    5: BN;
  };
}

export interface SubmitVote {
  name: "SubmitVote";
  args: {
    proposalIndex: BN;
    delegateKey: string;
    memberAddress: string;
    uintVote: BN;
    0: BN;
    1: string;
    2: string;
    3: BN;
  };
}

export interface SummonComplete {
  name: "SummonComplete";
  args: {
    summoner: string;
    shares: BN;
    0: string;
    1: BN;
  };
}

export interface UpdateDelegateKey {
  name: "UpdateDelegateKey";
  args: {
    memberAddress: string;
    newDelegateKey: string;
    0: string;
    1: string;
  };
}

type AllEvents =
  | Abort
  | ProcessProposal
  | Ragequit
  | SubmitProposal
  | SubmitVote
  | SummonComplete
  | UpdateDelegateKey;

export interface Moloch1Instance extends Truffle.ContractInstance {
  abortWindow(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  approvedToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  dilutionBound(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  gracePeriodLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  guildBank(txDetails?: Truffle.TransactionDetails): Promise<string>;

  memberAddressByDelegateKey(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  members(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[string, BN, boolean, BN]>;

  periodDuration(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  processingReward(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  proposalDeposit(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  proposalQueue(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    [string, string, BN, BN, BN, BN, boolean, boolean, boolean, BN, string, BN]
  >;

  summoningTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  totalShares(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  totalSharesRequested(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  votingPeriodLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * *************** PROPOSAL FUNCTIONS****************
   */
  submitProposal: {
    (
      applicant: string,
      tokenTribute: number | BN | string,
      sharesRequested: number | BN | string,
      details: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      applicant: string,
      tokenTribute: number | BN | string,
      sharesRequested: number | BN | string,
      details: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      applicant: string,
      tokenTribute: number | BN | string,
      sharesRequested: number | BN | string,
      details: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      applicant: string,
      tokenTribute: number | BN | string,
      sharesRequested: number | BN | string,
      details: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  submitVote: {
    (
      proposalIndex: number | BN | string,
      uintVote: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      proposalIndex: number | BN | string,
      uintVote: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      proposalIndex: number | BN | string,
      uintVote: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      proposalIndex: number | BN | string,
      uintVote: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  processProposal: {
    (
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  ragequit: {
    (
      sharesToBurn: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      sharesToBurn: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      sharesToBurn: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      sharesToBurn: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  abort: {
    (
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  updateDelegateKey: {
    (newDelegateKey: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newDelegateKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newDelegateKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newDelegateKey: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getCurrentPeriod(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  getProposalQueueLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  canRagequit(
    highestIndexYesVote: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  hasVotingPeriodExpired(
    startingPeriod: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  getMemberProposalVote(
    memberAddress: string,
    proposalIndex: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  methods: {
    abortWindow(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    approvedToken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    dilutionBound(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    gracePeriodLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    guildBank(txDetails?: Truffle.TransactionDetails): Promise<string>;

    memberAddressByDelegateKey(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    members(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<[string, BN, boolean, BN]>;

    periodDuration(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    processingReward(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    proposalDeposit(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    proposalQueue(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      [
        string,
        string,
        BN,
        BN,
        BN,
        BN,
        boolean,
        boolean,
        boolean,
        BN,
        string,
        BN
      ]
    >;

    summoningTime(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    totalShares(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    totalSharesRequested(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    votingPeriodLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * *************** PROPOSAL FUNCTIONS****************
     */
    submitProposal: {
      (
        applicant: string,
        tokenTribute: number | BN | string,
        sharesRequested: number | BN | string,
        details: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        applicant: string,
        tokenTribute: number | BN | string,
        sharesRequested: number | BN | string,
        details: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        applicant: string,
        tokenTribute: number | BN | string,
        sharesRequested: number | BN | string,
        details: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        applicant: string,
        tokenTribute: number | BN | string,
        sharesRequested: number | BN | string,
        details: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    submitVote: {
      (
        proposalIndex: number | BN | string,
        uintVote: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        proposalIndex: number | BN | string,
        uintVote: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        proposalIndex: number | BN | string,
        uintVote: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        proposalIndex: number | BN | string,
        uintVote: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    processProposal: {
      (
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    ragequit: {
      (
        sharesToBurn: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        sharesToBurn: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        sharesToBurn: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        sharesToBurn: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    abort: {
      (
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        proposalIndex: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    updateDelegateKey: {
      (newDelegateKey: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newDelegateKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newDelegateKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newDelegateKey: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getCurrentPeriod(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    getProposalQueueLength(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    canRagequit(
      highestIndexYesVote: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    hasVotingPeriodExpired(
      startingPeriod: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    getMemberProposalVote(
      memberAddress: string,
      proposalIndex: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}