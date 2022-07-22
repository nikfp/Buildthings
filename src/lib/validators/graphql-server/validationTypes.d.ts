/* eslint-disable */
// @ts-nocheck
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCustomer: Customer;
  UpdateCustomer: Customer;
  send: SendBack;
};


export type MutationCreateCustomerArgs = {
  input: NewCustomerInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationSendArgs = {
  input?: InputMaybe<SendInput>;
};

export type NewCustomerInput = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCustomerById: Customer;
  getCustomers?: Maybe<Array<Customer>>;
  greetings: Scalars['String'];
  hello: Scalars['String'];
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID'];
};

export type SendBack = {
  __typename?: 'SendBack';
  send: Scalars['String'];
};

export type SendInput = {
  numbers: Scalars['Int'];
  words: Scalars['String'];
};

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};
