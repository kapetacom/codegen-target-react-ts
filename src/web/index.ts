/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { ILanguageTargetProvider } from '@kapeta/ui-web-types';
import { includes } from '../includes';

// @ts-expect-error TS doesnt like YML imports
import kapetaDefinition from '../../kapeta.yml';
import packageJson from '../../package.json';

const targetConfig: ILanguageTargetProvider = {
    kind: kapetaDefinition.metadata.name,
    version: packageJson.version,
    title: kapetaDefinition.metadata.title,
    blockKinds: ['kapeta/block-type-frontend', 'kapeta/block-type-desktop'],
    resourceKinds: [
        'kapeta/resource-type-rest-client',
        'kapeta/resource-type-web-fragment',
        'kapeta/resource-type-web-page',
        'kapeta/resource-type-redis',
    ],
    definition: kapetaDefinition,
    getDSLIncludes: includes,
};

export default targetConfig;
