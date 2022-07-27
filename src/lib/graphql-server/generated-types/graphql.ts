/* eslint-disable */
// @ts-nocheck
import type { GraphQLResolveInfo } from 'graphql';
import type { Customer } from './src/lib/graphql-server/providers/database';
import type { Project } from '../providers/database';
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

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
  projects?: Maybe<Array<Project>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateCustomer: Customer;
  UpdateCustomer: Customer;
  createProject: Project;
  send: SendBack;
  updateProject: Project;
};


export type MutationCreateCustomerArgs = {
  input: NewCustomerInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationCreateProjectArgs = {
  input: NewProjectInput;
};


export type MutationSendArgs = {
  input?: InputMaybe<SendInput>;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type NewCustomerInput = {
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type NewProjectInput = {
  customerId: Scalars['ID'];
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  customer?: Maybe<Customer>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
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

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateProjectInput = {
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Customer: ResolverTypeWrapper<Customer>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  SendBack: ResolverTypeWrapper<SendBack>;
  SendInput: SendInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateProjectInput: UpdateProjectInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Customer: Customer;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: Project;
  Query: {};
  SendBack: SendBack;
  SendInput: SendInput;
  String: Scalars['String'];
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateProjectInput: UpdateProjectInput;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  CreateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  UpdateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  send?: Resolver<ResolversTypes['SendBack'], ParentType, ContextType, Partial<MutationSendArgs>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'input'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
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
  Customer?: CustomerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SendBack?: SendBackResolvers<ContextType>;
};

