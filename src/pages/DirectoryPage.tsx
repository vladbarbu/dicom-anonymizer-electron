import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { FolderPlus } from "lucide-react";

export default function DirectoryPage() {
    const { t } = useTranslation();
    const [outputDirectory, setOutputDirectory] = useState<string | null>(null);

    const handleDirectoryPicker = async () => {
        const directory = await window.electron.openDirectoryPicker();
        setOutputDirectory(directory);
    };

    return (
        <div className="relative  flex  h-full w-full flex-col rounded-xl border-4 border-dashed border-secondary p-4 lg:col-span-2">
            <div
                className="flex h-full flex-col items-center justify-center gap-4"
                onClick={handleDirectoryPicker}
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <FolderPlus className="mr-2 h-8 w-8" /> Search for one or more files
                </div>
            </div>
        </div>
    );
}
