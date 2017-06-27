'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = undefined;
exports.args = args;
exports.resolver = resolver;
exports.schema = schema;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleRoot = process.cwd() + '/server/modules';

var capitalize = exports.capitalize = function capitalize(str) {
  var firstCharUpperCase = str.charAt(0).toUpperCase();
  return '' + firstCharUpperCase + str.substr(1, str.length - 1).toLowerCase();
};

exports.default = _commander2.default.option('-p, --path [path]', 'Path to where module will be created, relative to root.').option('-m, --module [module]', 'Modules name.').option('-d, --database [database]', 'Extends module with database client').option('-r, --resolver [resolver...]', 'Create mutation resolve').option('-s, --schema [schema....]', 'Name of query module').parse(process.argv);
function args(_ref) {
  var program = _ref.program;

  if (program.module && typeof program.module !== 'string') {
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

  var importDatabase = database ? 'import ' + database + ' from \'guru-' + database + ';\'\n    \n' : '';

  return importDatabase + 'export default class ' + capitalize(moduleName) + ' ' + (database ? 'extends ' + database + ' ' : '') + '{\n' + moduleMethods.join('\n') + '\n};\n';
}

function schema(_ref3) {
  var methods = _ref3.methods,
      moduleName = _ref3.moduleName;

  return methods.map(function (method) {
    return '# Add description\n' + moduleName + capitalize(method) + '(): ' + capitalize(moduleName) + '\n\n';
  }).join('');
}
//# sourceMappingURL=utils.js.map