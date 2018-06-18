var Ajv = require('ajv');
var localize = require('ajv-i18n');
var path = require('path');
var ajv = new Ajv({allErrors: true});

function addSchemas() {
    var schemasArray = findSchemas();
    schemasArray.forEach(function (schema) {
        ajv.addSchema(require(schema), getKey(schema));
    });
}

function getKey(path) {
    return path
        .substring(path.lastIndexOf('\\') + 1)
        .replace('.json', '');
}

function validateJSON(key) {
    var schema = ajv.getSchema(key).schema;
    var validate = ajv.compile(schema);
    var valid = ajv.validate(schema, require(schema.json));
    if (!valid) {
        localize.ru(schema.errors);
        console.log(ajv.errorsText(validate.errors, {separator: '\n'}));
    }
    else console.log(`JSON  ${key}.json  is valid`);
}

function findSchemas() {
    var recursiveReadSync = require('recursive-readdir-sync'), files;
    try {
        files = recursiveReadSync(__dirname + '/json-schemas');
    } catch (err) {
        if (err.errno === 34) {
            console.log('Path does not exist');
        } else {
            throw err;
        }
    }
    var schemasArray = [];
    files.forEach(function (file) {
        schemasArray.push(file);
    });
    return schemasArray;
}

module.exports = {validateJSON: validateJSON, addSchemas: addSchemas};