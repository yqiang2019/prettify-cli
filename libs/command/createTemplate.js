
import path from 'node:path';
import { homedir } from 'node:os';
import { makeList, makeInput, log, getLatestVersion } from '../utils/index.js';

const TEMP_HOME = '.pretty-cli';
const ADD_TYPE_PROJECT = 'project';
const ADD_TYPE_PAGE = 'page';
const ADD_TEMPLATE = [
    {
        name: 'react',
        value: 'react-template',
        npmName: '@fontend-scaffolding/react-scaffolding',
        version: '1.0.0'
    },
    {
        name: 'vue',
        value: 'vue-template',
        npmName: 'vue',
        version: '1.0.0'
    },
];

const ADD_TYPE = [
    {
        name: '项目',
        value: ADD_TYPE_PROJECT
    },
    {
        name: '页面',
        value: ADD_TYPE_PAGE
    },
];

function getAddType() {
    return makeList({
        choices: ADD_TYPE,
        message: '请选择初始化类型',
        defaultValue: ADD_TYPE_PROJECT
    })
}
function getAddName() {
    return makeInput({
        message: '请输入项目名称',
        defaultValue: '',
        validate: (val) => {
            if(!val || val.length === 0) {
                return '项目名称不能为空';
            }
            return true;
        }
    })
}

function getAddTemplate() {
    return makeList({
        choices: ADD_TEMPLATE,
        message: '请选择项目模板'
    })
}
// 安装缓存目录
function makeTargetPath() {
    return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate');
}
export default async function createTemplate(name, opts) {
    const { type = null, template = null } = opts;
    let addType;
    let addName;
    let selectedTemplate;
    if(type) {
        addType = type;
    }else {
        addType = await getAddType();
    }
    log.verbose('addType', addType);
    if(addType === ADD_TYPE_PROJECT) {
        if(name) {
            addName = name;
        }else {
            addName = await getAddName();
        }
        log.verbose('addName', addName);
        if(template) {
            selectedTemplate = ADD_TEMPLATE.find(item => item.value === template);
        }else {
            const addTemplate  = await getAddTemplate();
            log.verbose('addTemplate', addTemplate);
            selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate);
        }
        if(!selectedTemplate) {
            throw new Error('不支持的项目模板');
        }
        selectedTemplate.version  = getLatestVersion(selectedTemplate.npmName);
        log.verbose('selectedTemplate', selectedTemplate);
        const targetPath = makeTargetPath();
        return {
            type: addType,
            name: addName,
            template: selectedTemplate,
            targetPath
        }
    } else if(addType === ADD_TYPE_PAGE) {
        log.info('创建页面');
    } else {
        throw new Error('不支持的初始化类型');
    }
}