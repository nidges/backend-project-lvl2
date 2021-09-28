import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import getObjFromPath from '../src/parsers.js'
import fs from "fs";

// console.log(process.env);

// path.resolve('.') дает точку входа для npx - корень проекта (птмч тесты запускаются через npx)
// - не работает если сменить директорию и запустить тесты, работает только из корня проекта
// const getFixturePath = (filename) => path.join(path.resolve('.'), '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let pathToJson1;
let pathToJson2;
let pathToYml1;
let pathToYml2;

beforeAll(() => {
  pathToJson1 = getFixturePath('file1.json');
  pathToJson2 = getFixturePath('file2.json');
  pathToYml1 = getFixturePath('file1.yml');
  pathToYml2 = getFixturePath('file2.yaml');
});

// const pathToJson1 = `${__dirname}/../__fixtures__/file1.json`;
// const pathToJson2 = `${__dirname}/../__fixtures__/file2.json`;

// test('two json files diff', () => {
//   expect(genDiff(pathToJson1, pathToJson2)).toEqual('{\n'
//       + ' - follow : false\n'
//       + '   host : hexlet.io\n'
//       + ' - proxy : 123.234.53.22\n'
//       + ' - timeout : 50\n'
//       + ' + timeout : 20\n'
//       + ' + verbose : true\n'
//       + '}');
// });

test('two files diff, string', () => {
  expect(genDiff(pathToJson1, pathToJson2)).toEqual(
      fs.readFileSync(getFixturePath('diff-string.txt'), 'utf8')
  );
  expect(genDiff(pathToYml1, pathToYml2)).toEqual(
      fs.readFileSync(getFixturePath('diff-string.txt'), 'utf8')
  );
  expect(genDiff(pathToYml1, pathToJson2)).toEqual(
      fs.readFileSync(getFixturePath('diff-string.txt'), 'utf8')
  );
});

test('parsers', () => {
  expect(getObjFromPath(pathToJson1)).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
  expect(getObjFromPath(pathToYml1)).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});