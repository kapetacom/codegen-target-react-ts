import {Target, Template, TypeLike} from '@kapeta/codegen-target';
import prettier from "prettier";
import {snakeCase} from "snake-case";
import Path from "path";
import {spawnSync} from "child_process";
import {GeneratedAsset} from "@kapeta/codegen";

export default class ReactTSTarget extends Target {

    constructor(options?:any) {
        super(options, Path.resolve(__dirname,'../'));
    }

    protected _createTemplateEngine(data:any, context:any) {
        const engine = super._createTemplateEngine(data, context);

        engine.registerHelper('snakecase', (name:string) => {
            return snakeCase(name);
        });

        engine.registerHelper('enumValues', (values:any[]) => {
            return Template.SafeString('\t' + values.map(value => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
        });

        const $fieldType = (value:TypeLike) => {
            if (!value) {
                return value;
            }

            if (typeof value !== 'string') {
                if (value.ref) {
                    value = value.ref.substring(0,1).toUpperCase() + value.ref.substring(1);
                } else if (value.type) {
                    value = value.type;
                }
            }

            let type = value as string;
            let array = false;
            if (type.endsWith('[]')) {
                type = type.substring(0, type.length - 2);
                array = true;
            }

            switch (type) {
                case 'integer':
                case 'int':
                case 'float':
                case 'double':
                case 'short':
                    value = `number${array ? '[]' : ''}`;
                    break;
            }

            return Template.SafeString(value as string);
        };
        engine.registerHelper('fieldtype', $fieldType);
        engine.registerHelper('returnType', (value) => {
            if (!value) {
                return 'void';
            }

            return $fieldType(value);
        });

        return engine
    }
    protected _postProcessCode(filename:string, code:string):string {
        let parser = null;
        let tabWidth = 4;

        if (filename.endsWith('.json')) {
            parser = 'json';
        }

        if (filename.endsWith('.js') ||
            filename.endsWith('.jsx')) {
            parser = 'babel';
        }

        if (filename.endsWith('.ts') ||
            filename.endsWith('.tsx')) {
            parser = 'babel-ts';
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

    async postprocess(targetDir:string, files: GeneratedAsset[]): Promise<void> {
        const packageJsonChanged = files.some(file => file.filename === 'package.json');

        if (packageJsonChanged) {
            spawnSync('npm', ['install'], {
                cwd: targetDir,
            });
        }
    }
}