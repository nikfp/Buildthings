const typeDefs = /* GraphQL */ `
	type Address {
		id: ID!
		street: String!
		city: String!
		projects: [Project!]
		customers: [Customer!]
	}

	type Customer {
		id: ID!
		name: String!
		phone: String!
		projects: [Project!]
		address: Address!
	}

	type Project {
		id: ID!
		name: String!
		customer: Customer
		address: Address!
	}

	type Query {
		getAddresses: [Address!]
		getCustomers: [Customer!]
		getCustomerById(id: ID!): Customer!
		getProjects: [Project!]
		getProjectById(id: ID!): Project!
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

	input NewCustomerInput {
		name: String!
		phone: String!
		addressId: ID!
	}

	input UpdateCustomerInput {
		id: ID!
		name: String!
		phone: String!
		addressId: ID!
	}

	input NewProjectInput {
		name: String!
		customerId: ID!
		addressId: ID!
	}

	input UpdateProjectInput {
		id: ID!
		name: String!
		customerId: ID!
		addressId: ID!
	}

	type Mutation {
		createAddress(input: NewAddressInput!): Address!
		createCustomer(input: NewCustomerInput!): Customer!
		createProject(input: NewProjectInput!): Project!
		updateAddress(input: UpdateAddressInput!): Address!
		updateCustomer(input: UpdateCustomerInput!): Customer!
		updateProject(input: UpdateProjectInput!): Project!
	}
`;

export default typeDefs;
