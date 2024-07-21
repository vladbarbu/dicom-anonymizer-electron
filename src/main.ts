import { app, BrowserWindow, ipcMain, dialog } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
import path from "path";

const inDevelopment = process.env.NODE_ENV === "development";

if (require("electron-squirrel-startup")) {
    app.quit();
}

function createWindow() {
    const preload = path.join(__dirname, "preload.js");
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 1000,
        minWidth: 1000,
        minHeight: 1000,
        webPreferences: {
            devTools: inDevelopment,
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: false,
            preload: preload,
        },
        titleBarStyle: "hidden",
    });
    registerListeners(mainWindow);

    if (inDevelopment) {
        mainWindow.webContents.openDevTools();
    }

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
        );
    }
}

app.whenReady().then(createWindow);

//osX only
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//osX only ends

ipcMain.handle("open-directory-picker", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });
    return result.filePaths[0];
});

ipcMain.handle("open-file-picker", async (event, restrictExtensions) => {
    const options: Electron.OpenDialogOptions = {
        properties: ["openFile", "multiSelections"],
    };

    if (restrictExtensions) {
        options.filters = [{ name: "Medical", extensions: ["dcm", "mha"] }];
    }

    const result = await dialog.showOpenDialog(options);
    return result.filePaths;
});
