#!/usr/bin/env node 
const imporLocal = require('import-local');
const { log } = require('../../utils');
const entry = require('../lib/index')

if(imporLocal(__filename)) {
    log.info('cli', '正在使用pretty-cli');
}else {
    entry(process.argv.slice(2))
}