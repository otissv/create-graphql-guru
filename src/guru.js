#!/usr/bin/env node

import program from 'commander';

program
  .command('express', 'Creates a guru express server')
  .command('type -m', 'Creates schema type module')
  .command(
    'mutation -m',
    'Creates resolver and schema mutation modules'
  )
  .command(
    'query -m',
    'Creates resolver and schema query modules'
  )
  .parse(process.argv);
