var Ajv = require('ajv');
var localize = require('ajv-i18n');

function validateJSON(schema, json) {
    var ajv = new Ajv({allErrors: true});
    var validate = ajv.compile(schema);
    var valid = validate(json);
    if (!valid) {
        localize.ru(validate.errors);
        console.log(ajv.errorsText(validate.errors, {separator: '\n'}));
    }
    else console.log("JSON is valid");
}

module.exports = {validateJSON: validateJSON};