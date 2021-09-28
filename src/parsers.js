import path from "path";
import process from "process";
import fs from "fs";
import YAML from "yaml";

export default (givenPath) => {
    const pathResolved = givenPath.startsWith('/') ? givenPath : path.resolve(process.cwd(), givenPath);
    const content = fs.readFileSync(pathResolved, 'utf8');
    const format = path.extname(givenPath);

    let result;

    if (format === '.json') {
        result = JSON.parse(content);
    }

    if (format === '.yml' || format === '.yaml') {
        result = YAML.parse(content);
    }

    return result;
};