import React from 'react';
import { createRoot } from 'react-dom/client';
import { MyPagePage } from './MyPagePage';

/*
The main entry point for the MyPage page.

Creates a container div and renders the MyPagePage component into it. To change the page content,
edit the MyPagePage component instead.
This file should only be edited if you need to preload or setup some things before the page is rendered.

*/

const container = document.createElement('div');
container.classList.add('application-container');
document.body.append(container);

createRoot(container).render(<MyPagePage />);
