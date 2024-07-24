import { readJsonFile, modifyJsonFile } from "@/helpers/settings_helpers";
export async function setThemeToDefault() {
    const jsonObject = await readJsonFile("src/settings.json");
    if (jsonObject.theme === "system") {
        const isDarkMode = await window.themeMode.system();
        if (isDarkMode) {
            await modifyJsonFile("src/settings.json", "theme", "dark");
        } else {
            await modifyJsonFile("src/settings.json", "theme", "light");
        }
        updateDocumentTheme(isDarkMode);
    } else {
        if (jsonObject.theme === "dark") {
            updateDocumentTheme(true);
        } else {
            updateDocumentTheme(false);
        }
    }
}

export function updateDocumentTheme(isDarkMode: boolean) {
    if (!isDarkMode) {
        document.documentElement.classList.remove("dark");
        modifyJsonFile("src/settings.json", "theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        modifyJsonFile("src/settings.json", "theme", "dark");
    }
}
