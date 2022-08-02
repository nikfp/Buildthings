import type { EntityResolvers } from '../../Resolvertypes';
import type { MutationResolvers } from '../../generated-types/graphql';
import { createAddress, updateAddress } from '../Address/addressService';
import { createCustomer, updateCustomer } from '../Customer/customerService';
import { createProject, updateProject } from '../Project/projectService';

const resolvers: EntityResolvers<MutationResolvers> = {
	createAddress: async (_, args) => {
		return await createAddress(args.input);
	},
	createCustomer: async (_, args) => {
		return await createCustomer(args.input);
	},
	createProject: async (_, args) => {
		return await createProject(args.input);
	},
	updateAddress: async (_, args) => {
		return await updateAddress(args.input);
	},
	updateCustomer: async (_, args) => {
		return await updateCustomer(args.input);
	},
	updateProject: async (_, args) => {
		return await updateProject(args.input);
	}
};

export default resolvers;
