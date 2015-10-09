#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('palmetto-adventure');

shop.add('About Palmetto Flow', function () { return require('./1-about') });
shop.add('NodeJS Internal Adapter', function () { return require('./2-palmetto-nodejs') });
shop.add('Palmetto Flow Event Message', function () {return require('./3-events')})
shop.add('Palmetto Flow Helper', function () {return require('./4-helpers')})


shop.execute(process.argv.slice(2));