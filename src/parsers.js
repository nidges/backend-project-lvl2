import YAML from 'yaml';

export default (content, format) => {
  // const { content, format } = getFileData(path);

  if (format === '.json') {
    return JSON.parse(content);
  } if (format === '.yml' || format === '.yaml') {
    return YAML.parse(content);
  }
  throw new Error('wrong file format!');
};
