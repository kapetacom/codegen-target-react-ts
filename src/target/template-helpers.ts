import Handlebars = require('handlebars');
import { snakeCase } from 'snake-case';
import { Template, TypeLike } from '@kapeta/codegen-target';
import { HelperOptions } from 'handlebars';
import { typeName } from '@kapeta/schemas';

export type HandleBarsType = typeof Handlebars;

export const addTemplateHelpers = (engine: HandleBarsType, data: any, context: any): void => {
    engine.registerHelper('snakecase', (name: string) => {
        return snakeCase(name);
    });

    engine.registerHelper('mswpath', (path: string) => {
        // Replace all request parameters like e.g {id} with :id
        return path.replace(/\{(\w+)\}/g, ':$1');
    });

    engine.registerHelper('enumValues', (values: any[]) => {
        return Template.SafeString('\t' + values.map((value) => `${value} = ${JSON.stringify(value)}`).join(',\n\t'));
    });

    engine.registerHelper('keys', function (object: Record<string, any>) {
        if (object && typeof object === 'object' && !Array.isArray(object)) {
            return Object.keys(object);
        }
        return [];
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
            case 'unknown':
            case 'any':
            case 'object':
                value = `any${array ? '[]' : ''}`;
                break;
            case 'char':
            case 'byte':
                value = `string${array ? '[]' : ''}`;
                break;
            case 'date':
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

    engine.registerHelper('ifValueType', (type: TypeLike, options: HelperOptions) => {
        if ((typeof type === 'string' && type !== 'void') || (typeof type !== 'string' && typeName(type) !== 'void')) {
            return Template.SafeString(options.fn(this));
        }
        return Template.SafeString('');
    });

    engine.registerHelper('ifVoidType', (type: TypeLike, options: HelperOptions) => {
        // Check if type has a property 'string' (which it would have if it is a SafeString)
        if (type && typeof type === 'object' && 'string' in type) {
            type = type.string as string;
        }

        if ((typeof type === 'string' && type === 'void') || (typeof type !== 'string' && typeName(type) === 'void')) {
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
};
