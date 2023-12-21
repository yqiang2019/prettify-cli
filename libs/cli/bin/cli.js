#!/usr/bin/env node 
const imporLocal = require('import-local');
const npmlog = require('npmlog');
const entry = require('../lib/index')

if(imporLocal(__filename)) {
    npmlog.info('cli', '正在使用pretty-cli');
}else {
    entry(process.argv.slice(2))
}