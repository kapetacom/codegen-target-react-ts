import {TargetConfig} from "@blockware/ui-web-types";

// @ts-ignore
const blockwareDefinition = require('../../blockware.yml');
const packageJson = require('../../package.json');

const targetConfig : TargetConfig =  {
    kind: blockwareDefinition.metadata.name,
    version: packageJson.version,
    title: blockwareDefinition.metadata.title,
    blockKinds:[
        'blockware/block-type-frontend'
    ]
};

export default targetConfig;