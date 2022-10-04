const {describe, test, beforeEach} =  require("@jest/globals");

const Target = require('../../index');
const {CodegenHelpers} = require('@blockware/codegen');
const Path = require("path");

describe('blocks', () => {
    let target;

    beforeEach(() => {
        target = new Target({});
    })

    test('portal', async () => {

        const basedir = Path.resolve(__dirname, '../resources/examples/portal');
        const data = require('../resources/examples/portal.block.yml');

        return CodegenHelpers.testCodeGenFor(target, data, basedir);
    });

})