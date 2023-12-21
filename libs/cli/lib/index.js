const commander = require('commander');
const semver = require('semver');
const pkg = require('../../../package.json');
const createInitCommand = require('../../command/initCommand');
const { log, isDebug } = require('../../utils');
const { program }  = commander;

const LOWEST_NODE_VERSION = '18.0.0';

function checkNodeVerson() {
    if(!semver.gte(process.version, LOWEST_NODE_VERSION)) {
        throw new Error(`pretty-cli 必须安装大于等于${LOWEST_NODE_VERSION}的nodejs版本`)
    }
}

function preAction() {
    checkNodeVerson();
}
module.exports = function(args) {
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