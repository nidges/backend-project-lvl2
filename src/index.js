import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

// const path1 = '/Users/mariastepanova/WebstormProjects/backend-project-lvl2/__fixtures__/file1.json';
// const path2 = '../__fixtures__/file2.json';
// const path2 = '/Users/mariastepanova/WebstormProjects/backend-project-lvl2/__fixtures__/file2.json';

const genDiff = (path1, path2) => {
    const ext1 = extname(path1);
    const ext2 = extname(path2);

    if (!path1.startsWith('/')) {
        path1 = resolve(cwd(), path1);
    }

    if (!path2.startsWith('/')) {
        path2 = resolve(cwd(), path2);
    }

    const json1 = readFileSync(path1, 'utf8');
    const json2 = readFileSync(path2, 'utf8');

    const obj1 = JSON.parse(json1);
    const obj2 = JSON.parse(json2);

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const allKeys = _.union(keys1, keys2);

    const allKeysSorted = _.sortBy(allKeys);

    const string = allKeysSorted.reduce((acc, key) => {

        if (obj1[key] === obj2[key]) {
            // console.log('----> if keys are equal', `${acc}\n    ${key} : ${obj1[key]}`)
            return `${acc}\n    ${key} : ${obj1[key]}`;
        }

        if (!_.has(obj1, key)) {
            // console.log('----> if key is only in second', `${acc}\n  + ${key} : ${obj2[key]}`)
            return `${acc}\n  + ${key} : ${obj2[key]}`;
        }

        if (!_.has(obj2, key)) {
            // console.log('----> if key is only in first', `${acc}\n  - ${key} : ${obj1[key]}`)
            return `${acc}\n  - ${key} : ${obj1[key]}`;
        }

        if (obj1[key] !== obj2[key]) {
            // console.log('----> if keys are not equal', `${acc}\n  - ${key} : ${obj1[key]} \n  + ${key} : ${obj2[key]}`)
            return `${acc}\n  - ${key} : ${obj1[key]} \n  + ${key} : ${obj2[key]}`;
        }
    }, '');

    return `{ ${string} \n}`;
}

// genDiff(path1, path2);

export default genDiff;