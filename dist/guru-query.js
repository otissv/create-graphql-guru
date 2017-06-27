'use strict';

var _schemaHelpers = require('./schema-helpers');

var _schemaHelpers2 = _interopRequireDefault(_schemaHelpers);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_fs2.default);
var moduleRoot = process.cwd() + '/server/modules';
var dest = _schemaHelpers2.default.path ? moduleRoot + '/' + _schemaHelpers2.default.path : moduleRoot;

var mkdir = _shelljs2.default.mkdir;

var _args = (0, _schemaHelpers.args)({
  program: _schemaHelpers2.default
}),
    database = _args.database,
    fileName = _args.fileName,
    methods = _args.methods,
    moduleName = _args.moduleName,
    path = _args.path;

var resolverStr = void 0;

mkdir('-p', path);

function createResolver() {
  if (_schemaHelpers2.default.resolver) {
    resolverStr = (0, _schemaHelpers.resolver)({
      database: database,
      methods: methods,
      moduleName: moduleName
    });

    var moduleFile = 'resolverQuery-' + moduleName + (fileName ? '-' + fileName : '') + '.js';
    var file = path + '/' + moduleFile;

    var options = { flag: 'wx' };

    _fs2.default.writeFileAsync(file, resolverStr, options).then(function () {
      console.log(_chalk2.default.yellow('Created ' + moduleFile));
    }).catch(function (error) {
      throw new Error(error);
    });
  }
}

function createSchema() {
  if (_schemaHelpers2.default.schema) {
    var moduleFile = 'schemaQuery-' + moduleName + (fileName ? '-' + fileName : '') + '.graphql';
    var file = path + '/' + moduleFile;
    var options = { flag: 'wx' };

    var schemaStr = methods ? (0, _schemaHelpers.schema)({ methods: methods, moduleName: moduleName }) : '';

    _fs2.default.writeFileAsync(file, schemaStr, options).then(function () {
      console.log(_chalk2.default.yellow('Created ' + moduleFile));
    }).catch(function (error) {
      throw new Error(error);
    });
  }
}

createSchema();
createResolver();
//# sourceMappingURL=guru-query.js.map