/* eslint-disable */
// @ts-nocheck
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace CustomerModule {
  interface DefinedFields {
    Customer: 'id' | 'name';
    Query: 'getCustomers' | 'getCustomerById';
    Mutation: 'CreateCustomer' | 'UpdateCustomer';
  };
  
  interface DefinedInputFields {
    NewCustomerInput: 'name';
    UpdateCustomerInput: 'id' | 'name';
  };
  
  export type Customer = Pick<Types.Customer, DefinedFields['Customer']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type NewCustomerInput = Pick<Types.NewCustomerInput, DefinedInputFields['NewCustomerInput']>;
  export type UpdateCustomerInput = Pick<Types.UpdateCustomerInput, DefinedInputFields['UpdateCustomerInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type CustomerResolvers = Pick<Types.CustomerResolvers, DefinedFields['Customer'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    Customer?: CustomerResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Customer?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getCustomers?: gm.Middleware[];
      getCustomerById?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      CreateCustomer?: gm.Middleware[];
      UpdateCustomer?: gm.Middleware[];
    };
  };
}