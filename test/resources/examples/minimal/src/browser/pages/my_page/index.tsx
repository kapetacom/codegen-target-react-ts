import React from 'react';
import { createRoot } from 'react-dom/client';
import { MyPagePage } from './MyPagePage';

const container = document.createElement('div');
container.classList.add('application-container');
document.body.append(container);

createRoot(container).render(<MyPagePage />);
