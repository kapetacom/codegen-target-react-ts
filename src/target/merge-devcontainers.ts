/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { GeneratedFile, SourceFile } from '@kapeta/codegen-target';
import { addNewOrUnchanged } from './helpers';

export const mergeDevcontainers = (
    sourceFile: SourceFile,
    newFile: GeneratedFile,
    lastFile: GeneratedFile | null
): GeneratedFile => {
    // We can merge the environment variables prefixed with KAPETA_ into the containerEnv
    const target = JSON.parse(sourceFile.content);
    const newContent = JSON.parse(newFile.content.toString());
    const lastContent = lastFile ? JSON.parse(lastFile.content.toString()) : null;

    if (!target.containerEnv) {
        target.containerEnv = {};
    }

    addNewOrUnchanged(target.containerEnv, newContent.containerEnv, lastContent?.containerEnv ?? null);

    return {
        ...newFile,
        content: JSON.stringify(target, null, 4),
    };
};
