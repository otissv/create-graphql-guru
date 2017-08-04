import program from 'commander';
import shell from 'shelljs';
import path from 'path';
import fs from 'fs';
import Bluebird from 'bluebird';

Bluebird.promisifyAll(fs);

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

function install () {
  fs.writeFileAsync(
    `${appFolder}/package.json`,
    JSON.stringify(pkg, null, 2),
    error => {
      error ? process.exit() : process.stdout.write(`Updated package name \n`);
    }
  )
    .then(() => yarn())
    .then(() => {
      process.stdout.write('\n===========================================================\n');
      exec(`echo Guru Files created:;ls`);
      process.stdout.write('\nnpm run dev starts the sever in development mode\n');
      process.stdout.write('\nSchema and resolves can be found in server/modules directory\n');
      process.stdout.write('\n============================================================');
    })
    .catch(error => {
      throw new Error(error);
    });
}

function yarn () {
  cd(appFolder);
  exec('yarn install');
  error() ? process.exit() : process.stdout.write(`Dependencies installed\n`);
}


function run () {
  createFolder(appName);
  copyTemplate();
  install();
}

run();
