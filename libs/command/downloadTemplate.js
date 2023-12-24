import { execa } from 'execa';
import path from 'path';
import ora from 'ora';
import fse from 'fs-extra';
import { pathExistsSync } from 'path-exists';
import { log, printErrorLog } from '../utils/index.js';

function getCacheDir(targetPath) {
    return path.resolve(targetPath, 'node_modules');
}

function makeCacheDir(targetPath) {
    const cacheDir = getCacheDir(targetPath);
    if(!pathExistsSync(cacheDir)) {
        log.verbose('创建缓存目录', cacheDir);
        fse.mkdirpSync(cacheDir);
    }
}

async function downloadAddTemplate(targetPath, template) {
    const { npmName, version } = template;
    const installName = 'npm';
    const installArgs = ['install', `${npmName}@${version}`];
    const subprocess = execa(installName, installArgs, { cwd: targetPath });
    await subprocess;
}
export default async function downloadTemplate(selectedTemplate, opts) {
    const {targetPath, template } = selectedTemplate;
    makeCacheDir(targetPath);
    const spinner = ora('下载模板中...').start();
    try {
        await downloadAddTemplate(targetPath, template);
        spinner.stop();
        log.info('下载模板成功');
    } catch (error) {
        spinner.stop();
        printErrorLog(error)
    }
}