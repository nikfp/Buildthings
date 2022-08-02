import type {ProjectResolvers} from '../../generated-types/graphql'
import type {EntityResolvers} from '../../Resolvertypes'
import { getAddressById } from '../Address/addressService'
import { getCustomerById } from '../Customer/customerService';

const resolvers: EntityResolvers<ProjectResolvers> = {
  address: async (parent) => {
    return await getAddressById(parent.addressId);
  },
  customer: async (parent) => {
    return await getCustomerById(parent.customerId);
  }
}

export default resolvers;