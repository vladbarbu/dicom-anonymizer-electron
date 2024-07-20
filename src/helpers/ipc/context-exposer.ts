import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { contextBridge, ipcRenderer } from "electron";

export default function exposeContexts() {
    exposeWindowContext();
    exposeThemeContext();
}

contextBridge.exposeInMainWorld("electron", {
    openDirectoryPicker: async () => {
        const directory = await ipcRenderer.invoke("open-directory-picker");
        return directory;
    },
});
