import { readJsonFile, modifyJsonFile } from "@/helpers/settings_helpers";

const path = window.electron.path;
let json_file_path: string;
const dirname = "src/extraResources";

if (process.env.NODE_ENV === "development") {
    json_file_path = path.join(dirname, "settings.json");
} else {
    json_file_path = path.join("resources/extraResources", "settings.json");
}

export async function setThemeToDefault() {
    const jsonObject = await readJsonFile(json_file_path);
    if (jsonObject.theme === "dark") {
        updateDocumentTheme(true);
    }
    if (jsonObject.theme === "light") {
        updateDocumentTheme(false);
    }
    if (jsonObject.theme === "system") {
        const isDarkMode = await window.themeMode.system();
        if (isDarkMode) {
            await modifyJsonFile(json_file_path, "theme", "dark");
        } else {
            await modifyJsonFile(json_file_path, "theme", "light");
        }
        updateDocumentTheme(isDarkMode);
    }
}

export function updateDocumentTheme(isDarkMode: boolean) {
    if (!isDarkMode) {
        document.documentElement.classList.remove("dark");
        modifyJsonFile(json_file_path, "theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        modifyJsonFile(json_file_path, "theme", "dark");
    }
}
