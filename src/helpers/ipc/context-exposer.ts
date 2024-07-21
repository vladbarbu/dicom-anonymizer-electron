import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { contextBridge, ipcRenderer } from "electron";
const path = require("path");
const fs = require("fs").promises;

export default function exposeContexts() {
    exposeWindowContext();
    exposeThemeContext();
}

contextBridge.exposeInMainWorld("electron", {
    openDirectoryPicker: async () => {
        const directory = await ipcRenderer.invoke("open-directory-picker");
        return directory;
    },
    openFilePicker: async (restrictExtensions: boolean) => {
        const files = await ipcRenderer.invoke("open-file-picker", restrictExtensions);
        return files;
    },
    path: {
        join: (...args: string[]) => path.join(...args),
    },
    fs: {
        readFile: (filePath: string) => fs.readFile(filePath),
    },
});
