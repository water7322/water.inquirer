import * as inquirer from 'inquirer';
interface Option {
    value: number | string | boolean;
    text: string;
    [key: string]: any;
}

async function select(content: string, options: Array<Option>) {
    const val = await ask('list', content || '请选择', {
        choices: options?.map(item => item.text),
        askAnswered: true
    });
    const item = options.find(item => item.text === val);
    return item?.value;
}
async function checkbox(content: string, options: Array<Option>) {
    const val: Array<any> = await ask('checkbox', content || '请选择', {
        choices: options?.map(item => item.text),
        askAnswered: true
    });
    const map: {[key: string]: any} = {};
    options.forEach(item => (map[item.text] = item.value));
    const items = val?.map(val => map[val]);
    return items;
}
async function input(content: string) {
    const val = await ask('input', content || '请输入');
    return val?.trim();
}
async function confirm(content: string) {
    const val = await ask('confirm', content || '请选择');
    return !!val;
}
async function ask(type: string, content: string, param?: object) {
    const result = await inquirer.prompt([{type: type, name: 'water', message: content, ...param}]);
    return result.water;
}
export default {select, checkbox, input, confirm, ask};
