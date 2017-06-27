#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').command('express <req> [optional]', 'Creates a guru express server').command('mutation <req> [optional]', 'Creates resolver and schema mutation modules').command('query <req> [optional]', 'Creates resolver and schema query modules').command('type <req> [optional]', 'Creates schema type module').parse(process.argv);
//# sourceMappingURL=guru.js.map