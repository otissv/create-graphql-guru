#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.1')
  .command('express <req> [optional]', 'Creates a guru express server')
  .command(
    'mutation <req> [optional]',
    'Creates resolver and schema mutation modules'
  )
  .command(
    'query <req> [optional]',
    'Creates resolver and schema query modules'
  )
  .command('type <req> [optional]', 'Creates schema type module')
  .parse(process.argv);
