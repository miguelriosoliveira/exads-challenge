/*
Design a schema for a DynamoDB table that stores metadata about web pages crawled by our solution.
The schema should support efficient querying for a given URL, date range, or a specific attribute
(e.g., page title or word count).
Provide examples of how to insert and query data using the AWS SDK for JavaScript.
*/

import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-south-2' });

const dynamodb = new AWS.DynamoDB();

dynamodb.createTable(
  {
    TableName: 'WebPages',
    KeySchema: [
      { AttributeName: 'URL', KeyType: 'HASH' },
      { AttributeName: 'Timestamp', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'URL', AttributeType: 'S' },
      { AttributeName: 'Timestamp', AttributeType: 'N' },
      { AttributeName: 'Title', AttributeType: 'S' },
      { AttributeName: 'WordCount', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  (err, data) => {
    if (err) {
      console.error('Failed creating table:', err);
    } else {
      console.log('Table created:', data);
    }
  },
);

// Insert data

export const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(
  {
    TableName: 'WebPages',
    Item: {
      URL: 'https://example.com',
      Timestamp: Date.now(),
      Title: 'Example Page',
      WordCount: 1000,
    },
  },
  (err, data) => {
    if (err) {
      console.error('Failed inserting item:', err);
    } else {
      console.log('Item inserted:', data);
    }
  },
);

// Query data

documentClient.query(
  {
    TableName: 'WebPages',
    KeyConditionExpression: '#url = :url',
    ExpressionAttributeNames: { '#url': 'URL' },
    ExpressionAttributeValues: { ':url': 'https://example.com' },
  },
  (err, data) => {
    if (err) {
      console.error('Failed querying data:', err);
    } else {
      console.log('Query result:', data.Items);
    }
  },
);
