import program from 'commander';
import shell from 'shelljs';
import path from 'path';
import fs from 'fs';

const dest = process.cwd();
const template = path.join(__dirname, '../templates/express/*');
const pkgPath = path.join(__dirname, '../templates/express/package.json');
const pkg = require(pkgPath);
const { cd, cp, exec, error, mkdir } = shell;

program.parse(process.argv);
const appName = program.args[0];
const appFolder = `${dest}/${appName}`;

pkg.name = appName;

function createFolder (folder) {
  mkdir(folder);
  error()
    ? process.exit()
    : process.stdout.write(`Created ${appName} folder \n`);
}

function copyTemplate () {
  cp('-R', template, appFolder);
  error()
    ? process.exit()
    : process.stdout.write(`Express files copied to app folder\n`);
}

function updatePackage () {
  fs.writeFile(
    `${appFolder}/package.json`,
    JSON.stringify(pkg, null, 2),
    error => {
      error ? process.exit() : process.stdout.write(`Updated package name \n`);
    }
  );
}

function install () {
  cd(appFolder);
  exec('yarn install');
  error() ? process.exit() : process.stdout.write(`Dependencies installed\n`);
}

function run () {
  createFolder(appName);
  copyTemplate();
  updatePackage();
  install();
}

run();
