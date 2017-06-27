'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _utils = require('./utils');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

_bluebird2.default.promisifyAll(_fs2.default);
var mkdir = _shelljs2.default.mkdir;


_commander2.default.option('-p, --path [path]', 'Path to where module will be created, relative to root.').option('-m, --module [scalar]', 'Module name').option('-e, --enum [enum]', 'Enum definition').option('-f, --interface [Interface]', 'interface definition').option('-i, --input [input]', 'input definition').option('-o, --object [object]', 'Object definition').option('-s, --scalar [scalar]', 'Scalar definition').option('-u, --union [union]', 'Union definition').parse(process.argv);

if (!_commander2.default.module || typeof _commander2.default.module !== 'string') {
  throw new Error('No module name provide.');
}

var moduleRoot = process.cwd() + '/server/modules';
var moduleNameSplit = _commander2.default.module.split('.');
var moduleName = moduleNameSplit[0].toLowerCase();
var fileName = moduleNameSplit[1] ? moduleNameSplit[1].toLowerCase() : '';
var moduleFile = 'schemaType-' + moduleName + (fileName ? '-' + fileName : '') + '.graphql';
var path = _commander2.default.path ? moduleRoot + '/' + _commander2.default.path : moduleRoot;

var types = {
  enum: _commander2.default.enum,
  interface: _commander2.default.interface,
  input: _commander2.default.input,
  object: _commander2.default.object,
  scalar: _commander2.default.scalar,
  union: _commander2.default.union
};

var data = Object.keys(types).reduce(function (previous, key) {
  if (types[key] == null) return previous;

  var _types$key$split = types[key].split(' '),
      _types$key$split2 = _toArray(_types$key$split),
      typeName = _types$key$split2[0],
      props = _types$key$split2.slice(1);

  var definitionType = key === 'object' ? 'type' : key;
  return previous + '\n\n' + definitionType + ' ' + (0, _utils.capitalize)(typeName) + ' {\n  ' + props.map(function (p) {
    return p.replace(':', ': ');
  }).join('\n  ') + '\n}';
}, '');

mkdir('-p', path);

var file = path + '/' + moduleFile;

_fs2.default.writeFileAsync(file, data, { flag: 'a' }).then(function () {
  console.log(_chalk2.default.yellow('Created ' + moduleFile));
}).catch(function (error) {
  throw new Error(error);
});
//# sourceMappingURL=guru-type.js.map