import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';
import getObjFromPath from '../src/parsers.js';

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
let pathToShortJson;
let pathToShortYml;
let pathToTxDiffStylish;
let pathToTxDiffPlain;
let pathToTxDiffJson;

beforeAll(() => {
  pathToJson1 = getFixturePath('file1.json');
  pathToJson2 = getFixturePath('file2.json');
  pathToYml1 = getFixturePath('file1.yml');
  pathToYml2 = getFixturePath('file2.yaml');
  pathToShortJson = getFixturePath('json-short.json');
  pathToShortYml = getFixturePath('yaml-short.yml');
  pathToTxDiffStylish = getFixturePath('diff-stylish.txt');
  pathToTxDiffPlain = getFixturePath('diff-plain.txt');
  pathToTxDiffJson = getFixturePath('diff-json.txt');
});

test('two files diff, string', () => {
  expect(genDiff(pathToJson1, pathToJson2)).toEqual(
    fs.readFileSync(pathToTxDiffStylish, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToYml2)).toEqual(
    fs.readFileSync(pathToTxDiffStylish, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToJson2)).toEqual(
    fs.readFileSync(pathToTxDiffStylish, 'utf8'),
  );
  expect(genDiff(pathToJson1, pathToJson2, 'plain')).toEqual(
    fs.readFileSync(pathToTxDiffPlain, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToYml2, 'plain')).toEqual(
    fs.readFileSync(pathToTxDiffPlain, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToJson2, 'plain')).toEqual(
    fs.readFileSync(pathToTxDiffPlain, 'utf8'),
  );
  expect(genDiff(pathToJson1, pathToJson2, 'json')).toEqual(
    fs.readFileSync(pathToTxDiffJson, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToYml2, 'json')).toEqual(
    fs.readFileSync(pathToTxDiffJson, 'utf8'),
  );
  expect(genDiff(pathToYml1, pathToJson2, 'json')).toEqual(
    fs.readFileSync(pathToTxDiffJson, 'utf8'),
  );
});

test('parsers', () => {
  expect(getObjFromPath(pathToShortJson)).toEqual({
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
  });

  expect(getObjFromPath(pathToShortYml)).toEqual({
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  });

  // expect(getObjFromPath(pathToTxDiffStylish)).toThrowError(new Error('wrong file format!'));
});
