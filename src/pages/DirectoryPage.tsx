import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { FolderPlus } from "lucide-react";

export default function DirectoryPage({
    isLoading,
    setIsLoading,
}: {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}) {
    const { t } = useTranslation();
    const [outputDirectory, setOutputDirectory] = useState<string | null>(null);
    console.log(isLoading);

    const getDirectoryContent = async (srcDir: string) => {
        const path = window.electron.path;
        const fs = window.electron.fs;
        const results: any = {};
        const list = await fs.readdir(srcDir, { withFileTypes: true });

        for (const file of list) {
            const filePath = path.join(srcDir, file);

            if (await fs.isDirectory(filePath)) {
                results[file] = await getDirectoryContent(filePath);
            } else {
                results[file] = filePath;
            }
        }

        return results;
    };

    const handleDirectoryPicker = async () => {
        setIsLoading(true);
        const directory = await window.electron.openDirectoryPicker();
        if (directory) {
            setOutputDirectory(directory);
            console.log(directory);
            const dirContent = await getDirectoryContent(directory);
            console.log(dirContent);
        }
        setIsLoading(false);
    };

    return (
        <div className="relative  flex  h-full w-full flex-col rounded-xl border-2 border-dashed border-secondary p-4 lg:col-span-2">
            {isLoading ? (
                "Loading..."
            ) : (
                <div
                    className="flex h-full flex-col items-center justify-center gap-4"
                    onClick={handleDirectoryPicker}
                >
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FolderPlus className="mr-2 h-8 w-8" /> Search for one or more files
                    </div>
                </div>
            )}
        </div>
    );
}
