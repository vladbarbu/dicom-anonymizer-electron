"use client";
import React, { useState, useMemo } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
    IconHexagonLetterD,
    IconHome,
    IconFiles,
    IconSettings,
    IconFolder,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import DragWindowRegion from "@/components/DragWindowRegion";
import SettingsDrawer from "./SettingsDrawer";
import { useTranslation } from "react-i18next";
import PageSwitch from "@/pages/PageSwitch";

export function SideBar({ isDarkMode }: { isDarkMode: boolean }) {
    const { t } = useTranslation();
    const [selectedPage, setSelectedPage] = useState("home");
    const [isLoading, setIsLoading] = useState(false);
    const links = useMemo(
        () => [
            {
                label: "Home",
                value: "home",
                icon: (
                    <IconHexagonLetterD className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },

            {
                label: t("file_button"),
                value: "single",
                icon: (
                    <IconFiles className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
            {
                label: t("directory_button"),
                value: "directory",
                icon: (
                    <IconFolder className="h-5 w-5 flex-shrink-0 text-primary dark:text-primary" />
                ),
                icon_selected: (
                    <IconFolder className="h-5 w-5 flex-shrink-0 text-primary dark:text-neutral-200" />
                ),
            },
            {
                label: "Settings",
                value: "settings",
                icon: (
                    <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
        ],
        []
    );

    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-background dark:border-neutral-700  md:flex-row",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <div key={idx} onClick={() => setSelectedPage(link.value)}>
                                    {link.value === "settings" ? (
                                        <SettingsDrawer
                                            selectedPage={"settings"}
                                            isLoading={false}
                                            asSidebarLink
                                        />
                                    ) : (
                                        <SidebarLink key={idx} link={link} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex h-full w-full flex-col">
                <div className="w-full rounded-tl-2xl bg-background">
                    <DragWindowRegion isDarkMode={isDarkMode} />
                </div>
                <div className="flex flex-grow items-center justify-center">
                    <PageSwitch
                        selectedPage={selectedPage}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </div>
        </div>
    );
}
