import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathToJson1 = getFixturePath('file1.json');
const pathToJson2 = getFixturePath('file2.json');
const pathToYml1 = getFixturePath('file1.yml');
const pathToYml2 = getFixturePath('file2.yaml');
const correctDiffStylish = fs.readFileSync(getFixturePath('diff-stylish.txt'), 'utf8');
const correctDiffPlain = fs.readFileSync(getFixturePath('diff-plain.txt'), 'utf8');
const correctDiffJson = fs.readFileSync(getFixturePath('diff-json.txt'), 'utf8');

const outputs = [['stylish', correctDiffStylish], ['plain', correctDiffPlain], ['json', correctDiffJson]];

describe.each(outputs)('test block', (format, expected) => {
  test.each([
    {
      path1: pathToJson1, path2: pathToJson2,
    },
    {
      path1: pathToYml1, path2: pathToYml2,
    },
    {
      path1: pathToYml1, path2: pathToJson2,
    }])('two files diff', ({
    path1, path2,
  }) => {
    expect(genDiff(path1, path2, format)).toEqual(expected);
  });
});
