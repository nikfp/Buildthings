import { gql, createModule } from 'graphql-modules';
import { getCustomersByAddressId } from '../Customer/customerService';
import { getProjectsByAddressId } from '../Project/projectService';
import { createAddress, getAddressById, getAddresses, updateAddress } from './addressService';
import type { AddressModule } from './generated/module-types';

const typeDefs = gql`
	type Address {
		id: ID!
		street: String!
		city: String!
		projects: [Project!]
		customers: [Customer!]
	}

	extend type Customer {
		address: Address!
	}

	extend type Project {
		address: Address!
	}

	extend type Query {
		getAddresses: [Address!]
	}

	input NewAddressInput {
		street: String!
		city: String!
	}

	input UpdateAddressInput {
		id: ID!
		street: String!
		city: String!
	}

	extend type Mutation {
		createAddress(input: NewAddressInput!): Address!
		updateAddress(input: UpdateAddressInput!): Address!
	}
`;

const resolvers: AddressModule.Resolvers = {
	Query: {
		getAddresses: async () => {
			return await getAddresses();
		}
	},
	Project: {
		address: async (parent) => {
			return await getAddressById(parent.addressId);
		}
	},
	Customer: {
		address: async (parent) => {
			return await getAddressById(parent.addressId);
		}
	},
	Address: {
		projects: async (parent) => {
			return await getProjectsByAddressId(parent.id);
		},
		customers: async (parent) => {
			return await getCustomersByAddressId(parent.id);
		}
	},
	Mutation: {
		createAddress: async (_, args) => {
			return await createAddress(args.input);
		},
		updateAddress: async (_, args) => {
			return await updateAddress(args.input);
		}
	}
};

export default createModule({
	id: 'address',
	typeDefs,
	resolvers
});
