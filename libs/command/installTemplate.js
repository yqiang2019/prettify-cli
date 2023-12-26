import fse from 'fs-extra';
import { execa } from 'execa';
import path from 'path';
import ora from 'ora';
import { pathExistsSync } from 'path-exists';
import { log } from '../utils/index.js';

function getCacheFilePath(targetPath, template) {
    return path.resolve(targetPath, 'node_modules', template.npmName, 'template');  
}
function copyFile(targetPath, template, installDir) {
    const originFile = getCacheFilePath(targetPath, template);
    const fileList = fse.readdirSync(originFile);
    const spinner = ora('正在拷贝模板文件...').start();
    fileList.map(file => {
        fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`);
    });
    spinner.stop();
    log.info('模板拷贝成功');
}
export default async function installTemplate(selectedTemplate, opts) {
    const { force = false} = opts;
    const { targetPath, template, name } = selectedTemplate;
    const rootDir = process.cwd();
    fse.ensureDirSync(targetPath);
    const installDir = path.resolve(`${rootDir}/${name}`);

    if(pathExistsSync(installDir) ) {
       if(!force) {
            log.error(`当前目录已存在${installDir}文件夹`)
            return;
       }else {
            fse.removeSync(installDir);
            fse.ensureDirSync(installDir);
       }
    }else {
        fse.ensureDirSync(installDir);
    }
    copyFile(targetPath, template, installDir);

}