/*
 * @Author: yanqiang
 * @Date: 2023-12-21 17:21:29
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:29:12
 * @Description: 
 */
const log = require('npmlog');

if(process.argv.includes('--debug') || process.argv.includes('-d')) {
    log.level = 'verbose';
}else {
    log.level = 'info';
}

log.heading = 'pretty';
module.exports = log;
