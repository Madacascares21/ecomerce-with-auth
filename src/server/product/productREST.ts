// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export function getApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql', // update as needed
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
