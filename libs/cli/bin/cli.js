#!/usr/bin/env node 
import imporLocal from 'import-local';
import { log } from '../../utils/index.js';
import entry  from '../lib/index.js'
import { filename } from 'dirname-filename-esm';


const __filename = filename(import.meta);
if(imporLocal(__filename)) {
    log.info('cli', '正在使用pretty-cli');
}else {
    entry(process.argv.slice(2))
}