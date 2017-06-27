'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dest = process.cwd();
var template = _path2.default.join(__dirname, '../templates/express/*');
var pkgPath = _path2.default.join(__dirname, '../templates/express/package.json');
var pkg = require(pkgPath);
var cd = _shelljs2.default.cd,
    cp = _shelljs2.default.cp,
    exec = _shelljs2.default.exec,
    error = _shelljs2.default.error,
    mkdir = _shelljs2.default.mkdir;


_commander2.default.parse(process.argv);
var appName = _commander2.default.args[0];
var appFolder = dest + '/' + appName;

pkg.name = appName;

function createFolder(folder) {
  mkdir(folder);
  error() ? process.exit() : process.stdout.write('Created ' + appName + ' folder \n');
}

function copyTemplate() {
  cp('-R', template, appFolder);
  error() ? process.exit() : process.stdout.write('Express files copied to app folder\n');
}

function updatePackage() {
  _fs2.default.writeFile(appFolder + '/package.json', JSON.stringify(pkg, null, 2), function (error) {
    error ? process.exit() : process.stdout.write('Updated package name \n');
  });
}

function install() {
  cd(appFolder);
  exec('yarn install');
  error() ? process.exit() : process.stdout.write('Dependencies installed\n');
}

function run() {
  createFolder(appName);
  copyTemplate();
  updatePackage();
  install();
}

run();
//# sourceMappingURL=guru-express.js.map