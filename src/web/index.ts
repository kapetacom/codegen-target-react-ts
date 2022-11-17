import {TargetConfig} from "@blockware/ui-web-types";

// @ts-ignore
const blockwareDefinition = require('../../blockware.yml');

const targetConfig : TargetConfig =  {
    kind: blockwareDefinition.metadata.name,
    name: blockwareDefinition.metadata.title,
    blockKinds:[
        'blockware/block-type-frontend'
    ]
};

export default targetConfig;