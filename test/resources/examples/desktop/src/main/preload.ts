import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import HOSTS_DEVELOPMENT from '../../config/hosts.development.json';
import HOSTS_PRODUCTION from '../../config/hosts.production.json';

export type Channels = 'ipc-main' | 'auto-updater';

export type Procedures = 'example-method' | 'quit-and-install';

const DEBUG = !!(process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');

const kapetaHandler = {
    environment: DEBUG ? 'development' : 'production',
    hosts: DEBUG ? HOSTS_DEVELOPMENT : HOSTS_PRODUCTION,
};

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: Channels, args: any[]) {
            ipcRenderer.send(channel, args);
        },
        on(channel: Channels, func: (...args: any[]) => void) {
            const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel: Channels, func: (...args: any[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        invoke(channel: Procedures, ...args: any[]) {
            return ipcRenderer.invoke(channel, ...args);
        },
    },
};

contextBridge.exposeInMainWorld('kapeta', kapetaHandler);
contextBridge.exposeInMainWorld('electron', electronHandler);

export type KapetaHandler = typeof kapetaHandler;
export type ElectronHandler = typeof electronHandler;
