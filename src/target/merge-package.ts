/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { GeneratedFile, SourceFile, format } from '@kapeta/codegen-target';
import { addNewOrUnchanged } from './helpers';

export const mergePackageJson = (
    sourceFile: SourceFile,
    newFile: GeneratedFile,
    lastFile: GeneratedFile | null
): GeneratedFile => {
    // We can merge the dependencies and scripts into existing package.json without overwriting
    // the existing user adjusted content
    const target = JSON.parse(sourceFile.content);
    const newContent = JSON.parse(newFile.content.toString());
    const lastContent = lastFile ? JSON.parse(lastFile.content.toString()) : null;
    if (!target.dependencies) {
        target.dependencies = {};
    }

    if (!target.devDependencies) {
        target.devDependencies = {};
    }

    addNewOrUnchanged(target.dependencies, newContent.dependencies || {}, lastContent?.dependencies ?? null);
    addNewOrUnchanged(target.devDependencies, newContent.devDependencies || {}, lastContent?.devDependencies ?? null);

    if (!target.scripts) {
        target.scripts = {};
    }
    addNewOrUnchanged(target.scripts, newContent.scripts || {}, lastContent?.scripts ?? null);
    addNewOrUnchanged(target, newContent, lastContent);

    return {
        ...newFile,
        content: format(sourceFile.filename, JSON.stringify(target, null, 4)),
    };
};
