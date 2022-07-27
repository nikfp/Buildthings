import { gql, createModule } from 'graphql-modules';
import { getCustomerById } from '../Customer/customerService';
import type { ProjectModule } from './generated/module-types';
import {
	createProject,
	getProjectById,
	getProjects,
	getProjectsByCustomerId,
	updateProject
} from './projectService';

const typeDefs = gql`
	type Project {
		id: ID!
		name: String!
		customer: Customer
	}

	extend type Customer {
		projects: [Project!]
	}

	extend type Query {
		getProjects: [Project!]
		getProjectById(id: ID!): Project!
	}

	input NewProjectInput {
		name: String!
		customerId: ID!
	}

	input UpdateProjectInput {
		id: ID!
		name: String!
		customerId: ID!
	}

	extend type Mutation {
		createProject(input: NewProjectInput!): Project!
		updateProject(input: UpdateProjectInput!): Project!
	}
`;

const resolvers: ProjectModule.Resolvers = {
	Query: {
		getProjects: async () => {
			return await getProjects();
		},
		getProjectById: async (_, args) => {
			return await getProjectById(args.id);
		}
	},
	Customer: {
		projects: async (parent) => {
			return await getProjectsByCustomerId(parent.id);
		}
	},
	Project: {
		customer: async (parent) => {
			console.log(parent);
			return await getCustomerById(parent.customerId);
		}
	},
	Mutation: {
		createProject: async (_, args) => {
			console.log('Hit mutator');
			return await createProject(args.input);
		},
		updateProject: async (_, args) => {
			return await updateProject(args.input);
		}
	}
};

export default createModule({
	id: 'project',
	typeDefs,
	resolvers
});
