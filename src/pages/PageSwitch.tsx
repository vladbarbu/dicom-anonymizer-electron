import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import SingleFilePage from "./SingleFilePage";
import DirectoryPage from "./DirectoryPage";
import SettingsPage from "./SettingsPage";
import { FlipWordsDemo } from "./HomeScreen";
interface PageSwitchProps {
    selectedPage: string;
}

export default function PageSwitch({ selectedPage }: PageSwitchProps) {
    const { t } = useTranslation();
    const [lastSelectedPage, setLastSelectedPage] = useState<"single" | "directory" | "home">(
        "single"
    );

    useEffect(() => {
        if (selectedPage === "single" || selectedPage === "directory" || selectedPage === "home") {
            setLastSelectedPage(selectedPage);
        }
    }, [selectedPage]);

    return (
        <>
            {selectedPage === "home" && <FlipWordsDemo />}
            {selectedPage === "single" && <SingleFilePage />}
            {selectedPage === "directory" && <DirectoryPage />}
            {selectedPage === "settings" && (
                <>
                    {lastSelectedPage === "single" && <SingleFilePage />}
                    {lastSelectedPage === "directory" && <DirectoryPage />}
                    {lastSelectedPage === "home" && <FlipWordsDemo />}
                </>
            )}
        </>
    );
}
