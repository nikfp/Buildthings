import type { CustomerResolvers } from '../../generated-types/graphql';
import type { EntityResolvers } from '../../Resolvertypes';
import { getAddressById } from '../Address/addressService';
import { getProjectsByCustomerId } from '../Project/projectService';

const resolvers: EntityResolvers<CustomerResolvers> = {
	projects: async (parent) => {
		return await getProjectsByCustomerId(parent.id);
	},
	address: async (parent) => {
		return await getAddressById(parent.addressId);
	}
};

export default resolvers;
