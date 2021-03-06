This package provides a Generator of Difference between two .yaml or .json files.

**Installation:**
1. Check if you have node.js installed (node --version). If not - install it with available package manager
2. Clone this repo
3. Install dependencies with 'make install' or 'npm ci'
4. Run npm link
5. Use gendiff -h for help with options

**Usage:** gendiff [options] <filepath1> <filepath2>

**Options:**

| Option |Description  |
| :---        |    :----:   |
| -V, --version     | output the version number       |
| -f, --format [type]   | output format (default: "stylish")        |
| -h, --help   | output usage information        |

Program uses two required arguments - paths to files. Either relative or absolute.
There are three output format types (-f, --format):
1.  _stylish - default_:
```
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
```
2. _plain_:
```json lines
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group1.nest' was updated. From [complex value] to 'str'
```
3. _json_:
```json
    [
      {
        "state": "nested",
        "key": "group1",
        "children": [
          {
            "state": "changed",
            "key": "baz",
            "valueBefore": "bas",
            "valueAfter": "bars"
          },
          {
            "state": "same",
            "key": "foo",
            "value": "bar"
          },
          {
            "state": "changed",
            "key": "nest",
            "valueBefore": {
              "key": "value"
            },
            "valueAfter": "str"
          }
        ]
      }
    ]
```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/nidges/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/nidges/backend-project-lvl2/actions)

### CodeClimate
[![Maintainability](https://api.codeclimate.com/v1/badges/dd3647cd07c204c32ab5/maintainability)](https://codeclimate.com/github/nidges/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dd3647cd07c204c32ab5/test_coverage)](https://codeclimate.com/github/nidges/backend-project-lvl2/test_coverage)

### GitHub Actions
[![my workflow](https://github.com/nidges/backend-project-lvl2/actions/workflows/my-workflow.yml/badge.svg?event=push)](https://github.com/nidges/backend-project-lvl2/actions/workflows/my-workflow.yml)
  
### genDiff - two json files, pretty view
[![asciicast](https://asciinema.org/a/NNS08MaudOYBwbw0YsXet4v0M.svg)](https://asciinema.org/a/NNS08MaudOYBwbw0YsXet4v0M)
### genDiff - two json/yaml files, pretty view
[![asciicast](https://asciinema.org/a/4NBqpdIr5SWBXfDbHpHEP9hqm.svg)](https://asciinema.org/a/4NBqpdIr5SWBXfDbHpHEP9hqm)
### genDiff - nested files, pretty view
[![asciicast](https://asciinema.org/a/Ox3ZAahytTrwEGGh3NqRpYJO9.svg)](https://asciinema.org/a/Ox3ZAahytTrwEGGh3NqRpYJO9)
### genDiff - nested files, plain view
[![asciicast](https://asciinema.org/a/fcDIWYE988JQLwG9thT6ldqys.svg)](https://asciinema.org/a/fcDIWYE988JQLwG9thT6ldqys)
### genDiff - nested files, stylish, plain or json view
[![asciicast](https://asciinema.org/a/JMoLawvXXZOHxB7OZ9DoCnDBZ.svg)](https://asciinema.org/a/JMoLawvXXZOHxB7OZ9DoCnDBZ)
