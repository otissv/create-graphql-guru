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
  .option('-m, --module [scalar]', 'Module name')
  .option('-e, --enum [enum]', 'Enum definition')
  .option('-f, --interface [Interface]', 'interface definition')
  .option('-i, --input [input]', 'input definition')
  .option('-o, --object [object]', 'Object definition')
  .option('-s, --scalar [scalar]', 'Scalar definition')
  .option('-u, --union [union]', 'Union definition')
  .parse(process.argv);

if (!program.module || typeof program.module !== 'string') {
  throw new Error('No module name provide.');
}

const moduleRoot = `${process.cwd()}/server/modules`;
const moduleNameSplit = program.module.split('.');
const moduleName = moduleNameSplit[0].toLowerCase();
const fileName = moduleNameSplit[1] ? moduleNameSplit[1].toLowerCase() : '';
const moduleFile = `schemaType-${moduleName}${fileName ? '-' + fileName : ''}.graphql`;
const path = program.path ? `${moduleRoot}/${program.path}` : moduleRoot;

const types = {
  enum: program.enum,
  interface: program.interface,
  input: program.input,
  object: program.object,
  scalar: program.scalar,
  union: program.union
};

const data = Object.keys(types).reduce((previous, key) => {
  if (types[key] == null) return previous;
  const [typeName, ...props] = types[key].split(' ');

  const definitionType = key === 'object' ? 'type' : key;
  return `${previous}

${definitionType} ${capitalize(typeName)} {
  ${props.map(p => p.replace(':', ': ')).join('\n  ')}
}`;
}, ``);

mkdir('-p', path);

const file = `${path}/${moduleFile}`;

fs
  .writeFileAsync(file, data, { flag: 'a' })
  .then(() => {
    console.log(chalk.yellow(`Created ${moduleFile}`));
  })
  .catch(error => {
    throw new Error(error);
  });
