const { app, BrowserWindow, ipcMain ,Menu} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        transparent: true,
        backgroundColor:'rgba(0,0,0,0)',
        frame:false,
    });

    mainWindow.loadFile('index.html')

    // 监听来自渲染进程的消息来最小化、最大化或关闭窗口
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on('close', () => {
        mainWindow.close();
    });
}

app.whenReady().then(createWindow);

// 确保在 macOS 上当所有窗口都被关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
