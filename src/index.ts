/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { format, Target, Template, TypeLike } from '@kapeta/codegen-target';
import Path from 'path';
import { GeneratedAsset, GeneratedFile, SourceFile } from '@kapeta/codegen';
import { exec } from '@kapeta/nodejs-process';
import { mergeDevcontainers } from './target/merge-devcontainers';
import { mergePackageJson } from './target/merge-package';
import { addTemplateHelpers, HandleBarsType } from './target/template-helpers';

export default class ReactTSTarget extends Target {
    constructor(options?: any) {
        super(options, Path.resolve(__dirname, '../'));
    }

    protected _createTemplateEngine(data: any, context: any) {
        const engine: HandleBarsType = super._createTemplateEngine(data, context);
        addTemplateHelpers(engine, data, context);

        return engine;
    }
    protected _postProcessCode(filename: string, code: string): string {
        return format(filename, code);
    }

    mergeFile(sourceFile: SourceFile, newFile: GeneratedFile, lastFile: GeneratedFile | null): GeneratedFile {
        if (sourceFile.filename === 'package.json') {
            return mergePackageJson(sourceFile, newFile, lastFile);
        }

        if (sourceFile.filename === '.devcontainer/devcontainer.json') {
            return mergeDevcontainers(sourceFile, newFile, lastFile);
        }

        return super.mergeFile(sourceFile, newFile, lastFile);
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
