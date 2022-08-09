/* eslint-disable */
// @ts-nocheck
// @ts-ignore
import type { GraphQLResolveInfo } from 'graphql';
import type { Customer as CustomerModel } from './src/lib/graphql-server/providers/database';
import type { Project as ProjectModel, Address as AddressModel, Contact as ContactModel } from '../providers/database';
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
  Contact: ResolverTypeWrapper<ContactModel>;
  Customer: ResolverTypeWrapper<CustomerModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  NewAddressInput: NewAddressInput;
  NewContactInput: NewContactInput;
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: ResolverTypeWrapper<ProjectModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateContactInput: UpdateContactInput;
  UpdateCustomerInput: UpdateCustomerInput;
  UpdateProjectInput: UpdateProjectInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: AddressModel;
  Boolean: Scalars['Boolean'];
  Contact: ContactModel;
  Customer: CustomerModel;
  ID: Scalars['ID'];
  Mutation: {};
  NewAddressInput: NewAddressInput;
  NewContactInput: NewContactInput;
  NewCustomerInput: NewCustomerInput;
  NewProjectInput: NewProjectInput;
  Project: ProjectModel;
  Query: {};
  String: Scalars['String'];
  UpdateAddressInput: UpdateAddressInput;
  UpdateContactInput: UpdateContactInput;
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

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Maybe<Array<ResolversTypes['Project']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  updateAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'input'>>;
  updateCustomer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<MutationUpdateCustomerArgs, 'input'>>;
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'input'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['Contact']>>, ParentType, ContextType>;
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
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

