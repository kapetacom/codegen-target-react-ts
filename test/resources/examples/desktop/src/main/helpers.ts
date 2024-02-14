import { URL } from 'url';
import Path from 'path';
import { session, app, BrowserWindow, ipcMain, dialog } from 'electron';
import packageJson from '../../package.json';

import MessageBoxOptions = Electron.MessageBoxOptions;
import WebContents = Electron.WebContents;

export const APP_NAME = packageJson.title ?? 'Electron App';

export const RESOURCES_PATH = app.isPackaged
    ? Path.join(process.resourcesPath, 'assets')
    : Path.join(__dirname, '../../assets');

export const isDebug = (): boolean => {
    return !!(process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');
};

export const getAssetPath = (...paths: string[]): string => {
    return Path.join(RESOURCES_PATH, ...paths);
};

export const appVersion = () => {
    return packageJson.version;
};

export const ensureUserAgent = () => {
    const userAgent = `${APP_NAME}/${appVersion()}`;
    session.defaultSession.setUserAgent(userAgent);
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['user-agent'] = userAgent;
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
};

export const getPreloadScript = () => {
    return app.isPackaged ? Path.join(__dirname, 'preload.js') : Path.join(__dirname, '../../.erb/dll/preload.js');
};

export function resolveHtmlPath(htmlFileName: string) {
    if (isDebug()) {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://127.0.0.1:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${Path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function showMessage(opts: MessageBoxOptions) {
    const wins = BrowserWindow.getAllWindows();
    const win = wins.length > 0 ? wins[0] : null;
    if (win) {
        return dialog.showMessageBoxSync(win, opts);
    }
    return dialog.showMessageBoxSync(opts);
}

export function showError(message: string) {
    const opts: MessageBoxOptions = {
        type: 'error',
        message,
    };
    return showMessage(opts);
}

export function showInfo(message: string) {
    const opts: MessageBoxOptions = {
        type: 'info',
        message,
    };
    return showMessage(opts);
}

export function safeSend(contents: WebContents | undefined, channel: string, ...args: any[]) {
    try {
        contents && !contents.isDestroyed() && contents.send(channel, ...args);
    } catch (e) {
        console.warn('Failed to send message to renderer', e);
    }
}

export function withErrorLog(result: Promise<any>) {
    const stack = new Error().stack;
    result.catch((e) => {
        console.error('A method throw unexpected', e, stack);
    });
}

export function safeWindowInteraction(browserWindow: BrowserWindow, callback: () => void): void {
    if (browserWindow && !browserWindow.isDestroyed()) {
        callback();
    }
}

export const appInit = async () => {
    if (isDebug()) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        require('electron-debug')();
    }

    if (process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const sourceMapSupport = require('source-map-support');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        sourceMapSupport.install();
    }

    await app.whenReady();

    if (process.platform === 'darwin' && app.getAppPath().startsWith('/Volumes/')) {
        // Looks like we're running from a DMG
        // This can cause issues with the auto-updater and probably other things
        showError(
            `It looks like you're running ${APP_NAME} from a DMG. Please copy it to your Applications folder to avoid issues.`
        );
    }

    ensureUserAgent();
};
