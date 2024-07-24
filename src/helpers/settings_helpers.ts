export async function readJsonFile(file_path: string): Promise<any> {
    const fs = window.electron.fs;

    try {
        const jsonData = await fs.readFile(file_path, "utf-8");
        const jsonString = new TextDecoder("utf-8").decode(jsonData);
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (error) {
        console.error("Error reading or parsing JSON:", error);
    }
}

export async function modifyJsonFile(filePath: string, key: string, newValue: any): Promise<void> {
    const fs = window.electron.fs;
    const path = window.electron.path;
    try {
        const jsonData = await fs.readFile(filePath, "utf-8");
        const jsonString = new TextDecoder("utf-8").decode(jsonData);
        let jsonObject = JSON.parse(jsonString);

        if (key.split(".").length > 1) {
            const keys = key.split(".");
            const parentKey = keys[0];
            const nestedKey = keys[1];
            const valueKey = keys[2];
            jsonObject[parentKey][nestedKey][valueKey] = newValue;
        } else {
            jsonObject[key] = newValue;
        }
        await fs.writeFile(filePath, JSON.stringify(jsonObject, null, 2), "utf-8");
    } catch (error) {
        console.error("Error modifying JSON file:", error);
    }
}
