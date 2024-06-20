import { describe, test, beforeEach, expect } from '@jest/globals';
import { BlockDefinition } from '@kapeta/schemas';
import Target from '../../src';
import { CodegenHelpers, BlockCodeGenerator } from '@kapeta/codegen';
import Path from 'path';
import FS from 'fs';

function readJSON(path: string) {
    const json = FS.readFileSync(Path.resolve(__dirname, path), 'utf-8').toString();
    return JSON.parse(json);
}

describe('blocks', () => {
    let target: Target;

    beforeEach(() => {
        target = new Target({});
    });

    test('portal', async () => {
        const basedir = Path.resolve(__dirname, '../resources/examples/portal');
        const data = require('../resources/examples/portal.kapeta.yml') as BlockDefinition;

        return CodegenHelpers.testCodeGenFor(target, new BlockCodeGenerator(data), basedir);
    });

    test('minimal', async () => {
        const basedir = Path.resolve(__dirname, '../resources/examples/minimal');
        const data = require('../resources/examples/minimal.kapeta.yml') as BlockDefinition;

        return CodegenHelpers.testCodeGenFor(target, new BlockCodeGenerator(data), basedir);
    });

    test.only('ai', async () => {
        const basedir = Path.resolve(__dirname, '../resources/examples/ai');
        const data = require('../resources/examples/portal.kapeta.yml') as BlockDefinition;
        const codegen = new BlockCodeGenerator(data);
        codegen.withOption('AIContext', 'storm');
        const aiTarget = new Target({ AIContext: 'storm' });

        return CodegenHelpers.testCodeGenFor(aiTarget, codegen, basedir);
    });

    test('desktop', async () => {
        const basedir = Path.resolve(__dirname, '../resources/examples/desktop');
        const data = require('../resources/examples/desktop.kapeta.yml') as BlockDefinition;

        return CodegenHelpers.testCodeGenFor(target, new BlockCodeGenerator(data), basedir);
    });

    function doMergeJSON(filename: string, original: any, changed: any, last: any | null = null) {
        const merged = target.mergeFile(
            {
                filename: filename,
                permissions: '644',
                content: JSON.stringify(original),
            },
            {
                filename: filename,
                permissions: '644',
                content: JSON.stringify(changed),
                mode: 'merge',
            },
            last
                ? {
                      filename: filename,
                      permissions: '644',
                      content: JSON.stringify(last),
                      mode: 'merge',
                  }
                : {
                      filename: filename,
                      permissions: '644',
                      content: JSON.stringify(original),
                      mode: 'merge',
                  }
        );

        return JSON.parse(merged.content.toString());
    }

    describe('Can merge files: package.json', () => {
        const FILENAME = 'package.json';

        test('new dependencies will be added', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/added-dependencies.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed dependencies will be removed if unchanged', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-dependencies.json');
            let result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);

            const original2 = {
                ...original,
                dependencies: { ...original.dependencies, '@kapeta/sdk-web-rest-client': '^2' },
            };
            result = doMergeJSON(FILENAME, original2, changed, original);
            expect(result).toEqual(original2);
        });

        test('existing dependencies will be upgraded', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/upgraded-dependencies.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('new scripts will be added', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/added-scripts.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed scripts will be removed if unchanged', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-scripts.json');
            let result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);

            const original2 = { ...original, scripts: { ...original.scripts, build: 'tsc' } };
            result = doMergeJSON(FILENAME, original2, changed, original);
            expect(result).toEqual(original2);
        });

        test('changed scripts will be updated if unchanged', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/changed-scripts.json');
            let result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);

            const original2 = { ...original, scripts: { ...original.scripts, start: 'node index.js' } };
            result = doMergeJSON(FILENAME, original2, changed, original);
            expect(result).toEqual(original2);
        });

        test('new top-level will be added', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/added-top-level.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed top-level will be removed if unchanged', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-top-level.json');
            let result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);

            const original2 = { ...original, type: 'module' };
            result = doMergeJSON(FILENAME, original2, changed, original);
            expect(result).toEqual(original2);
        });

        test('updated top-level will be updated if unchanged', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/changed-top-level.json');
            let result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);

            const original2 = { ...original, type: 'esm' };
            result = doMergeJSON(FILENAME, original2, changed, original);
            expect(result).toEqual(original2);
        });
    });

    describe('Can merge files: devcontainer.json', () => {
        const FILENAME = '.devcontainer/devcontainer.json';

        test('adding kapeta env is persisted', () => {
            const original = readJSON('../resources/devcontainer/original.json');
            const changed = readJSON('../resources/devcontainer/added-kapeta-env.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('changed kapeta env is persisted', () => {
            const original = readJSON('../resources/devcontainer/original.json');
            const changed = readJSON('../resources/devcontainer/changed-kapeta-env.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed kapeta env is persisted', () => {
            const original = readJSON('../resources/devcontainer/original.json');
            const changed = readJSON('../resources/devcontainer/removed-kapeta-env.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('changed top level is ignored', () => {
            const original = readJSON('../resources/devcontainer/original.json');
            const changed = readJSON('../resources/devcontainer/changed-top-level.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
        });

        test('original changes are retained', () => {
            const original = readJSON('../resources/devcontainer/original-adjusted.json');
            const changed = readJSON('../resources/devcontainer/added-kapeta-env.json');
            changed.containerEnv['SOME_OTHER_ENV_VAR'] = 'some-value';
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });
    });
});
