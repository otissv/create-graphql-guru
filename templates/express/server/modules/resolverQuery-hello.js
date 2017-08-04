'use strict';

const db = [
  {
    id: '7170741b-0315-4211-832b-a51347038a5f',
    firstName: 'Karine',
    lastName: 'Kunze'
  },
  {
    id: '8e19f9a3-f78f-4b8b-beb0-071e01fd6f0c',
    firstName: 'Jayden',
    lastName: 'Mills'
  },
  {
    id: '3f8503c0-83c4-47d5-a4f8-708f548e8998',
    firstName: 'Camryn',
    lastName: 'Jacobi'
  },
  {
    id: 'a52f628c-4a5a-4976-a79b-129282268b8f',
    firstName: 'Dimitri',
    lastName: 'Hauck'
  },
  {
    id: '2a6582e9-90d7-4820-8cf4-87457804abf4',
    firstName: 'Vella',
    lastName: 'Weimann'
  }
];

export default class Hello {
  resolve (params) {
    return Array.isArray(params.args)
      ? this.findManyById({ ...params, args: { id: params.args } })
      : this.findById(params);
  }

  greetEveryone ({
    args,
    cache,
    connectors,
    databases,
    json,
    locals,
    logger,
    models,
    query,
    req
  }) {
    return db;
  }

  greetOne ({
    args,
    cache,
    connectors,
    databases,
    json,
    locals,
    logger,
    models,
    query,
    req
  }) {
    return db[0];
  }
}
