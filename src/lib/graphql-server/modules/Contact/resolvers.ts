import type { ContactResolvers } from '../../generated-types/graphql';
import type { EntityResolvers } from '../../Resolvertypes';
import { getCustomerByContactId } from '../Customer/customerService';
import { getProjectsByContactId } from '../Project/projectService';

const resolvers: EntityResolvers<ContactResolvers> = {
	customer: async (parent) => {
		return await getCustomerByContactId(parent.id);
	},
	projects: async (parent) => {
		return await getProjectsByContactId(parent.id);
	}
};

export default resolvers;
