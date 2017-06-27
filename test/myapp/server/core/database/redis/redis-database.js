/*
* redis connection
*/

import Promise from 'bluebird';
import redisP from 'promise-redis';

export function connection ({ port, uri }) {
  const redis = redisP(resolver => new Promise(resolver));
  let client;

  client = redis.createClient({ port, uri });

  // Event handlers
  client.on('connect', () => {
    console.log(`Redis connected to ${uri}:${port}`);
  });

  client.on('end', () => {
    console.log('Redis disconnected');
    client.quit();
  });

  client.on('error', function (error) {
    console.log('Error ' + error);
  });

  // Return instance of redis client
  return client;
}

export function connect (options) {
  return connection(options);
}
