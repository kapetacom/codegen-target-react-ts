import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Main';
import { enableApiMocking } from '../mocks/enableApiMocking';

const container = document.getElementById('root')!;
const root = createRoot(container);

/*
The main entry point for the desktop applications UI.

This file should only be edited if you need to preload or setup some things before the page is rendered.
When running in development mode the API mocking is available.
Call window.enableMockApi(true) in the browser console to enable it.

*/

void (async () => {
    if (process.env.NODE_ENV === 'development') {
        await enableApiMocking();
    }

    root.render(<Main />);
})();
