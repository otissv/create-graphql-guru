'use strict';

const db = [
  {
    id : '1',
    description: 'Finds a club by id 1',
    name       : 'Club findById 1',
    manager    : '1',
    count      : 5,
    Date       : new Date()
  },
  {
    id : '2',
    description: 'Finds a club by id 2',
    name       : 'Club findById 2',
    manager    : '1',
    count      : 5,
    Date       : new Date()
  },
  {
    id : '3',
    description: 'Finds a club by id 3',
    name       : 'Club findById 3',
    manager    : '1',
    count      : 5,
    Date       : new Date()
  }
]

export default  class Club {
  resolve (params) {
    return Array.isArray(params.args)
      ? this.findManyById ({ ...params, args: { id: params.args } })
      : this.findById (params);
  }

  findAll ({ args, locals, req, logger, databases, context, models }) {
    return db;
  }

  findById ({ query, args, locals, req, filter, logger, databases, models }) {
    const id  = args.id 
      ? args.id
      : id.toString();

    return db.filter(d => d.id == id )[0]
  }

  findManyById ({ query, args, locals, req, filter, logger, databases, models }) {
    return db.filter(d => args.id.toString().includes(d.id));
  } 
};
