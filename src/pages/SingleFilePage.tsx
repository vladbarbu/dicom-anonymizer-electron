import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { FilePlus } from "lucide-react";
import FileTable from "../components/FileTable";
export default function SingleFilePage() {
    const { t } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [restrictExtensions, setRestrictExtensions] = useState<boolean>(false);

    const handleFilePicker = async () => {
        const files = await window.electron.openFilePicker(restrictExtensions);
        setSelectedFiles(files);
        console.log(files);
    };

    return (
        <div
            className={`relative  flex  h-full w-full flex-col rounded-xl border-4 ${selectedFiles.length > 0 ? "border-solid bg-secondary" : "border-dashed"} border-secondary p-4 lg:col-span-2`}
        >
            {selectedFiles.length > 0 ? (
                <div>
                    <FileTable selectedFiles={selectedFiles} />
                </div>
            ) : (
                <div
                    className="flex h-full flex-col items-center justify-center gap-4"
                    onClick={handleFilePicker}
                >
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FilePlus className="mr-2 h-8 w-8" /> Search for one or more files
                    </div>
                </div>
            )}
        </div>
    );
}
