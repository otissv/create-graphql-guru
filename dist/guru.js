#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('express <req> [optional]', 'Creates a guru express server').command('type <req> [optional]', 'Creates schema type module').command('mutation <req> [optional]', 'Creates resolver and schema mutation modules').command('query <req> [optional]', 'Creates resolver and schema query modules').parse(process.argv);
//# sourceMappingURL=guru.js.map