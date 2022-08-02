import type { Resolvers } from './generated-types/graphql';
import AddressResolvers from './modules/Address/resolvers';
import CustomerResolvers from './modules/Customer/resolvers';
import ProjectResolvers from './modules/Project/resolvers';
import QueryResolvers from './modules/Query/resolvers';
import MutationResolvers from './modules/Mutation/resolvers';

const resolvers: Required<Resolvers> = {
	Address: AddressResolvers,
	Customer: CustomerResolvers,
	Mutation: MutationResolvers,
	Project: ProjectResolvers,
	Query: QueryResolvers
};

export default resolvers;
