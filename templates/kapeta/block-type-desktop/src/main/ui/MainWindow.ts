import { BrowserWindow, shell } from 'electron';
import { MenuBuilder } from './MenuBuilder';
import { DockWrapper } from './Dock';
import { TrayWrapper } from './Tray';
import { AutoUpdateHelper } from './AutoUpdateHelper';
import {APP_NAME, getAssetPath, getPreloadScript, resolveHtmlPath} from "../helpers";

export class MainWindow {
    private _window: BrowserWindow | undefined = undefined;
    private tray: TrayWrapper;
    private dock: DockWrapper;
    private autoUpdater: AutoUpdateHelper;

    constructor() {
        this.dock = new DockWrapper();
        this.tray = new TrayWrapper(this);
        this.autoUpdater = new AutoUpdateHelper();
    }

    public get window() {
        return this._window;
    }

    public hide() {
        if (this._window?.hide) {
            this._window?.hide();
        }
    }

    public quitAndInstall() {
        this.autoUpdater.quitAndInstall();
    }

    public close() {
        if (!this._window) {
            return;
        }

        if (this._window.close) {
            this._window.close();
        } else {
            this._window.destroy();
        }
    }

    public async open() {
        if (this._window) {
            this._window.show();
            return;
        }

        await this.dock.show();

        let icon: string;
        if (process.platform === 'win32') {
            icon = getAssetPath('icon.ico');
        } else {
            icon = getAssetPath('icon.png');
        }

        this._window = new BrowserWindow({
            show: false,
            icon,
            title: APP_NAME,
            webPreferences: {
                preload: getPreloadScript(),
                contextIsolation: true,
            },
        });

        this._window.maximize();

        await this.tray.update();

        await this._window.loadURL(`${resolveHtmlPath(`index.html`)}`);

        this._window.on('show', () => {
            this.dock.show();
        });

        this._window.on('ready-to-show', async () => {
            if (!this._window) {
                throw new Error('"this.window" is not defined');
            }
            this._window.show();
        });

        this._window.on('closed', async () => {
            this._window = undefined;
            this.dock.hide();
            await this.tray.update();
        });

        const menuBuilder = new MenuBuilder(this._window, this.autoUpdater);
        await menuBuilder.buildMenu();

        // Open urls in the user's browser
        this._window.webContents.setWindowOpenHandler((data) => {
            shell.openExternal(data.url);
            return { action: 'deny' };
        });

        await this.autoUpdater.init(this);
    }

    async show() {
        if (!this.window) {
            return this.open();
        }

        if (this.isMinimized()) {
            this.restore();
        }
        this.focus();
    }

    isMinimized() {
        return this.window?.isMinimized();
    }

    restore() {
        this.window?.restore();
    }

    focus() {
        this.window?.focus();
    }

    update() {
        return this.tray.update();
    }
}
