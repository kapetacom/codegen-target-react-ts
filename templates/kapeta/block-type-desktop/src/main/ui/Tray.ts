import { app, Menu, MenuItemConstructorOptions, shell, Tray, nativeTheme } from 'electron';
import {getAssetPath, appVersion, APP_NAME} from '../helpers';
import { MainWindow } from './MainWindow';
import MenuItem = Electron.MenuItem;

type TrayMenuItem = MenuItemConstructorOptions | MenuItem;

//Always use system theme
nativeTheme.themeSource = 'system';

const getTrayIcon = () => {
    if (process.platform !== 'darwin' &&
        nativeTheme.shouldUseDarkColors) {
        return getAssetPath('icons/tray_icon_light.png');
    }

    // macOS tray icon supports "Template" image:
    // https://github.com/electron/electron/blob/main/docs/api/native-image.md#template-image
    return getAssetPath('icons/TrayIconTemplate.png');
};

export class TrayWrapper {
    private tray: Tray;
    private mainWindow: MainWindow;

    constructor(mainWindow: MainWindow) {
        this.mainWindow = mainWindow;
        this.tray = new Tray(getTrayIcon());
        this.tray.setToolTip(APP_NAME);

        nativeTheme.on('updated', () => {
            this.tray.setImage(getTrayIcon());
        });
    }

    public async update() {
        const menuItems: Array<TrayMenuItem> = [
            {
                label: 'Show',
                click: () => this.mainWindow.show(),
            },
            { type: 'separator' },
            {
                label: 'Version: ' + appVersion(),
                enabled: false,
                type: 'normal',
            },
            { label: `Quit ${APP_NAME}`, click: () => app.quit() },
        ];

        const contextMenu = Menu.buildFromTemplate(menuItems);
        this.tray.setContextMenu(contextMenu);
    }
}
