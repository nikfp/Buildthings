import type { AddressResolvers } from '../../generated-types/graphql';
import type { EntityResolvers } from '../../Resolvertypes';
import { getCustomersByAddressId } from '../Customer/customerService';
import { getProjectsByAddressId } from '../Project/projectService';

const resolvers: EntityResolvers<AddressResolvers> = {
	customers: async (parent) => {
		return await getCustomersByAddressId(parent.id);
	},
	projects: async (parent) => {
		return await getProjectsByAddressId(parent.id);
	}
};

export default resolvers;
