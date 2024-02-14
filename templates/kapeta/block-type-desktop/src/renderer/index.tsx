import React from "react";
import { createRoot } from 'react-dom/client';
import {Main} from "./components/Main";
{{#consumes 'kapeta/resource-type-rest-client'}}
import { enableApiMocking } from '../mocks/enableApiMocking';
{{/consumes}}

const container = document.getElementById('root')!;
const root = createRoot(container);

/*
The main entry point for the desktop applications UI.

This file should only be edited if you need to preload or setup some things before the page is rendered.
{{#consumes 'kapeta/resource-type-rest-client'}}
When running in development mode the API mocking is available.
Call window.enableMockApi(true) in the browser console to enable it.
{{/consumes}}

*/

{{#consumes 'kapeta/resource-type-rest-client'}}
void (async () => {
    if (process.env.NODE_ENV === 'development') {
        await enableApiMocking();
    }

    root.render(<Main />);
})();
{{else}}
root.render(<Main />);
{{/consumes}}