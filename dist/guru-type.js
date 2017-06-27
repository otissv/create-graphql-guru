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

_bluebird2.default.promisifyAll(_fs2.default);
var mkdir = _shelljs2.default.mkdir;


_commander2.default.option('-p, --path [path]', 'Path to where module will be created, relative to root.').option('-m, --module [module]', 'Modules name.').parse(process.argv);

if (_commander2.default.module && typeof _commander2.default.module !== 'string') {
  throw new Error('No module name provide.');
}

var moduleRoot = process.cwd() + '/server/modules';
var moduleNameSplit = _commander2.default.module.split('.');
var moduleName = moduleNameSplit[0].toLowerCase();
var fileName = moduleNameSplit[1] ? moduleNameSplit[1].toLowerCase() : '';
var moduleFile = 'schemaType-' + moduleName + (fileName ? '-' + fileName : '') + '.graphql';
var props = _commander2.default.args.length !== 0 ? _commander2.default.args : null;
var path = _commander2.default.path ? moduleRoot + '/' + _commander2.default.path : moduleRoot;
var propsStr = props.map(function (prop) {
  return '' + prop;
}).join('\n  ');
var data = 'type ' + (0, _utils.capitalize)(moduleName) + ' {\n  ' + propsStr + ' \n}';

mkdir('-p', path);

var file = path + '/' + moduleFile;

_fs2.default.writeFileAsync(file, data, { flag: 'wx' }).then(function () {
  console.log(_chalk2.default.yellow('Created ' + moduleFile));
}).catch(function (error) {
  throw new Error(error);
});
//# sourceMappingURL=guru-type.js.map