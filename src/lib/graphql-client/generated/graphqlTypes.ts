/* eslint-disable */
// @ts-nocheck
import gql from 'graphql-tag';
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

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  customers?: Maybe<Array<Customer>>;
  id: Scalars['ID'];
  projects?: Maybe<Array<Project>>;
  street: Scalars['String'];
};

export type Contact = {
  __typename?: 'Contact';
  customer: Customer;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  projects?: Maybe<Array<Project>>;
};

export type Customer = {
  __typename?: 'Customer';
  address: Address;
  contacts?: Maybe<Array<Contact>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
  projects?: Maybe<Array<Project>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: Address;
  createContact: Contact;
  createCustomer: Customer;
  createProject: Project;
  updateAddress: Address;
  updateContact: Contact;
  updateCustomer: Customer;
  updateProject: Project;
};


export type MutationCreateAddressArgs = {
  input: NewAddressInput;
};


export type MutationCreateContactArgs = {
  input: NewContactInput;
};


export type MutationCreateCustomerArgs = {
  input: NewCustomerInput;
};


export type MutationCreateProjectArgs = {
  input: NewProjectInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type NewAddressInput = {
  city: Scalars['String'];
  street: Scalars['String'];
};

export type NewContactInput = {
  customerId: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};

export type NewCustomerInput = {
  addressId: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type NewProjectInput = {
  addressId: Scalars['ID'];
  customerId: Scalars['ID'];
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  address: Address;
  contacts?: Maybe<Array<Contact>>;
  customer?: Maybe<Customer>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAddresses?: Maybe<Array<Address>>;
  getCustomerById: Customer;
  getCustomers?: Maybe<Array<Customer>>;
  getProjectById: Project;
  getProjects?: Maybe<Array<Project>>;
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['ID'];
};

export type UpdateAddressInput = {
  city: Scalars['String'];
  id: Scalars['ID'];
  street: Scalars['String'];
};

export type UpdateContactInput = {
  customerId: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};

export type UpdateCustomerInput = {
  addressId: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateProjectInput = {
  addressId: Scalars['ID'];
  customerId: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
};
