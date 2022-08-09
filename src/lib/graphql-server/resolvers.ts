import type { Resolvers } from './generated-types/graphql';
import AddressResolvers from './modules/Address/resolvers';
import ContactResolvers from './modules/Contact/resolvers';
import CustomerResolvers from './modules/Customer/resolvers';
import MutationResolvers from './modules/Mutation/resolvers';
import ProjectResolvers from './modules/Project/resolvers';
import QueryResolvers from './modules/Query/resolvers';

const resolvers: Required<Resolvers> = {
	Address: AddressResolvers,
	Contact: ContactResolvers,
	Customer: CustomerResolvers,
	Mutation: MutationResolvers,
	Project: ProjectResolvers,
	Query: QueryResolvers
};

export default resolvers;
