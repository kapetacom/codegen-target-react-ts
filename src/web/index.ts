/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { ILanguageTargetProvider } from '@kapeta/ui-web-types';

// @ts-ignore
import kapetaDefinition from '../../kapeta.yml';
// @ts-ignore
import packageJson from '../../package.json';

const targetConfig: ILanguageTargetProvider = {
    kind: kapetaDefinition.metadata.name,
    version: packageJson.version,
    title: kapetaDefinition.metadata.title,
    blockKinds: ['kapeta/block-type-frontend'],
    resourceKinds: [
        'kapeta/resource-type-rest-client',
        'kapeta/resource-type-web-fragment',
        'kapeta/resource-type-web-page',
        'kapeta/resource-type-redis',
    ],
    definition: kapetaDefinition,
};

export default targetConfig;
