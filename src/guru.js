#!/usr/bin/env node

import program from 'commander';

program
  .command('express <req> [optional]', 'Creates a guru express server')
  .command('type <req> [optional]', 'Creates schema type module')
  .command(
    'mutation <req> [optional]',
    'Creates resolver and schema mutation modules'
  )
  .command(
    'query <req> [optional]',
    'Creates resolver and schema query modules'
  )
  .parse(process.argv);
