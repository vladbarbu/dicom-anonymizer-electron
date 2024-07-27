import React, { useState, useEffect } from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import PageSwitch from "./PageSwitch";
import logoDark from "@/assets/svgs/logo_dark.svg";
import logoLigth from "@/assets/svgs/logo_light.svg";
import { SideBar } from "@/components/SideBar";

export default function HomePage() {
    const { t } = useTranslation();
    const [selectedPage, setSelectedPage] = useState("home");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const updateDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };

        updateDarkMode();

        const observer = new MutationObserver(updateDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, [selectedPage]);

    return (
        <>
            <SideBar isDarkMode={isDarkMode} />
        </>
    );
}
