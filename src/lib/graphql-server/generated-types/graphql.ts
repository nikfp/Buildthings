/* eslint-disable */
// @ts-nocheck
import type { GraphQLResolveInfo } from 'graphql';
import type { Customer as CustomerModel, Project as ProjectModel, Address as AddressModel } from '../providers/database';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Customer = {
  __typename?: 'Customer';
  address: Address;
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
  projects?: Maybe<Array<Project>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCustomer: Customer;
  UpdateCustomer: Customer;
  createAddress: Address;
  createProject: Project;
  send: SendBack;
  updateAddress: Address;
  updateProject: Project;
};


export type MutationCreateCustomerArgs = {
  input: NewCustomerInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationCreateAddressArgs = {
  input: NewAddressInput;
};


export type MutationCreateProjectArgs = {
  input: NewProjectInput;
};


export type MutationSendArgs = {
  input?: InputMaybe<SendInput>;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type NewAddressInput = {
  city: Scalars['String'];
  street: Scalars['String'];
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
  greetings: Scalars['String'];
  hello: Scalars['String'];
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectByIdArgs = {
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

export type UpdateAddressInput = {
  city: Scalars['String'];
  id: Scalars['ID'];
  street: Scalars['String'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<AddressModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Customer: ResolverTypeWrapper<CustomerModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewAddressInput: NewAddressInput;
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: ResolverTypeWrapper<ProjectModel>;
  Query: ResolverTypeWrapper<{}>;
  SendBack: ResolverTypeWrapper<SendBack>;
  SendInput: SendInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateProjectInput: UpdateProjectInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: AddressModel;
  Boolean: Scalars['Boolean'];
  Customer: CustomerModel;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  NewAddressInput: NewAddressInput;
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: ProjectModel;
  Query: {};
  SendBack: SendBack;
  SendInput: SendInput;
  String: Scalars['String'];
  UpdateAddressInput: UpdateAddressInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateProjectInput: UpdateProjectInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  CreateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  UpdateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'input'>>;
  createAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  send?: Resolver<ResolversTypes['SendBack'], ParentType, ContextType, Partial<MutationSendArgs>>;
  updateAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'input'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'input'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAddresses?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
  getCustomerById?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QueryGetCustomerByIdArgs, 'id'>>;
  getCustomers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
  getProjectById?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryGetProjectByIdArgs, 'id'>>;
  getProjects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SendBackResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendBack'] = ResolversParentTypes['SendBack']> = {
  send?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SendBack?: SendBackResolvers<ContextType>;
};

