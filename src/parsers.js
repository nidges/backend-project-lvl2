import YAML from 'yaml';

export default (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  } if (format === 'yaml' || format === 'yml') {
    return YAML.parse(content);
  }
  throw new Error('wrong file format!');
};
