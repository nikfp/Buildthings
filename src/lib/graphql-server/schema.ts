const typeDefs = /* GraphQL */ `
	type Address {
		id: ID!
		street: String!
		city: String!
		projects: [Project!]
		customers: [Customer!]
	}

	type Contact {
		id: ID!
		firstName: String!
		lastName: String
		phone: String!
		projects: [Project!]
		customer: Customer!
	}

	type Customer {
		id: ID!
		name: String!
		phone: String!
		projects: [Project!]
		address: Address!
		contacts: [Contact!]
	}

	type Project {
		id: ID!
		name: String!
		customer: Customer
		address: Address!
		contacts: [Contact!]
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

	input NewContactInput {
		firstName: String!
		lastName: String
		phone: String!
		customerId: String!
	}

	input UpdateContactInput {
		id: ID!
		firstName: String!
		lastName: String
		phone: String!
		customerId: String!
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
		createContact(input: NewContactInput!): Contact!
		updateContact(input: UpdateContactInput!): Contact!
	}
`;

export default typeDefs;
