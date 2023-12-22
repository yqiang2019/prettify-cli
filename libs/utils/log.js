/*
 * @Author: yanqiang
 * @Date: 2023-12-21 17:21:29
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:29:12
 * @Description: 
 */
import log from 'npmlog';
import isDebug from './isDebug.js';

if(isDebug()) {
    log.level = 'verbose';
}else {
    log.level = 'info';
}

log.heading = 'pretty';
export default log;
