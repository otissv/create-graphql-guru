import program from 'commander';
import { capitalize } from './utils';
import Bluebird from 'bluebird';
import fs from 'fs';
import shell from 'shelljs';
import chalk from 'chalk';

Bluebird.promisifyAll(fs);
const { mkdir } = shell;

program
  .option(
    '-p, --path [path]',
    'Path to where module will be created, relative to root.'
  )
  .option('-m, --module [module]', 'Modules name.')
  .parse(process.argv);

if (program.module && typeof program.module !== 'string') {
  throw new Error('No module name provide.');
}

const moduleRoot = `${process.cwd()}/server/modules`;
const moduleNameSplit = program.module.split('.');
const moduleName = moduleNameSplit[0].toLowerCase();
const fileName = moduleNameSplit[1] ? moduleNameSplit[1].toLowerCase() : '';
const moduleFile = `schemaType-${moduleName}${fileName ? '-' + fileName : ''}.graphql`;
const props = program.args.length !== 0 ? program.args : null;
const path = program.path ? `${moduleRoot}/${program.path}` : moduleRoot;
const propsStr = props.map(prop => `${prop}`).join('\n  ');
const data = `type ${capitalize(moduleName)} {
  ${propsStr} 
}`;

mkdir('-p', path);

const file = `${path}/${moduleFile}`;

fs
  .writeFileAsync(file, data, { flag: 'wx' })
  .then(() => {
    console.log(chalk.yellow(`Created ${moduleFile}`));
  })
  .catch(error => {
    throw new Error(error);
  });
