/* eslint-disable */
// @ts-nocheck
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace AddressModule {
  interface DefinedFields {
    Address: 'id' | 'street' | 'city' | 'projects' | 'customers';
    Query: 'getAddresses';
    Mutation: 'createAddress' | 'updateAddress';
    Customer: 'address';
    Project: 'address';
  };
  
  interface DefinedInputFields {
    NewAddressInput: 'street' | 'city';
    UpdateAddressInput: 'id' | 'street' | 'city';
  };
  
  export type Address = Pick<Types.Address, DefinedFields['Address']>;
  export type Project = Types.Project;
  export type Customer = Types.Customer;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type NewAddressInput = Pick<Types.NewAddressInput, DefinedInputFields['NewAddressInput']>;
  export type UpdateAddressInput = Pick<Types.UpdateAddressInput, DefinedInputFields['UpdateAddressInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type AddressResolvers = Pick<Types.AddressResolvers, DefinedFields['Address'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type CustomerResolvers = Pick<Types.CustomerResolvers, DefinedFields['Customer']>;
  export type ProjectResolvers = Pick<Types.ProjectResolvers, DefinedFields['Project']>;
  
  export interface Resolvers {
    Address?: AddressResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Customer?: CustomerResolvers;
    Project?: ProjectResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Address?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      street?: gm.Middleware[];
      city?: gm.Middleware[];
      projects?: gm.Middleware[];
      customers?: gm.Middleware[];
    };
    Customer?: {
      '*'?: gm.Middleware[];
      address?: gm.Middleware[];
    };
    Project?: {
      '*'?: gm.Middleware[];
      address?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getAddresses?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createAddress?: gm.Middleware[];
      updateAddress?: gm.Middleware[];
    };
  };
}