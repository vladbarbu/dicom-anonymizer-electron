import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Files, FolderPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import SettingsDrawer from "./SettingsDrawer";

interface SideBarProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
}

export default function SideBar({ selectedPage, setSelectedPage }: SideBarProps) {
    const { t } = useTranslation();

    return (
        <div className="flex min-w-40 flex-col justify-between">
            <div className="flex w-full flex-col gap-4">
                <Button
                    variant={selectedPage === "single" ? "secondary" : "outline"}
                    size="xl"
                    className="flex flex-col items-center gap-4"
                    onClick={() => setSelectedPage("single")}
                >
                    <Files className="mr-2 h-4 w-4" /> {t("file_button")}
                </Button>
                <Button
                    variant={selectedPage === "directory" ? "secondary" : "outline"}
                    size="xl"
                    className="flex flex-col items-center gap-4"
                    onClick={() => setSelectedPage("directory")}
                >
                    <FolderPlus className="mr-2 h-4 w-4" /> {t("directory_button")}
                </Button>
            </div>
            <div className="flex w-full flex-col">
                <SettingsDrawer selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </div>
        </div>
    );
}
