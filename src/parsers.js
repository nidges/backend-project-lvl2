import { isAbsolute, resolve, extname } from 'path';
import process from 'process';
import fs from 'fs';
import YAML from 'yaml';

export default (path) => {
  const pathResolved = isAbsolute(path) ? path : resolve(process.cwd(), path);
  const content = fs.readFileSync(pathResolved, 'utf8');
  const format = extname(path);

  let result;

  if (format === '.json') {
    result = JSON.parse(content);
  } else if (format === '.yml' || format === '.yaml') {
    result = YAML.parse(content);
  }
  // } else {
  //   throw new Error('wrong file format!');
  // }

  return result;
};
// s('__fixtures__/file1.json');
