'use strict';

import { MongoDBQuery } from '../../../core/database/mongodb/mongodb-database';

export default class User extends MongoDBQuery {
  constructor () {
    super();
    this.table = 'users';
    this.cacheName = 'user_';
  }
}
