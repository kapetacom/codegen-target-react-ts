//#FILENAME:src/browser/pages/{{snakecase data.metadata.name}}/index.tsx:write-always
//
// GENERATED SOURCE - DO NOT EDIT
//
import {createRoot} from 'react-dom/client';
import React from 'react';
import { {{type data.metadata.name}}Page } from "./{{type data.metadata.name}}Page";

const container = document.createElement('div');

document.body.append(container);

createRoot(container).render(<{{type data.metadata.name}}Page />);