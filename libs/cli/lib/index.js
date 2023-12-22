import { program }  from 'commander';
import path from 'node:path';
import fse from 'fs-extra';
import semver  from 'semver';
import createInitCommand from '../../command/initCommand.js';
import { log, isDebug } from '../../utils/index.js';
import { dirname } from 'dirname-filename-esm';


const LOWEST_NODE_VERSION = '18.0.0';

const pkgPath = path.resolve(dirname(import.meta), '../../../package.json');

const pkg = fse.readJSONSync(pkgPath);

function checkNodeVerson() {
    if(!semver.gte(process.version, LOWEST_NODE_VERSION)) {
        throw new Error(`pretty-cli 必须安装大于等于${LOWEST_NODE_VERSION}的nodejs版本`)
    }
}

function preAction() {
    checkNodeVerson();
}
export default function entry(args) {
    log.info(pkg.version);
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)
        .hook('preAction', preAction)
    createInitCommand(program);
    program.parse(process.argv)
}

process.on('uncaughtException', (e) => {
    if(isDebug()) {
        console.log(e)
    }else {
        console.log(e.message)
    }
})