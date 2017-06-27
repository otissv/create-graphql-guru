import mongodb from 'mongodb';
import autobind from 'class-autobind';

import { objectId, queryObjectId } from './mongodb-utils';

export function connect (options) {
  return mongodb.MongoClient.connect(options.uri, { native_parser: true });
}

export class MongoDBQuery {
  constructor () {
    autobind(this);
  }

  resolve (params) {
    return Array.isArray(params.args)
      ? this.findManyById({ ...params, args: { id: params.args } })
      : this.findById(params);
  }

  findAll ({ query, args, databases, projection = {}, models }) {
    const { mongodb } = databases;
    const TABLE = this.table;
    const obj = args || query;

    return mongodb.then(db => {
      return new Promise((resolve, reject) => {
        return db
          .collection(TABLE)
          .find(queryObjectId(obj), projection)
          .toArray((err, docs) => {
            if (err) {
              reject(err);
            } else {
              resolve(docs);
            }
          });
      });
    });
  }

  findById ({ query, args, databases, projection = {}, models, cache }) {
    const { mongodb } = databases;
    const TABLE = this.table;
    const obj = args || query;

    if (obj == null) return null;

    // check to see if document is in cached
    const cacheKey = `${this.table}${obj._id}`;
    const checkCache = cache.load({ key: cacheKey });
    if (checkCache) return checkCache;

    const data = mongodb.then(db =>
      db
        .collection(TABLE)
        .findOne(queryObjectId(args), projection)
        .then(doc => {
          return doc;
        })
        .catch(error => error)
    );

    cache.add({
      key: cacheKey,
      value: data
    });

    return data;
  }

  findManyById ({ query, args, databases, projection = {}, models, cache }) {
    const { mongodb } = databases;
    const TABLE = this.table;
    const obj = args || query;

    if (obj == null) return null;

    const notCached = [];

    // check if any of the query documents are in the cache
    const cached = obj._id.map((item, index) => {
      const cacheKey = `${this.table}_${item}`;
      const checkCache = cache.load({ key: cacheKey });

      if (checkCache) return checkCache;

      notCached.push({ index, item });
    });

    // if all documents are already in the cache return the cache
    if (!cached.some(c => c == null)) return cached;

    // find non-cached documents
    return mongodb.then(db => {
      return new Promise((resolve, reject) =>
        db
          .collection(TABLE)
          .find(
          {
            ...args,
            _id: {
              $in: notCached.map(val => objectId(val.item))
            }
          },
            projection
          )
          .toArray((err, docs) => {
            if (err) return reject(err);

            // add non-cached documents to the cache
            notCached.forEach((value, index) => {
              const cacheKey = `${this.table}_${value.item}`;

              // add item to cache
              cache.add({
                key: cacheKey,
                value: docs[index]
              });

              // insert not cached documents into cached
              cached[value.index] = docs[index];
            });

            return resolve(cached);
          })
      );
    });
  }
}

export class MongoDBMutation {
  constructor () {
    autobind(this);
    this.cacheName = 'user_';
  }

  create ({ query, args, databases, models, cache }) {
    const { mongodb } = databases;
    let obj = args || query;
    const TABLE = this.table;

    if (obj == null || obj._id == null) {
      return {
        RESULTS_: {
          result: 'failed',
          created: 0,
          error: {
            message: 'No data supplied.'
          }
        }
      };
    }

    return new Promise((resolve, reject) =>
      mongodb.then(db => {
        return db
          .collection(TABLE)
          .insert(obj)
          .then(response => {
            const id = response.insertedIds;
            const data = { ...obj, id };

            // add the document to the store
            cache.add({
              key: `${this.table}_${id}`,
              value: data
            });
            resolve({
              id,
              RESULTS_: {
                result: 'ok',
                created: response.result.n
              }
            });
          })
          .catch(error => error);
      })
    );
  }

  remove ({ query, args, databases, models, cache }) {
    const { mongodb } = databases;
    let obj = args || query;
    const TABLE = this.table;

    if (obj == null || obj._id == null) {
      return {
        _id: obj._id,
        RESULTS_: {
          result: 'failed',
          removed: 0,
          error: {
            message: 'No id supplied.'
          }
        }
      };
    }

    const _id = obj._id;

    return mongodb.then(db => {
      return db
        .collection(TABLE)
        .remove({ _id: objectId(_id) })
        .then(response => {
          cache.remove({ key: `${this.table}_${_id}` });

          return {
            _id,
            result: response.result.n > 0 ? 'ok' : 'failed',
            removed: response.result.n
          };
        });
    });
  }

  update ({ query, args, databases, models, cache }) {
    const { mongodb } = databases;
    const TABLE = this.table;
    let obj = (args && { ...args }) || (query && { ...query });
    const _id = obj._id;

    delete obj._id;

    if (obj == null) {
      return {
        RESULTS_: {
          result: 'failed',
          updated: 0,
          error: {
            message: 'No data supplied.'
          }
        }
      };
    }

    return mongodb.then(db => {
      return db
        .collection(TABLE)
        .update({ _id: objectId(_id) }, obj)
        .then(response => {
          const cacheKey = `${this.table}_${_id}`;
          const checkCache = cache.get({ key: cacheKey });
          const data = checkCache ? { ...checkCache, ...obj } : obj;

          cache.add({
            key: cacheKey,
            value: data
          });

          const error = response.result.n === 0
            ? { message: 'No data supplied.' }
            : null;

          return {
            _id,
            RESULTS_: {
              result: response.result.n > 0 ? 'ok' : 'failed',
              updated: response.result.n,
              error
            }
          };
        })
        .catch(error => {
          console.log(error);
          return {
            RESULTS_: {
              result: 'failed',
              updated: 0,
              error: {
                message: 'Document update failed.'
              }
            }
          };
        });
    });
  }

  // createMany
  // deleteMany
  // removeMany
  // updateMany
}
