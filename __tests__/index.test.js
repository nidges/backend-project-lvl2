import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';
import getObjFromPath from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('testing different diff formats', () => {
  const pathToJson1 = getFixturePath('file1.json');
  const pathToJson2 = getFixturePath('file2.json');
  const pathToYml1 = getFixturePath('file1.yml');
  const pathToYml2 = getFixturePath('file2.yaml');
  const correctDiffStylish = fs.readFileSync(getFixturePath('diff-stylish.txt'), 'utf8');
  const correctDiffPlain = fs.readFileSync(getFixturePath('diff-plain.txt'), 'utf8');
  const correctDiffJson = fs.readFileSync(getFixturePath('diff-json.txt'), 'utf8');
  
  test.each([
    { path1: pathToJson1, path2: pathToJson2, format: 'stylish', expected: correctDiffStylish },
    { path1: pathToJson1, path2: pathToJson2, format: 'plain', expected: correctDiffPlain },
    { path1: pathToJson1, path2: pathToJson2, format: 'json', expected: correctDiffJson },
    { path1: pathToYml1, path2: pathToYml2, format: 'stylish', expected: correctDiffStylish },
    { path1: pathToYml1, path2: pathToYml2, format: 'plain', expected: correctDiffPlain },
    { path1: pathToYml1, path2: pathToYml2, format: 'json', expected: correctDiffJson },
    { path1: pathToYml1, path2: pathToJson2, format: 'stylish', expected: correctDiffStylish },
    { path1: pathToYml1, path2: pathToJson2, format: 'plain', expected: correctDiffPlain },
    { path1: pathToYml1, path2: pathToJson2, format: 'json', expected: correctDiffJson }
  ])('two files diff', ({ path1, path2, format, expected }) => {
    expect(genDiff(path1, path2, format)).toEqual(expected);
  })
})

test('parsers', () => {
  const pathToShortJson = getFixturePath('json-short.json');
  const pathToShortYml = getFixturePath('yaml-short.yml');
  
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
});
