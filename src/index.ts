/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { format, Target, GeneratedAsset, GeneratedFile, SourceFile } from '@kapeta/codegen-target';
import Path from 'path';
import { exec } from '@kapeta/nodejs-process';
import { mergeDevcontainers } from './target/merge-devcontainers';
import { mergePackageJson } from './target/merge-package';
import { addTemplateHelpers, HandleBarsType } from './target/template-helpers';
import {spawn} from "child_process";
import {ValidationResult} from "@kapeta/codegen";

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
        // Skip processing handlebars due to it stripping <DOCTYPE>
        // https://github.com/prettier/prettier/issues/15220
        if (filename.endsWith('.hbs')) {
            return code;
        }
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

    validate(targetDir: string, files: any[]): Promise<ValidationResult> {
        console.log('Validating React Typescript project');

        return new Promise((resolve) => {
            this.runCmd(targetDir, 'npm', ['install'])
                .then((result) => {
                    if (result.status !== 'ok') {
                        return result;
                    }
                    console.log('npm install completed successfully.');
                    return this.runCmd(targetDir, 'npm', ['run', 'lint']); // Chain to next step
                })
                .then((result) => {
                    if (result.status !== 'ok') {
                        return result;
                    }
                    console.log('npm run lint completed successfully.');
                    return this.runCmd(targetDir, 'npm', ['run', 'build']); // Chain to next step
                })
                .then((result) => {
                    if (result.status !== 'ok') {
                        resolve(result);
                        return;
                    }
                    console.log("npm run compile completed successfully.");
                    resolve({ status: 'ok', error: ''});
                })
                .catch(error => resolve(error));
        });
    }

    private runCmd(targetDir: string, command: string, args: string[]): Promise<ValidationResult> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            console.log(`will run ${command}`, args);
            const childProcess = spawn(command, args, {
                cwd: targetDir ? targetDir : process.cwd(),
                shell: true,
            });

            childProcess.stdout.on('data', (data) => {
                chunks.push(data);
            });

            childProcess.stderr.on('data', (data) => {
                chunks.push(data);
            });

            childProcess.on('close', (code) => {
                if (code !== 0) {
                    console.log(`${command} exited with code ${code}`);
                    resolve({status: "error", error: Buffer.concat(chunks).toString()});
                } else {
                    console.log(`${command} OK`);
                    resolve({status: "ok", error: ''});
                }
            });
        });
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
