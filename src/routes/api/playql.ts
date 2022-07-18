import { renderGraphiQL } from '@graphql-yoga/common';

const defaultQuery = `
{
  hello
}`;

export async function GET() {
	return {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: renderGraphiQL({
			title: 'Yoga KitQL',
			defaultVariableEditorOpen: true,
			endpoint: '/api/graphql',
			defaultQuery
		})
	};
}
