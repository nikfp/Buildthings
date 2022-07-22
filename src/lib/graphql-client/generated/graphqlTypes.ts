/* eslint-disable */
// @ts-nocheck
import gql from 'graphql-tag';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type HelloThereQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloThereQuery = { __typename?: 'Query', hello: string };

export type SendItMutationVariables = Exact<{
  input: SendInput;
}>;


export type SendItMutation = { __typename?: 'Mutation', send: { __typename?: 'SendBack', send: string } };


export const HelloThere = gql`
    query HelloThere {
  hello
}
    `;
export const SendIt = gql`
    mutation SendIt($input: SendInput!) {
  send(input: $input) {
    send
  }
}
    `;

export const HelloThereDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloThere"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"}}]}}]} as unknown as DocumentNode<HelloThereQuery, HelloThereQueryVariables>;
export const SendItDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendIt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"send"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"send"}}]}}]}}]} as unknown as DocumentNode<SendItMutation, SendItMutationVariables>;