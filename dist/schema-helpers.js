'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.args = args;
exports.resolver = resolver;
exports.schema = schema;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleRoot = process.cwd() + '/server/modules';

exports.default = _commander2.default.option('-m, --module <name>', 'Modules name').option('-d, --database <name>', 'Extends module with database client').option('-r, --resolver [true]', 'Create mutation resolve').option('-s, --schema [true]', 'Name of query module').option('-p, --path', 'Path to where module will be created, relative to root.').parse(process.argv);
function args(_ref) {
  var program = _ref.program;

  if (typeof program.module !== 'string') {
    throw new Error('No module name provide.');
  }
  var moduleName = program.module.split('.');

  return {
    moduleName: moduleName[0].toLowerCase(),
    fileName: moduleName[1] ? moduleName[1].toLowerCase() : '',
    methods: program.args.length !== 0 ? program.args : null,
    database: program.database !== 'string' ? program.database : null,
    path: program.path ? moduleRoot + '/' + program.path : moduleRoot
  };
}

function resolver(_ref2) {
  var database = _ref2.database,
      methods = _ref2.methods,
      moduleName = _ref2.moduleName;

  var moduleMethods = methods == null ? [] : methods.map(function (method) {
    return ' \n  ' + method + ' ({ args, context, databases, locals, models, req }) {\n\n  }';
  });

  var importDatabase = database ? 'import ' + database + ' from \'graphql-guru-' + database + ';\'\n    \n  \n' : '';

  return importDatabase + 'export default class ' + (0, _utils.capitalize)(moduleName) + ' ' + (database ? 'extends ' + database + ' ' : '') + '{\n' + moduleMethods.join('\n') + '\n};\n';
}

function schema(_ref3) {
  var methods = _ref3.methods,
      moduleName = _ref3.moduleName;

  return methods.map(function (method) {
    return '# Add description\n' + moduleName + (0, _utils.capitalize)(method) + '(): ' + (0, _utils.capitalize)(moduleName) + '\n\n';
  }).join('');
}
//# sourceMappingURL=schema-helpers.js.map