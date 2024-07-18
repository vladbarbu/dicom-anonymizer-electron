import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import SingleFilePage from "./SingleFilePage";
import DirectoryPage from "./DirectoryPage";
import SettingsPage from "./SettingsPage";

interface PageSwitchProps {
    selectedPage: string;
}

export default function PageSwitch({ selectedPage }: PageSwitchProps) {
    const { t } = useTranslation();

    return (
        <>
            {selectedPage === "single" && <SingleFilePage />}
            {selectedPage === "directory" && <DirectoryPage />}
            {selectedPage === "settings" && <SettingsPage />}
        </>
    );
}
