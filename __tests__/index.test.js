import { genDiff, getObjFromPath } from '../src/index.js';

test('two json files diff', () => {
    expect(genDiff().toEqual());
})

test('getting object from path to file', () => {
    expect(getObjFromPath().toEqual());
})