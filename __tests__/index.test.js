import path, { dirname } from 'path';
// import process from 'process';
// import fs from 'fs';
import { fileURLToPath } from 'url';
import { genDiff, getObjFromPath } from '../src/index.js';

// console.log(process.env);

// path.resolve('.') дает точку входа для npx - корень проекта (птмч тесты запускаются через npx)
// - не работает если сменить директорию и запустить тесты, работает только из корня проекта
// const getFixturePath = (filename) => path.join(path.resolve('.'), '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let path1;
let path2;

beforeAll(() => {
  path1 = getFixturePath('file1.json');
  path2 = getFixturePath('file2.json');
});

// const path1 = `${__dirname}/../__fixtures__/file1.json`;
// const path2 = `${__dirname}/../__fixtures__/file2.json`;

test('two json files diff', () => {
  expect(genDiff(path1, path2)).toEqual('{\n'
      + ' - follow : false\n'
      + '   host : hexlet.io\n'
      + ' - proxy : 123.234.53.22\n'
      + ' - timeout : 50\n'
      + ' + timeout : 20\n'
      + ' + verbose : true\n'
      + '}');
});

test('getting object from path to file', () => {
  expect(getObjFromPath(path1)).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});
