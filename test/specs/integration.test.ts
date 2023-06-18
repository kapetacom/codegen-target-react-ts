import { describe, test, beforeEach } from '@jest/globals';
import { BlockDefinition } from '@kapeta/schemas';
import Target from '../../src';
import { CodegenHelpers, BlockCodeGenerator } from '@kapeta/codegen';
import Path from 'path';

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
});
