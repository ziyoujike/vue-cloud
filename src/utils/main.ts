/**
 * 数据回显
 * data 需要被回显的数据
 * source 数据源
 */
const dataEcho = (data: any, source: any) => {
    for (const key in data) {
        if (!source[key] && source[key] !== 0) continue;
        data[key] = source[key];
    }
    return data;
};

/**
 * 重置表单数据
 * @param fromState 目标赋值对象
 * @param source 资源对象
 */
const resetFromState = (fromState: any, source: any) => {
    // tslint:disable-next-line:forin
    for (const key in source) {

        fromState[key] = source[key];
    }
};
// 提取字典
const dictionaries = (key: string) => {
    const temp = [];
    let dictionaries = localStorage.getItem('dictionaries');
    const data = dictionaries ? JSON.parse(dictionaries) : [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === key) {
            temp.push(data[i]);
        }
    }
    return temp;
};

/**
 * 获取字典标题
 * 用法 formatDictionaries("",data)
 */
const formatDictionaries = (key: string, value: number): string => {
    const data = dictionaries(key);
    let title = '';
    data.some((item) => {
        if (item.code === Number(value)) { title = item.title; }
    });
    return title;
};


export {
    dataEcho,
    resetFromState,
    dictionaries,
    formatDictionaries
}