/*
 * @Author: yanqiang
 * @Date: 2023-12-21 17:42:31
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:43:18
 * @Description: 
 */
export default function isDebug() {
    return process.argv.includes('--debug') || process.argv.includes('-d')
}