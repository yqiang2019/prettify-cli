import child_process from 'node:child_process';
import { log } from './index.js';

console.log(child_process)

export function getLatestVersion(pkgName) {
    try {
        const result = child_process.execSync(`npm show ${pkgName} version`, {encoding: 'utf-8'});
        console.log(result)
        return result.trim()
    } catch (error) {
        log.error(error)
        return null
    }
}