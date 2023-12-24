import child_process from 'node:child_process';
import { log } from './index.js';

export function getLatestVersion(pkgName) {
    try {
        const result = child_process.execSync(`npm show ${pkgName} version`, {encoding: 'utf-8'});
        return result.trim()
    } catch (error) {
        log.error(error)
        return null
    }
}