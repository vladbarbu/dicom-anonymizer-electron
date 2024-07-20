import React, { useState, useEffect } from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import SideBar from "@/components/SideBar";
import PageSwitch from "./PageSwitch";
import logoDark from "@/assets/svgs/logo_dark.svg";
import logoLigth from "@/assets/svgs/logo_light.svg";

export default function HomePage() {
    const { t } = useTranslation();
    const [selectedPage, setSelectedPage] = useState("home");
    const [isDarkMode, setIsDarkMode] = useState(false);
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
            <div className="flex h-screen w-screen cursor-pointer flex-col items-end gap-4 p-4">
                <div
                    className="flex w-full items-center justify-between"
                    onClick={() => setSelectedPage("home")}
                >
                    <img
                        src={isDarkMode ? logoLigth : logoDark}
                        alt="Farmer Icon"
                        className="mr-2 inline-block"
                        width="128"
                        height="64"
                    />
                    <div className="h-8">
                        <ToggleTheme />
                    </div>
                </div>
                <div className={`flex h-[calc(100vh-110px)]  w-full gap-4 overflow-auto`}>
                    <SideBar setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
                    <PageSwitch selectedPage={selectedPage} />
                </div>
            </div>
        </>
    );
}
