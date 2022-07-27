/* eslint-disable */
// @ts-nocheck
import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace ProjectModule {
  interface DefinedFields {
    Project: 'id' | 'name' | 'customer';
    Query: 'getProjects' | 'getProjectById';
    Mutation: 'createProject' | 'updateProject';
    Customer: 'projects';
  };
  
  interface DefinedInputFields {
    NewProjectInput: 'name' | 'customerId';
    UpdateProjectInput: 'id' | 'name' | 'customerId';
  };
  
  export type Project = Pick<Types.Project, DefinedFields['Project']>;
  export type Customer = Types.Customer;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type NewProjectInput = Pick<Types.NewProjectInput, DefinedInputFields['NewProjectInput']>;
  export type UpdateProjectInput = Pick<Types.UpdateProjectInput, DefinedInputFields['UpdateProjectInput']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type ProjectResolvers = Pick<Types.ProjectResolvers, DefinedFields['Project'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type CustomerResolvers = Pick<Types.CustomerResolvers, DefinedFields['Customer']>;
  
  export interface Resolvers {
    Project?: ProjectResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Customer?: CustomerResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Project?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      customer?: gm.Middleware[];
    };
    Customer?: {
      '*'?: gm.Middleware[];
      projects?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getProjects?: gm.Middleware[];
      getProjectById?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createProject?: gm.Middleware[];
      updateProject?: gm.Middleware[];
    };
  };
}