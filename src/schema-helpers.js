import program from 'commander';
import { capitalize } from './utils';
const moduleRoot = `${process.cwd()}/server/modules`;

export default program
  .option('-m, --module <name>', 'Modules name')
  .option('-d, --database <name>', 'Extends module with database client')
  .option('-r, --resolver [true]', 'Create mutation resolve')
  .option('-s, --schema [true]', 'Name of query module')
  .option(
    '-p, --path',
    'Path to where module will be created, relative to root.'
  )
  .parse(process.argv);

export function args ({ program }) {
  if (typeof program.module !== 'string') {
    throw new Error('No module name provide.');
  }
  const moduleName = program.module.split('.');

  return {
    moduleName: moduleName[0].toLowerCase(),
    fileName: moduleName[1] ? moduleName[1].toLowerCase() : '',
    methods: program.args.length !== 0 ? program.args : null,
    database: program.database !== 'string' ? program.database : null,
    path: program.path ? `${moduleRoot}/${program.path}` : moduleRoot
  };
}

export function resolver ({ database, methods, moduleName }) {
  const moduleMethods = methods == null
    ? []
    : methods.map(method => ` 
  ${method} ({ args, context, databases, locals, models, req }) {

  }`
    );

  const importDatabase = database
    ? `import ${database} from 'graphql-guru-${database};'
    
  
`
    : '';

  return `${importDatabase}export default class ${capitalize(moduleName)} ${database ? 'extends ' + database + ' ' : ''}{
${moduleMethods.join('\n')}
};
`;
}

export function schema ({ methods, moduleName }) {
  return methods
    .map(
      method =>
        `# Add description
${moduleName}${capitalize(method)}(): ${capitalize(moduleName)}

`
    )
    .join('');
}
