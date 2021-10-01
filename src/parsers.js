import path from 'path';
import process from 'process';
import fs from 'fs';
import YAML from 'yaml';

export default (givenPath) => {
  const pathResolved = path.isAbsolute(givenPath) ? givenPath : path.resolve(process.cwd(), givenPath);
  const content = fs.readFileSync(pathResolved, 'utf8');
  const format = path.extname(givenPath);

  let result;

  if (format === '.json') {
    result = JSON.parse(content);
  } else if (format === '.yml' || format === '.yaml') {
    result = YAML.parse(content);
  } else {
    throw new Error('wrong file format!');
  }

  return result;
};
