/*
Design a GraphQL schema for the web page metadata stored in the DynamoDB table.
Implement a GraphQL server in TypeScript using AWS AppSync or any other preferred library
that exposes the schema, allowing clients to fetch data using custom queries and mutations.
Provide example queries and mutations for typical use cases.
*/

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';

interface WebPage {
  id: string;
  url: string;
  timestamp: number;
  title: string;
  wordCount: number;
}

const pages: WebPage[] = [];

const server = new ApolloServer({
  typeDefs: readFileSync('./schema.graphql', { encoding: 'utf-8' }),
  resolvers: {
    Query: {
      getPageById(_: unknown, { id }: { id: string }): WebPage | undefined {
        return pages.find((page) => page.id === id);
      },
      getPageByUrl(_: unknown, { url }: { url: string }): WebPage | undefined {
        return pages.find((page) => page.url === url);
      },
      getPagesByDateRange(
        _: unknown,
        { start, end }: { start: number; end: number },
      ): WebPage[] {
        return pages.filter(
          (page) => page.timestamp >= start && page.timestamp <= end,
        );
      },
    },
    Mutation: {
      createPage(
        _: unknown,
        { url, timestamp, title, wordCount }: WebPage,
      ): WebPage {
        const newPage: WebPage = {
          id: randomUUID(),
          url,
          timestamp,
          title,
          wordCount,
        };
        pages.push(newPage);
        return newPage;
      },
      updatePage(
        _: unknown,
        {
          id,
          title,
          wordCount,
        }: {
          id: string;
          title: string;
          wordCount: number;
        },
      ): WebPage | null {
        const updatedPage = pages.find((page) => page.id === id);
        if (!updatedPage) {
          return null;
        }
        updatedPage.title = title;
        updatedPage.wordCount = wordCount;
        return updatedPage;
      },
      deletePage(_: unknown, { id }: { id: string }): string | null {
        const index = pages.findIndex((page) => page.id === id);
        if (index < 0) {
          return null;
        }
        const deletedPage = pages.splice(index, 1);
        return deletedPage[0].id;
      },
    },
  },
});

// Start the server
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀  Server ready at: ${url}`);

// Example queries and mutations:

// Fetch a web page by its ID:

// query {
//   getPageById(id: "04B7CA27-9358-44D7-A7BC-F81924305754") {
//     id
//     url
//     timestamp
//     title
//     wordCount
//   }
// }

// Fetch a web page by its URL:

// query {
//   getPageByUrl(url: "https://example.com") {
//     id
//     url
//     timestamp
//     title
//     wordCount
//   }
// }

// Fetch web pages within a date range:

// query {
//   getPagesByDateRange(startTimestamp: 1625222400, endTimestamp: 1625308800) {
//     id
//     url
//     timestamp
//     title
//     wordCount
//   }
// }

// Create a new web page:

// mutation {
//   createPage(url: "https://example.com", timestamp: 1625308800, title: "Example Page", wordCount: 500) {
//     id
//     url
//     timestamp
//     title
//     wordCount
//   }
// }

// Update the title and word count of a web page:

// mutation {
//   updatePage(id: "123", title: "Updated Page", wordCount: 600) {
//     id
//     url
//     timestamp
//     title
//     wordCount
//   }
// }

// Delete a web page by its ID:

// mutation {
//   deletePage(id: "123")
// }
