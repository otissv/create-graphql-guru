'use strict';

const db = [
  {
    id: '1',
    user: '1',
    friends: ['1'],
    now: new Date(),
    club: ['1', '2'],
    managers: '1'
  },
  {
    id: '2',
    user: '1',
    friends: ['1'],
    now: new Date(),
    club: ['1', '2'],
    managers: '1'
  },
  {
    id: 3,
    user: '1',
    friends: ['1'],
    now: new Date(),
    club: ['1', '2'],
    managers: '1'
  }
];

export default class Team {
  resolve (params) {
    return Array.isArray(params.args)
      ? this.findManyById({ ...params, args: { id: params.args } })
      : this.findById(params);
  }

  findAll ({ args, locals, req, logger, databases, context, models }) {
    return db;
  }

  findById ({ query, args, locals, req, filter, logger, databases, models }) {
    const obj = args || query;
    const id = obj.id ? obj.id : obj.toString();

    return db.filter(d => d.id == id)[0];
  }

  findManyById ({
    query,
    args,
    locals,
    req,
    filter,
    logger,
    databases,
    models
  }) {
    return db.filter(d => args.id.toString().includes(d.id));
  }
}
