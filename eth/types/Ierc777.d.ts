/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface Ierc777Contract extends Truffle.Contract<Ierc777Instance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<Ierc777Instance>;
}

export interface AuthorizedOperator {
  name: "AuthorizedOperator";
  args: {
    operator: string;
    tokenHolder: string;
    0: string;
    1: string;
  };
}

export interface Burned {
  name: "Burned";
  args: {
    operator: string;
    from: string;
    amount: BN;
    data: string;
    operatorData: string;
    0: string;
    1: string;
    2: BN;
    3: string;
    4: string;
  };
}

export interface Minted {
  name: "Minted";
  args: {
    operator: string;
    to: string;
    amount: BN;
    data: string;
    operatorData: string;
    0: string;
    1: string;
    2: BN;
    3: string;
    4: string;
  };
}

export interface RevokedOperator {
  name: "RevokedOperator";
  args: {
    operator: string;
    tokenHolder: string;
    0: string;
    1: string;
  };
}

export interface Sent {
  name: "Sent";
  args: {
    operator: string;
    from: string;
    to: string;
    amount: BN;
    data: string;
    operatorData: string;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: string;
    5: string;
  };
}

type AllEvents = AuthorizedOperator | Burned | Minted | RevokedOperator | Sent;

export interface Ierc777Instance extends Truffle.ContractInstance {
  /**
   * Returns the name of the token.
   */
  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the symbol of the token, usually a shorter version of the name.
   */
  symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the smallest part of the token that is not divisible. This means all token operations (creation, movement and destruction) must have amounts that are a multiple of this number.     * For most token contracts, this value will equal 1.
   */
  granularity(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Returns the amount of tokens in existence.
   */
  totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Returns the amount of tokens owned by an account (`owner`).
   */
  balanceOf(owner: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Moves `amount` tokens from the caller's account to `recipient`.     * If send or receive hooks are registered for the caller and `recipient`, the corresponding functions will be called with `data` and empty `operatorData`. See {IERC777Sender} and {IERC777Recipient}.     * Emits a {Sent} event.     * Requirements     * - the caller must have at least `amount` tokens. - `recipient` cannot be the zero address. - if `recipient` is a contract, it must implement the {IERC777Recipient} interface.
   */
  send: {
    (
      recipient: string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      recipient: string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      recipient: string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      recipient: string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Destroys `amount` tokens from the caller's account, reducing the total supply.     * If a send hook is registered for the caller, the corresponding function will be called with `data` and empty `operatorData`. See {IERC777Sender}.     * Emits a {Burned} event.     * Requirements     * - the caller must have at least `amount` tokens.
   */
  burn: {
    (
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Returns true if an account is an operator of `tokenHolder`. Operators can send and burn tokens on behalf of their owners. All accounts are their own operator.     * See {operatorSend} and {operatorBurn}.
   */
  isOperatorFor(
    operator: string,
    tokenHolder: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  /**
   * Make an account an operator of the caller.     * See {isOperatorFor}.     * Emits an {AuthorizedOperator} event.     * Requirements     * - `operator` cannot be calling address.
   */
  authorizeOperator: {
    (operator: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Make an account an operator of the caller.     * See {isOperatorFor} and {defaultOperators}.     * Emits a {RevokedOperator} event.     * Requirements     * - `operator` cannot be calling address.
   */
  revokeOperator: {
    (operator: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Returns the list of default operators. These accounts are operators for all token holders, even if {authorizeOperator} was never called on them.     * This list is immutable, but individual holders may revoke these via {revokeOperator}, in which case {isOperatorFor} will return false.
   */
  defaultOperators(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

  /**
   * Moves `amount` tokens from `sender` to `recipient`. The caller must be an operator of `sender`.     * If send or receive hooks are registered for `sender` and `recipient`, the corresponding functions will be called with `data` and `operatorData`. See {IERC777Sender} and {IERC777Recipient}.     * Emits a {Sent} event.     * Requirements     * - `sender` cannot be the zero address. - `sender` must have at least `amount` tokens. - the caller must be an operator for `sender`. - `recipient` cannot be the zero address. - if `recipient` is a contract, it must implement the {IERC777Recipient} interface.
   */
  operatorSend: {
    (
      sender: string,
      recipient: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      sender: string,
      recipient: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      sender: string,
      recipient: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      sender: string,
      recipient: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Destoys `amount` tokens from `account`, reducing the total supply. The caller must be an operator of `account`.     * If a send hook is registered for `account`, the corresponding function will be called with `data` and `operatorData`. See {IERC777Sender}.     * Emits a {Burned} event.     * Requirements     * - `account` cannot be the zero address. - `account` must have at least `amount` tokens. - the caller must be an operator for `account`.
   */
  operatorBurn: {
    (
      account: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      account: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      account: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      account: string,
      amount: number | BN | string,
      data: string,
      operatorData: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    /**
     * Returns the name of the token.
     */
    name(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the symbol of the token, usually a shorter version of the name.
     */
    symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the smallest part of the token that is not divisible. This means all token operations (creation, movement and destruction) must have amounts that are a multiple of this number.     * For most token contracts, this value will equal 1.
     */
    granularity(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Returns the amount of tokens in existence.
     */
    totalSupply(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Returns the amount of tokens owned by an account (`owner`).
     */
    balanceOf(
      owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * Moves `amount` tokens from the caller's account to `recipient`.     * If send or receive hooks are registered for the caller and `recipient`, the corresponding functions will be called with `data` and empty `operatorData`. See {IERC777Sender} and {IERC777Recipient}.     * Emits a {Sent} event.     * Requirements     * - the caller must have at least `amount` tokens. - `recipient` cannot be the zero address. - if `recipient` is a contract, it must implement the {IERC777Recipient} interface.
     */
    send: {
      (
        recipient: string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        recipient: string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        recipient: string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        recipient: string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Destroys `amount` tokens from the caller's account, reducing the total supply.     * If a send hook is registered for the caller, the corresponding function will be called with `data` and empty `operatorData`. See {IERC777Sender}.     * Emits a {Burned} event.     * Requirements     * - the caller must have at least `amount` tokens.
     */
    burn: {
      (
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Returns true if an account is an operator of `tokenHolder`. Operators can send and burn tokens on behalf of their owners. All accounts are their own operator.     * See {operatorSend} and {operatorBurn}.
     */
    isOperatorFor(
      operator: string,
      tokenHolder: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    /**
     * Make an account an operator of the caller.     * See {isOperatorFor}.     * Emits an {AuthorizedOperator} event.     * Requirements     * - `operator` cannot be calling address.
     */
    authorizeOperator: {
      (operator: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Make an account an operator of the caller.     * See {isOperatorFor} and {defaultOperators}.     * Emits a {RevokedOperator} event.     * Requirements     * - `operator` cannot be calling address.
     */
    revokeOperator: {
      (operator: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        operator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Returns the list of default operators. These accounts are operators for all token holders, even if {authorizeOperator} was never called on them.     * This list is immutable, but individual holders may revoke these via {revokeOperator}, in which case {isOperatorFor} will return false.
     */
    defaultOperators(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

    /**
     * Moves `amount` tokens from `sender` to `recipient`. The caller must be an operator of `sender`.     * If send or receive hooks are registered for `sender` and `recipient`, the corresponding functions will be called with `data` and `operatorData`. See {IERC777Sender} and {IERC777Recipient}.     * Emits a {Sent} event.     * Requirements     * - `sender` cannot be the zero address. - `sender` must have at least `amount` tokens. - the caller must be an operator for `sender`. - `recipient` cannot be the zero address. - if `recipient` is a contract, it must implement the {IERC777Recipient} interface.
     */
    operatorSend: {
      (
        sender: string,
        recipient: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        sender: string,
        recipient: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        sender: string,
        recipient: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        sender: string,
        recipient: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Destoys `amount` tokens from `account`, reducing the total supply. The caller must be an operator of `account`.     * If a send hook is registered for `account`, the corresponding function will be called with `data` and `operatorData`. See {IERC777Sender}.     * Emits a {Burned} event.     * Requirements     * - `account` cannot be the zero address. - `account` must have at least `amount` tokens. - the caller must be an operator for `account`.
     */
    operatorBurn: {
      (
        account: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        account: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        account: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        account: string,
        amount: number | BN | string,
        data: string,
        operatorData: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
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
