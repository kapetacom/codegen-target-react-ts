import { useEffect } from 'react';

interface AutoUpdateResult {
    state: 'AVAILABLE' | 'NOT_AVAILABLE' | 'FAILED';
    currentVersion?: string;
    nextVersion?: string;
    errorMessage?: string;
}

interface AutoUpdaterState {
    type: 'checking' | 'download:start' | 'download:complete' | 'done';
    data?: AutoUpdateResult;
}

const CHANNEL = 'auto-updater';

export const useAutoUpdater = () => {

    useEffect(() => {
        const showUpdateInstalled = async (nextVersion: string) => {
            const ok = window.confirm(`You app has been updated to version ${nextVersion}. Please restart the app to apply the update.`);

            if (!ok) {
                return;
            }

            await window.electron.ipcRenderer.invoke('quit-and-install');
        };


        const handler = async (evt: AutoUpdaterState) => {
            switch (evt.type) {
                case 'checking':
                    console.log('Checking for updates...');
                    break;
                case 'download:start':
                    console.log('Downloading update...');
                    break;
                case 'download:complete':
                    console.log('Download complete');
                    break;
                case 'done':
                    switch (evt.data?.state) {
                        case 'AVAILABLE':
                            console.log(`Update installed: ${evt.data?.nextVersion}. Restart to apply the update.`);
                            await showUpdateInstalled(evt.data?.nextVersion!);
                            break;
                        case 'NOT_AVAILABLE':
                            console.log('Your app is currently up to date with the latest version.');
                            break;
                        case 'FAILED':
                            console.error(`Update failed: ${evt.data?.errorMessage}`);
                            break;
                    }
                    break;
            }
        };

        return window.electron.ipcRenderer.on(CHANNEL, handler);
    }, []);
};
