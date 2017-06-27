import rethinkdbdash from 'rethinkdbdash';
import autobind from 'class-autobind';

export function promise (fn) {
  return new Promise((resolve, reject) => fn(resolve, reject));
}

export function connect (options) {
  return rethinkdbdash(options);
}

export class RethinkDBQuery {
  constructor () {
    autobind(this);
  }

  resolve (params) {
    return Array.isArray(params.args)
      ? this.findManyById({ ...params, args: { id: params.args } })
      : this.findById(params);
  }

  findAll ({ args, databases, models }) {
    const r = databases.rethinkdb;
    const TABLE = this.table;
    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .run()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findById ({ query, args, databases, models }) {
    const r = databases.rethinkdb;
    let obj = args || query;
    const TABLE = this.table;

    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .get(obj.id)
        .run()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findManyById ({ query, args, databases, models }) {
    const r = databases.rethinkdb;
    let obj = args || query;
    const TABLE = this.table;

    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .getAll(...obj.map(i => i.id))
        .run()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export class RethinkDBMutation {
  constructor () {
    autobind(this);
  }

  create ({ args, databases, models }) {
    const r = databases.rethinkdb;
    const TABLE = this.table;

    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .insert(args)
        .run()
        .then(response => {
          resolve(response);
        })
        .error(err => {
          console.log('Error occurred inserting data into tables.', err);
          reject(err);
        });
    });
  }

  remove ({ args, databases, models }) {
    const r = databases.rethinkdb;
    const id = args.id;
    const TABLE = this.table;

    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .getAll(id)
        .delete()
        .run()
        .then(response => {
          const __result = response.deleted === 1 ? 'success' : 'failed';

          resolve({ __result });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  update ({ args, databases, models }) {
    const r = databases.rethinkdb;
    const id = args.id;
    const TABLE = this.table;

    return promise((resolve, reject) => {
      r
        .table(TABLE)
        .get(id)
        .update(args)
        .run()
        .then(response => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // createMany
  // deleteMany
  // removeMany
  // updateMany
}
