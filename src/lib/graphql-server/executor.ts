import { useErrorHandler, envelop, useSchema } from '@envelop/core';
import { useGraphQlJit } from '@envelop/graphql-jit';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const graphqlExecutor = envelop({
	plugins: [
		useSchema(schema),
		useGraphQlJit(),
		useErrorHandler((errors) => {
			console.error('useErrorHandler', JSON.stringify(errors, null, 2));
		})
	]
});

export { graphqlExecutor, schema };
