/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { Target, Template, TypeLike } from '@kapeta/codegen-target';
import prettier from 'prettier';
import { snakeCase } from 'snake-case';
import Path from 'path';

import { GeneratedAsset, GeneratedFile, SourceFile } from '@kapeta/codegen';
import { HelperOptions } from 'handlebars';
import { exec } from '@kapeta/nodejs-process';

type MapUnknown = { [key: string]: any };
function copyUnknown(from: MapUnknown, to: MapUnknown): MapUnknown {
    Object.entries(from).forEach(([key, value]) => {
        if (!(key in to)) {
            to[key] = value;
        }
    });
    return to;
}

export default class ReactTSTarget extends Target {
    constructor(options?: any) {
        super(options, Path.resolve(__dirname, '../'));
    }

    protected _createTemplateEngine(data: any, context: any) {
        const engine = super._createTemplateEngine(data, context);

        engine.registerHelper('snakecase', (name: string) => {
            return snakeCase(name);
        });

        engine.registerHelper('mswpath', (path: string) => {
            // Replace all request parameters like e.g {id} with :id
            return path.replace(/\{(\w+)\}/g, ':$1');
        });

        engine.registerHelper('enumValues', (values: any[]) => {
            return Template.SafeString(
                '\t' + values.map((value) => `${value} = ${JSON.stringify(value)}`).join(',\n\t')
            );
        });

        const $fieldType = (value: TypeLike) => {
            if (!value) {
                return value;
            }

            if (typeof value !== 'string') {
                if (value.ref) {
                    value = value.ref.substring(0, 1).toUpperCase() + value.ref.substring(1);
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
                case 'char':
                case 'byte':
                    value = `string${array ? '[]' : ''}`;
                    break;
                case 'date':
                    value = 'number';
                    break;
                case 'integer':
                case 'int':
                case 'float':
                case 'double':
                case 'long':
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

        engine.registerHelper('ifValueType', (type, options) => {
            if (
                (type?.type || type?.ref) &&
                type?.type?.toLowerCase() !== 'void' &&
                type?.ref?.toLowerCase() !== 'void'
            ) {
                return Template.SafeString(options.fn());
            }
            return Template.SafeString('');
        });

        engine.registerHelper('ifVoidType', (type: TypeLike, options: HelperOptions) => {
            // Check if type has a property 'string' (which it would have if it is a SafeString)
            if (type && typeof type === 'object' && 'string' in type) {
                type = type.string as string;
            }

            const isVoid =
                typeof type === 'string'
                    ? type.toLowerCase() === 'void'
                    : type.type?.toLowerCase() === 'void' || type.ref?.toLowerCase() === 'void';

            if (isVoid) {
                return Template.SafeString(options.fn(this));
            }

            // Check if there is an else block and render it, else return an empty string
            return options.inverse ? Template.SafeString(options.inverse(this)) : Template.SafeString('');
        });

        engine.registerHelper('include-proxy-route', function (this: any, options: HelperOptions) {
            if (!context.spec.consumers) {
                return '';
            }

            const checker = (consumer: any) => {
                return (
                    consumer.kind.toLowerCase().startsWith('kapeta/resource-type-rest-client:') ||
                    consumer.kind.toLowerCase().startsWith('kapeta/resource-type-web-fragment:')
                );
            };

            if (context.spec.consumers.some(checker)) {
                return options.fn(this);
            }
        });

        return engine;
    }
    protected _postProcessCode(filename: string, code: string): string {
        let parser = null;
        let tabWidth = 4;

        if (filename.endsWith('.json')) {
            parser = 'json';
        }

        if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
            parser = 'babel';
        }

        if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
            parser = 'babel-ts';
        }

        if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
            parser = 'yaml';
            tabWidth = 2;
        }

        if (!parser) {
            return code;
        }

        try {
            return prettier.format(code, {
                tabWidth: tabWidth,
                parser: parser,
            });
        } catch (e) {
            console.log('Failed to prettify source: ' + filename + '. ' + e);
            return code;
        }
    }

    mergeFile(sourceFile: SourceFile, newFile: GeneratedFile): GeneratedFile {
        if (sourceFile.filename === 'package.json') {
            // We can merge the dependencies and scripts into existing package.json without overwriting
            // the existing user adjusted content

            const target = JSON.parse(sourceFile.content);
            const newContent = JSON.parse(newFile.content);
            if (!target.dependencies) {
                target.dependencies = {};
            }

            if (!target.devDependencies) {
                target.devDependencies = {};
            }

            Object.assign(target.devDependencies, newContent.devDependencies);
            Object.assign(target.dependencies, newContent.dependencies);

            if (!target.scripts) {
                target.scripts = {};
            }
            copyUnknown(newContent.scripts, target.scripts);
            copyUnknown(newContent, target);

            return {
                ...newFile,
                content: JSON.stringify(target, null, 4),
            };
        }

        if (sourceFile.filename === '.devcontainer/devcontainer.json') {
            // We can merge the environment variables prefixed with KAPETA_ into the containerEnv
            const target = JSON.parse(sourceFile.content);
            const newContent = JSON.parse(newFile.content);
            if (!target.containerEnv) {
                target.containerEnv = {};
            }

            const containerEnv: MapUnknown = {
                ...(newContent.containerEnv ?? {}),
            };
            Object.entries(target.containerEnv).forEach(([key, value]) => {
                if (key.toLowerCase().startsWith('kapeta_')) {
                    return;
                }
                containerEnv[key] = value;
            });

            target.containerEnv = containerEnv;

            return {
                ...newFile,
                content: JSON.stringify(target, null, 4),
            };
        }

        return super.mergeFile(sourceFile, newFile);
    }

    async postprocess(targetDir: string, files: GeneratedAsset[]): Promise<void> {
        const packageJsonChanged = files.some((file) => file.filename === 'package.json');

        if (packageJsonChanged) {
            console.log('Running npm install in %s', targetDir);
            const child = exec('npm install', {
                cwd: targetDir,
                windowsHide: true,
            });
            await child.wait();
            console.log('install done');
        }
    }
}
