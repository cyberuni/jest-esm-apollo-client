import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';

import '@testing-library/jest-dom/extend-expect';

const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      testQuery: String!
    }
  `,
  resolvers: {
    Query: {
      testQuery: () => 'Hello World!',
    },
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
} as any);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});

const query = gql`
  query testQuery {
    testQuery
  }
`;

const App = () => {
  const { loading, data } = useQuery(query);
  return loading ? <div>Loading...</div> : data;
}

describe('Testing', async () => {
  test('cjs module not loading', async () => {
    const { getByText } = render(<ApolloProvider client={client}><App /></ApolloProvider>);
    await waitForElementToBeRemoved(() => getByText('Loading...'));
    expect(getByText('Hello World!')).toBeVisible();
  });
});
