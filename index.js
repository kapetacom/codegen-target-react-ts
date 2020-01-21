const {Target} = require('@blockware/codegen-target');
const prettier = require("prettier");
const {snakeCase} = require("snake-case");

class ReactTSTarget extends Target {

    constructor(options) {
        super(options, __dirname);
    }

    _createTemplateEngine(data, context) {
        const engine = super._createTemplateEngine(data, context);

        engine.registerHelper('snakecase', (name) => {
            return snakeCase(name);
        });

        return engine
    }

    _postProcessCode(filename, code) {
        let parser = null;
        let tabWidth = 4;

        if (filename.endsWith('.json')) {
            parser = 'json';
        }

        if (filename.endsWith('.js') ||
            filename.endsWith('.jsx') ||
            filename.endsWith('.ts') ||
            filename.endsWith('.tsx')) {
            parser = 'babel';
        }

        if (filename.endsWith('.yaml') ||
            filename.endsWith('.yml')) {
            parser = 'yaml';
            tabWidth = 2;
        }

        if (!parser) {
            return code;
        }

        try {
            return prettier.format(code, {
                tabWidth: tabWidth,
                parser: parser
            });
        } catch (e) {
            console.log('Failed to prettify source: ' + filename + '. ' + e);
            return code;
        }
    }

}

module.exports = ReactTSTarget;