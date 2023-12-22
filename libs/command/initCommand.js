/*
 * @Author: yanqiang
 * @Date: 2023-12-21 16:48:44
 * @LastEditors: yanqiang
 * @LastEditTime: 2023-12-21 17:16:18
 * @Description:  
 */
import { log } from '../utils/index.js';
import Command  from './command.js';
import installTemplate from './installTemplate.js';
import createTemplate from './createTemplate.js';
import downloadTemplate from './downloadTemplate.js';

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
            ['-t, --type <type>', '项目类型(project/page)'],
            ['-tp, --template <template>', '模板名称'],
        ]
    }
    async action([name, opts]) {
        const selectedTemplate = await createTemplate(name, opts);
        log.verbose('selectedTemplate', selectedTemplate);
        await downloadTemplate(selectedTemplate);
        await installTemplate(selectedTemplate, opts);
    }
}

export default function init(instance) {
    return new InitCommand(instance);
}