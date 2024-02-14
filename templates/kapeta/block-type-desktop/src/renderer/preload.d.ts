import type { KapetaHandler, ElectronHandler } from 'main/preload';

declare global {
    interface Window {
        electron: ElectronHandler;
        kapeta: KapetaHandler
    }
}

export {};
