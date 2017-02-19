/* eslint-disable strict,import/no-extraneous-dependencies */

'use strict';

const { rollup } = require('rollup');
const rollupPlugins = require('./rollupPlugins');
const denodeify = require('denodeify');
const { resolve } = require('path');

function buildModules(filepath) {
  const pkg = require(resolve(filepath, 'package.json'));
  const topPkg = require(resolve(filepath, '../../package.json'));
}

