#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('express', 'Creates a guru express server').command('type -m', 'Creates schema type module').command('mutation -m', 'Creates resolver and schema mutation modules').command('query -m', 'Creates resolver and schema query modules').parse(process.argv);
//# sourceMappingURL=guru.js.map