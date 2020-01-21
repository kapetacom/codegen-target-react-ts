import {TargetConfig} from "@blockware/ui-web-types";

// @ts-ignore
const blockwareDefinition = require('../../blockware.yml');

const targetConfig : TargetConfig =  {
    kind: blockwareDefinition.metadata.id,
    name: blockwareDefinition.metadata.name,
    blockKinds:[
        'blocks.blockware.com/v1/Service'
    ]
};

export default targetConfig;