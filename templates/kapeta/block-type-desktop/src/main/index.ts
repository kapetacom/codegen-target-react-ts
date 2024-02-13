/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

import './patch-for-asar';

import { app, dialog } from 'electron';
import { MainWindow } from './ui/MainWindow';
import { attachHandlers } from './services/IPCService';
import {appInit} from "./helpers";

const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
    // We only want one instance of the app running at a time
    app.quit();
    process.exit();
}

appInit()
    .then(async () => {
        const main = new MainWindow();
        attachHandlers(main);
        await main.open();

        app.on('activate', () => main.show());
        if (app.show) {
            app.show();
        }
    })
    .catch((err:any) => {
        console.error("Failed during startup", err);
        // Show a blocking error popup before exiting
        app.focus();
        dialog.showErrorBox('An error occurred during startup', err.stack);
        app.exit(1);
    });
