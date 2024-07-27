import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { FilePlus } from "lucide-react";
import { FileTable } from "@/components/FileTable";
export default function SingleFilePage() {
    const { t } = useTranslation();
    interface FileDict {
        id: number;
        status: "not anonymized" | "anonymized";
        root_path: string;
        file_name: string;
    }

    const [selectedFiles, setSelectedFiles] = useState<FileDict[]>([]);
    const [restrictExtensions, setRestrictExtensions] = useState<boolean>(false);
    const [pageIndex, setPageIndex] = useState(0);

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
    };

    const preprocessFiles = (files: string[]): FileDict[] | undefined => {
        if (files.length === 0) {
            alert(t("no_files_selected"));
            return;
        }

        const processedFiles = files.map((file, index) => {
            const parsedPath = parsePath(file);
            return {
                id: index,
                status: "not anonymized" as const,
                root_path: parsedPath.dir,
                file_name: parsedPath.base,
            };
        });

        return processedFiles;
    };

    const handleDeleteRow = (id: number) => {
        const updatedFiles = selectedFiles.filter((file) => file.id !== id);
        setSelectedFiles(updatedFiles);
    };

    const parsePath = (filePath: string) => {
        const isWindows = filePath.includes("\\");
        const separator = isWindows ? "\\" : "/";
        const parts = filePath.split(separator);
        const base = parts.pop() || "";
        const dir = parts.join(separator);
        return { dir, base };
    };

    const handleFilePicker = async () => {
        const files = await window.electron.openFilePicker(restrictExtensions);
        const processedFiles = preprocessFiles(files);
        if (processedFiles) {
            setSelectedFiles(processedFiles);
        }
    };

    return (
        <div
            className={`relative  flex  h-full w-full flex-col rounded-xl border-2 ${selectedFiles.length > 0 ? "h-fit border-solid bg-secondary/60" : "h-full border-dashed"} border-secondary p-4  lg:col-span-2`}
        >
            {selectedFiles.length > 0 ? (
                <div>
                    <FileTable
                        selectedFiles={selectedFiles}
                        handleDeleteRow={handleDeleteRow}
                        pageIndex={pageIndex}
                        handlePageChange={handlePageChange}
                    />
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
