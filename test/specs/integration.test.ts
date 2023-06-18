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

    function doMergeJSON(filename: string, original: any, changed: any) {
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
            }
        );

        return JSON.parse(merged.content);
    }

    describe('Can merge files: package.json', () => {
        const FILENAME = 'package.json';

        test('new dependencies will be added', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/added-dependencies.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed dependencies will be ignored', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-dependencies.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
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

        test('removed scripts will be ignored ', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-scripts.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
        });

        test('changed scripts will be ignored ', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/changed-scripts.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
        });

        test('new top-level will be added', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/added-top-level.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(changed);
        });

        test('removed top-level will be ignored', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/removed-top-level.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
        });

        test('updated top-level will be ignored', () => {
            const original = readJSON('../resources/packages/original.json');
            const changed = readJSON('../resources/packages/changed-top-level.json');
            const result = doMergeJSON(FILENAME, original, changed);
            expect(result).toEqual(original);
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
