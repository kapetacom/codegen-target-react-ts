import { app, Menu, shell, BrowserWindow, MenuItemConstructorOptions } from 'electron';
import { AutoUpdateHelper } from './AutoUpdateHelper';
import {APP_NAME, appVersion, safeWindowInteraction, withErrorLog} from '../helpers';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
    selector?: string;
    submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export class MenuBuilder {
    private readonly mainWindow: BrowserWindow;
    private readonly autoUpdater: AutoUpdateHelper;

    constructor(mainWindow: BrowserWindow, autoUpdater: AutoUpdateHelper) {
        this.mainWindow = mainWindow;
        this.autoUpdater = autoUpdater;
    }

    async buildMenu(): Promise<Menu> {
        this.setupContextMenu();

        const template = process.platform === 'darwin' ? this.buildDarwinTemplate() : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    setupContextMenu(): void {
        this.mainWindow.webContents.on('context-menu', (_, props) => {
            const { x, y } = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        safeWindowInteraction(this.mainWindow, () => this.mainWindow.webContents.inspectElement(x, y));
                    },
                },
            ]).popup({ window: this.mainWindow });
        });
    }


    private checkForUpdates() {
        withErrorLog(
            this.autoUpdater.checkForUpdates(this.mainWindow, true).catch((err) => {
                console.error('Failed to check for updates', err);
            })
        );
    }

    private buildDarwinTemplate(): MenuItemConstructorOptions[] {
        const subMenuAbout: DarwinMenuItemConstructorOptions = {
            label: 'Kapeta',
            submenu: [
                {
                    label: `About ${APP_NAME}`,
                    selector: 'orderFrontStandardAboutPanel:',
                },
                {
                    label: 'Check for Updates...',
                    click: () => {
                        this.checkForUpdates();
                    },
                },
                { type: 'separator' },
                {
                    label: `Hide ${APP_NAME}`,
                    accelerator: 'Command+H',
                    selector: 'hide:',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:',
                },
                { label: 'Show All', selector: 'unhideAllApplications:' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        };
        const subMenuEdit: DarwinMenuItemConstructorOptions = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
                {
                    label: 'Redo',
                    accelerator: 'Shift+Command+Z',
                    selector: 'redo:',
                },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
                {
                    label: 'Paste',
                    accelerator: 'Command+V',
                    selector: 'paste:',
                },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:',
                },
            ],
        };
        const subMenuView: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        safeWindowInteraction(this.mainWindow, () => this.mainWindow.webContents.reload());
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        safeWindowInteraction(this.mainWindow, () =>
                            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                        );
                    },
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        safeWindowInteraction(this.mainWindow, () => this.mainWindow.webContents.toggleDevTools());
                    },
                },
            ],
        };

        const subMenuWindow: DarwinMenuItemConstructorOptions = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:',
                },
                {
                    label: 'Close',
                    selector: 'performClose:',
                },
                { type: 'separator' },
                { label: 'Bring All to Front', selector: 'arrangeInFront:' },
            ],
        };
        const subMenuHelp: MenuItemConstructorOptions = {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        withErrorLog(shell.openExternal('https://kapeta.com'));
                    },
                },
                {
                    label: 'Documentation',
                    click() {
                        withErrorLog(shell.openExternal('https://docs.kapeta.com'));
                    },
                },
            ],
        };

        return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
    }

    buildDefaultTemplate() {
        const templateDefault: MenuItemConstructorOptions[] = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                    },
                    {
                        label: '&Close',
                        click: () => {
                            safeWindowInteraction(this.mainWindow, () => this.mainWindow.close());
                        },
                    },
                ],
            },
            {
                label: '&Edit',
                submenu: [
                    { label: '&Undo', accelerator: 'Ctrl+Z', role: 'undo' },
                    {
                        label: '&Redo',
                        accelerator: 'Shift+Ctrl+Z',
                        role: 'redo',
                    },
                    { type: 'separator' },
                    { label: '&Cut', accelerator: 'Ctrl+X', role: 'cut' },
                    { label: '&Copy', accelerator: 'Ctrl+C', role: 'copy' },
                    {
                        label: '&Paste',
                        accelerator: 'Ctrl+V',
                        role: 'paste',
                    },
                    {
                        label: '&Select All',
                        accelerator: 'Ctrl+A',
                        role: 'selectAll',
                    },
                ],
            },
            {
                label: '&View',
                submenu: [
                    {
                        label: '&Reload',
                        accelerator: 'Ctrl+R',
                        click: () => {
                            safeWindowInteraction(this.mainWindow, () => this.mainWindow.webContents.reload());
                        },
                    },
                    {
                        label: 'Toggle &Full Screen',
                        accelerator: 'F11',
                        click: () => {
                            safeWindowInteraction(this.mainWindow, () =>
                                this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                            );
                        },
                    },
                    {
                        label: 'Toggle &Developer Tools',
                        accelerator: 'Alt+Ctrl+I',
                        click: () => {
                            safeWindowInteraction(this.mainWindow, () => this.mainWindow.webContents.toggleDevTools());
                        },
                    },
                ],
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Version: ' + appVersion(),
                        enabled: false,
                    },
                    {
                        label: 'Learn More',
                        click() {
                            withErrorLog(shell.openExternal('https://kapeta.com'));
                        },
                    },
                    {
                        label: 'Documentation',
                        click() {
                            withErrorLog(shell.openExternal('https://docs.kapeta.com'));
                        },
                    },
                    {
                        label: 'Check for Updates...',
                        click: () => {
                            this.checkForUpdates();
                        },
                    },
                ],
            },
        ];

        return templateDefault;
    }
}
