import React from 'react';
import { FragmentFrame, FragmentProps } from '@kapeta/sdk-web-microfrontend-frame';

let BASE_PATH = 'fragments/subpage';
if (!BASE_PATH.endsWith('/')) {
    //Make sure the path ends with a slash so that relative paths work
    BASE_PATH += '/';
}

/**
 * A React component that renders the Subpage fragment in an iframe.
 * The basePath is set to the path of the fragment.
 */
export const SubpageFragment = (props: Omit<FragmentProps, 'basePath'>) => {
    return <FragmentFrame basePath={BASE_PATH} {...props}></FragmentFrame>;
};
