import { isAbsolute, resolve, extname } from 'path';
import process from 'process';
import fs from 'fs';
import YAML from 'yaml';

const getFileData = (path) => {
  const pathResolved = isAbsolute(path) ? path : resolve(process.cwd(), path);
  const content = fs.readFileSync(pathResolved, 'utf8');
  const format = extname(path);

  return { content, format };
};

export default (path) => {
  const { content, format } = getFileData(path);

  if (format === '.json') {
    return JSON.parse(content);
  } if (format === '.yml' || format === '.yaml') {
    return YAML.parse(content);
  }
  throw new Error('wrong file format!');
};
