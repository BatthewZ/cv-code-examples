const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({
  // If this isn't set, it will try to get it from ~/.aws directory or an environment variable.
  region: 'us-east-1',
});

// Used for put/get 'items' to/from DB.
const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

async function scanTable(tableName) {
  return dynamoDB
    .scan({TableName: tableName})
    .promise()
    .then((data) => {
      if (!data || !data.Items.length) console.log("Couldn't get items from scan...");
      return data.Items;
    });
}

async function get(tableName, partitionKeyName = undefined, partitionKeyValue = undefined, sortKey = undefined) {
  // Sample usage:
  // get('subscriptions', 'some@email.com').then((result) => console.log('--- FINAL RESULT IS: ', simplifyResults(result)));

  // If no other values entered, return the entire table.
  const results = await scanTable(tableName);
  if (!partitionKeyName || !partitionKeyValue) return results;

  // Otherwise, return a single item.
  const found = results.find((result) => {
    return result[partitionKeyName].S === partitionKeyValue;
  });

  return found;
}

async function put(tableName, item) {
  // Sample usage:
  // put('subscriptions', {user_email: 'some@email.com', artist: 'SomeOtherArtist'});

  console.log('Attempting to input to table...');
  return await documentClient
    .put(
      {
        Item: item,
        TableName: tableName,
      },
      (err, data) => {
        if (err) console.log('Error:', err);
        console.log('Data:', data);
      }
    )
    .promise();
}

async function del(tableName, objectWithPartitionKey) {
  // Sample usage:
  // del('lessons', {lessonId: "someIdString"});

  console.log('Attempting to delete item from table...');
  return await documentClient
    .delete({TableName: tableName, Key: objectWithPartitionKey}, (err, data) => {
      if (err) console.log('Error:', err);
      console.log('Data:', data);
      return {errMsg: err, data: data};
    })
    .promise();
}

module.exports = {
  get,
  put,
  del,
};
