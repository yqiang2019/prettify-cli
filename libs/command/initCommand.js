/*
 * @Author: yanqiang
 * @Date: 2023-12-21 16:48:44
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:16:18
 * @Description:  
 */
const Command = require('./command');

class InitCommand extends Command{
    // constructor(instance) {
    //     super(instance);
    // }
    get command() {
        return 'init [name]';
    }
    get description() {
        return 'init project';
    }
    get options() {
        return [
            ['-f, --force', '是否强制更新', false],
        ]
    }
    action([name, opts]) {
        console.log('init', name, opts)
    }
}

function init(instance) {
    return new InitCommand(instance);
}
module.exports = init