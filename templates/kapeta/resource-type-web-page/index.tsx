//#FILENAME:src/browser/pages/{{snakecase data.metadata.name}}/index.tsx:create-only
import {createRoot} from 'react-dom/client';
import React from 'react';
import { {{type data.metadata.name}}Page } from "./{{type data.metadata.name}}Page";

const container = document.createElement('div');
container.classList.add('application-container');
document.body.append(container);

createRoot(container).render(<{{type data.metadata.name}}Page />);