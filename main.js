const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // TODO: Enable this for better security
            enableRemoteModule: false
        },
        icon: path.join(__dirname, 'assets', 'icon.png'), // Moved to assets folder
        show: false // Don't show immediately
    });

    mainWindow.loadFile('index.html');
    
    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });
}

function createTray() {
    const iconPath = path.join(__dirname, 'assets', 'icon.png');
    
    // Check if icon exists, use default if not
    let trayIcon;
    try {
        if (require('fs').existsSync(iconPath)) {
            trayIcon = iconPath;
        } else {
            // Use a simple default icon (Electron will provide one)
            console.log('Warning: Icon file not found at', iconPath);
            trayIcon = null;
        }
    } catch (error) {
        console.log('Warning: Could not check for icon file:', error.message);
        trayIcon = null;
    }
    
    tray = trayIcon ? new Tray(trayIcon) : new Tray(nativeImage.createEmpty());
    
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
    
    tray.setToolTip('Ping Tool - Keep your Render apps awake');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});