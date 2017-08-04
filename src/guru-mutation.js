import program, { args, resolver, schema } from './schema-helpers';
import Bluebird from 'bluebird';
import fs from 'fs';
import shell from 'shelljs';
import chalk from 'chalk';

Bluebird.promisifyAll(fs);
const moduleRoot = `${process.cwd()}/server/modules`;
const dest = program.path ? `${moduleRoot}/${program.path}` : moduleRoot;

const { mkdir } = shell;
const { database, fileName, methods, moduleName, path } = args({
  program
});

let resolverStr;

mkdir('-p', path);

function createResolver () {
  if (program.resolver) {
    resolverStr = resolver({
      database,
      methods,
      moduleName
    });

    const moduleFile = `resolverMutation-${moduleName}${fileName ? '-' + fileName : ''}.js`;
    const file = `${path}/${moduleFile}`;

    fs
      .writeFileAsync(file, resolverStr, { flag: 'wx' })
      .then(() => {
        process.stdout.write(chalk.yellow(`Created ${moduleFile}\n`));
        process.stdout.write(`
        Run npm install graphql-guru-${database} to instal  ${database} client.

        In server/core/database/index-database.js

        import * as ${database} from 'graphql-guru-${database}';

        export const databases = {
          ${database}
        };`);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}

function createSchema () {
  if (program.schema) {
    const moduleFile = `schemaMutation-${moduleName}${fileName ? '-' + fileName : ''}.graphql`;
    const file = `${path}/${moduleFile}`;
    const options = { flag: 'wx' };

    const schemaStr = methods ? schema({ methods, moduleName }) : '';

    fs
      .writeFileAsync(file, schemaStr, options)
      .then(() => {
        process.stdout.write(chalk.yellow(`Created ${moduleFile}\n`));
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}

createSchema();
createResolver();
