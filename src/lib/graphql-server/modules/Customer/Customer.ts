import { gql, createModule } from 'graphql-modules';
import { createCustomer, getCustomerById, getCustomers, updateCustomer } from './customerService';
import type { CustomerModule } from './generated/module-types';

const typeDefs = gql`
	type Customer {
		id: ID!
		name: String!
		phone: String!
	}

	type Query {
		getCustomers: [Customer!]
		getCustomerById(id: ID!): Customer!
	}

	input NewCustomerInput {
		name: String!
		phone: String!
	}

	input UpdateCustomerInput {
		id: ID!
		name: String!
		phone: String!
	}

	type Mutation {
		CreateCustomer(input: NewCustomerInput!): Customer!
		UpdateCustomer(input: UpdateCustomerInput!): Customer!
	}
`;

const resolvers: CustomerModule.Resolvers = {
	Query: {
		getCustomers: async () => {
			return await getCustomers();
		},
		getCustomerById: async (_parent, args) => {
			return await getCustomerById(args.id);
		}
	},
	Mutation: {
		CreateCustomer: async (_parent, args) => {
			return await createCustomer(args.input);
		},
		UpdateCustomer: async (_parent, args) => {
			return await updateCustomer(args.input);
		}
	}
};

export default createModule({
	id: 'customer',
	typeDefs,
	resolvers
});
