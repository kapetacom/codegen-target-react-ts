/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { describe, it, expect } from '@jest/globals';

import { mergePackageJson } from './merge-package';
import { GeneratedFile, SourceFile } from '@kapeta/codegen-target';

describe('mergePackage', () => {
    it('should work with empty package', () => {
        const sourceFile: SourceFile = {
            filename: 'package.json',
            content: JSON.stringify({
                name: 'test',
            }),
            permissions: '644',
        };
        const newFile: GeneratedFile = {
            filename: 'package.json',
            content: JSON.stringify({
                name: 'test',
                dependencies: {
                    'test-dep': '1.0.0',
                },
            }),
            permissions: '644',
            mode: 'overwrite',
        };
        const lastFile: GeneratedFile | null = null;

        const result = mergePackageJson(sourceFile, newFile, lastFile);
        expect(JSON.parse(result.content.toString())).toMatchObject({
            name: 'test',
        });
    });

    it('should preserve existing deps', () => {
        const sourceFile: SourceFile = {
            filename: 'package.json',
            content: JSON.stringify({
                name: 'test',
                dependencies: {
                    'test-dep': '1.0.0',
                },
                devDependencies: {
                    'dev-dep1': 'aaa',
                },
            }),
            permissions: '644',
        };
        const newFile: GeneratedFile = {
            filename: 'package.json',
            content: JSON.stringify({
                name: 'test',
                dependencies: {
                    'test-dep2': '1.0.0',
                },
                devDependencies: {
                    'dev-dep2': 'bbb',
                },
            }),
            permissions: '644',
            mode: 'overwrite',
        };
        const lastFile: GeneratedFile | null = null;

        const result = mergePackageJson(sourceFile, newFile, lastFile);
        expect(JSON.parse(result.content.toString())).toMatchObject({
            name: 'test',
            dependencies: {
                'test-dep': '1.0.0',
                'test-dep2': '1.0.0',
            },
            devDependencies: {
                'dev-dep1': 'aaa',
                'dev-dep2': 'bbb',
            },
        });
    });
});
