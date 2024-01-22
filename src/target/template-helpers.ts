/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import Handlebars = require('handlebars');
import { parseEntities, Template } from '@kapeta/codegen-target';
import { HelperOptions } from 'handlebars';
import { parseKapetaUri } from '@kapeta/nodejs-utils';
import {
    asComplexType,
    DataTypeReader,
    DSLData,
    DSLEntity,
    DSLReferenceResolver,
    DSLType,
    RESTControllerReader,
    TypescriptWriter,
    ucFirst,
} from '@kapeta/kaplang-core';
import {includes} from "../includes";

export type HandleBarsType = typeof Handlebars;

export const addTemplateHelpers = (engine: HandleBarsType, data: any, context: any): void => {
    const TypeMap: { [key: string]: string } = {
        Instance: 'InstanceValue',
        InstanceProvider: 'InstanceProviderValue',
    };

    let parsedEntities: DSLData[] | undefined = undefined;
    function getParsedEntities(): DSLData[] {
        if (!parsedEntities) {
            const code: string[] = [includes().source];
            if (context.spec?.entities?.source?.value) {
                code.push(context.spec?.entities?.source?.value)
            }
            parsedEntities = parseEntities(code.join('\n\n'));
        }


        if (!parsedEntities) {
            return [];
        }

        return parsedEntities as DSLData[];
    }

    const resolvePath = function (path: string, options: HelperOptions) {
        let fullPath = path;
        if (options?.hash?.base) {
            let baseUrl: string = options.hash.base;
            while (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.substring(0, baseUrl.length - 1);
            }
            if (!fullPath.startsWith('/')) {
                fullPath = '/' + fullPath;
            }

            fullPath = baseUrl + fullPath;
        }
        return fullPath;
    };

    engine.registerHelper('valueType', (value: DSLType) => {
        const type = asComplexType(value);
        if (TypeMap[type.name]) {
            type.name = TypeMap[type.name];
        }
        return Template.SafeString(TypescriptWriter.toTypeCode(type));
    });

    engine.registerHelper('returnType', (value: DSLType) => {
        if (!value) {
            return 'void';
        }

        return Template.SafeString(TypescriptWriter.toTypeCode(value));
    });

    engine.registerHelper('path', resolvePath);

    engine.registerHelper('mswpath', (path: string) => {
        // Replace all request parameters like e.g {id} with :id
        return path.replace(/\{(\w+)\}/g, ':$1');
    });

    engine.registerHelper('keys', function (object: Record<string, any>) {
        if (object && typeof object === 'object' && !Array.isArray(object)) {
            return Object.keys(object);
        }
        return [];
    });

    engine.registerHelper('include-proxy-route', function (this: any, options: HelperOptions) {
        if (!context.spec.consumers) {
            return '';
        }

        const checker = (consumer: any) => {
            const kindUri = parseKapetaUri(consumer.kind);
            return ['kapeta/resource-type-rest-client', 'kapeta/resource-type-web-fragment'].includes(kindUri.fullName);
        };

        if (context.spec.consumers.some(checker)) {
            return options.fn(this);
        }
    });

    engine.registerHelper('typescript-imports-dto', function (arg: DSLEntity, options: HelperOptions) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([arg], entities);

        if (referencesEntities.length === 0) {
            return '';
        }

        const base: string = options.hash.base ?? '.';

        return Template.SafeString(
            referencesEntities
                .map((entity) => {
                    const native = DataTypeReader.getNative(entity);
                    if (native) {
                        return `import { ${entity.name} } from "${native}";`;
                    }

                    return `import { ${ucFirst(entity.name)} } from '${base}/${ucFirst(entity.name)}';`;
                })
                .join('\n')
        );
    });

    engine.registerHelper('typescript-imports-config', function (arg: DSLEntity, options: HelperOptions) {
        const entities = getParsedEntities();
        const resolver = new DSLReferenceResolver();
        const referencesEntities = resolver.resolveReferencesFrom([arg], entities);

        if (referencesEntities.length === 0) {
            return '';
        }

        const base: string = options.hash.base ?? '.';

        return Template.SafeString(
            referencesEntities
                .map((entity) => {
                    const native = DataTypeReader.getNative(entity);
                    if (native) {
                        return `import { ${entity.name} } from "${native}";`;
                    }

                    return `import { ${ucFirst(entity.name)}Config } from '${base}/${ucFirst(entity.name)}';`;
                })
                .join('\n')
        );
    });

    engine.registerHelper('typescript-dto', (entity: DSLData) => {
        const writer = new TypescriptWriter();

        try {
            return Template.SafeString(writer.write([entity]));
        } catch (e) {
            console.warn('Failed to write entity', entity);
            throw e;
        }
    });

    engine.registerHelper('typescript-config', (entity: DSLData) => {
        const writer = new TypescriptWriter();

        try {
            // All config entities are postfixed with Config
            const copy = { ...entity, name: entity.name + 'Config' };
            return Template.SafeString(writer.write([copy]));
        } catch (e) {
            console.warn('Failed to write entity', entity);
            throw e;
        }
    });
};
