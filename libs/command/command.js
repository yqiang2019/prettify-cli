/*
 * @Author: yanqiang
 * @Date: 2023-12-21 16:44:00
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:19:38
 * @Description: 
 */
class Command {
    constructor(instance) {
        if(!instance) {
            throw new Error('instance must be')
        }
        this.program = instance;
        const cmd = this.program.command(this.command)
        cmd.hook('preAction', () => {
            this.preAction()
        })
        cmd.hook('postAction', () => {
            this.postAction()
        })
        cmd.description(this.description);
        if(this.options?.length > 0) {
            this.options.forEach(option => {
                cmd.option(...option);
            });
        }
        cmd.action((...params) => {
                this.action(params);
        });
    }
    get command() {
        throw new Error('command must be implement');
    }
    get description() {
        throw new Error('description must be implement');
    }
    action() {
        throw new Error('action must be implement');
    }
    preAction() {
       // empty
    }
    postAction() {
       // empty
    }
}

export default  Command;