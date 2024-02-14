import { ipcMain } from 'electron';
import { MainWindow } from '../ui/MainWindow';

export function attachHandlers(main: MainWindow) {
    ipcMain.handle('example-method', () => {
        return {
            message: 'Hello from the main process!',
        };
    });

    ipcMain.handle('quit-and-install', () => {
        main.quitAndInstall();
    });
}
