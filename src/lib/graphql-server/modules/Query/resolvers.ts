import type { EntityResolvers } from '../../Resolvertypes';
import type { QueryResolvers } from '../../generated-types/graphql';
import { getAddresses } from '../Address/addressService';
import { getCustomerById, getCustomers } from '../Customer/customerService';
import { getProjectById, getProjects } from '../Project/projectService';

const resolvers: EntityResolvers<QueryResolvers> = {
	getAddresses: async () => {
		return await getAddresses();
	},
	getCustomers: async () => {
		return await getCustomers();
	},
	getCustomerById: async (_, args) => {
		return await getCustomerById(args.id);
	},
	getProjects: async () => {
		return await getProjects();
	},
	getProjectById: async (_, args) => {
		return await getProjectById(args.id);
	}
};

export default resolvers;
