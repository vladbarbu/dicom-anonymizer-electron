import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { IconSettings } from "@tabler/icons-react";
import ToggleTheme from "./ToggleTheme";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { Checkbox } from "@/components/ui/checkbox";
import { readJsonFile, modifyJsonFile } from "@/helpers/settings_helpers";
import { SidebarLink } from "./ui/sidebar";

interface SettingsDrawerProps {
    selectedPage: string;
    isLoading: boolean;
    asSidebarLink?: boolean;
}

export default function SettingsDrawer({
    selectedPage,
    isLoading,
    asSidebarLink,
}: SettingsDrawerProps) {
    const { t } = useTranslation();

    const [outputDirectory, setOutputDirectory] = useState<string | null>(null);
    const [anonymizeOptions, setAnonymizeOptions] = useState<any>({});
    const path = window.electron.path;
    let json_file_path;
    const dirname = "src/extraResources";

    if (process.env.NODE_ENV === "development") {
        json_file_path = path.join(dirname, "settings.json");
    } else {
        json_file_path = path.join("resources/extraResources", "settings.json");
    }

    const handleDirectoryPicker = async () => {
        const directory = await window.electron.openDirectoryPicker();
        setOutputDirectory(directory);
    };

    const getSettingsData = async () => {
        const settingsData = await readJsonFile(json_file_path);
        setAnonymizeOptions(settingsData.anonymize);
    };

    const handleCheckboxChange = async (option: string, checked: boolean) => {
        const nested_option = "anonymize." + option + ".enabled";
        await modifyJsonFile(json_file_path, nested_option, !checked);
        setAnonymizeOptions((prevOptions: any) => ({
            ...prevOptions,
            [option]: !checked,
        }));
    };

    useEffect(() => {
        getSettingsData();
    }, [anonymizeOptions]);

    if (asSidebarLink) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <SidebarLink
                        link={{
                            label: t("settings.button"),
                            value: "settings",
                            icon: (
                                <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
                            ),
                        }}
                    />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            <div className="flex flex-row items-center justify-between gap-2">
                                {t("settings.title")}
                                <div className="flex items-center gap-2">
                                    <div>Toggle theme</div>

                                    <div className="h-8" onClick={(e) => e.stopPropagation()}>
                                        <ToggleTheme />
                                    </div>
                                </div>
                            </div>
                        </DrawerTitle>
                    </DrawerHeader>

                    <DrawerFooter>
                        <div>{t("settings.language_section_title")}</div>
                        <div className="flex flex-row items-center gap-4">
                            <DrawerDescription>{t("settings.language")}</DrawerDescription>
                            <LangToggle />
                        </div>
                        <div>{t("settings.checbox_section_title")}</div>
                        <div className="flex h-40 flex-col flex-wrap gap-2">
                            {Object.keys(anonymizeOptions).length > 0 &&
                                Object.entries(anonymizeOptions).map(
                                    ([option, content]: [string, any]) => (
                                        <div className="flex items-center gap-2" key={option}>
                                            <Checkbox
                                                id={content.tag}
                                                checked={content.enabled}
                                                disabled={!content.toggleable}
                                                onClick={() =>
                                                    handleCheckboxChange(option, content.enabled)
                                                }
                                            />
                                            <DrawerDescription>{content.label}</DrawerDescription>
                                        </div>
                                    )
                                )}
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant={selectedPage === "settings" ? "secondary" : "outline"}
                    size="xl"
                    disabled={isLoading}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings.button")}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{t("settings.title")}</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <div>{t("settings.language_section_title")}</div>
                    <div className="flex flex-row items-center gap-4">
                        <DrawerDescription>{t("settings.language")}</DrawerDescription>
                        <LangToggle />
                    </div>
                    <div>{t("settings.checbox_section_title")}</div>
                    <div className="flex h-40 flex-col flex-wrap gap-2">
                        {Object.keys(anonymizeOptions).length > 0 &&
                            Object.entries(anonymizeOptions).map(
                                ([option, content]: [string, any]) => (
                                    <div className="flex items-center gap-2" key={option}>
                                        <Checkbox
                                            id={content.tag}
                                            checked={content.enabled}
                                            disabled={!content.toggleable}
                                            onClick={() =>
                                                handleCheckboxChange(option, content.enabled)
                                            }
                                        />
                                        <DrawerDescription>{content.label}</DrawerDescription>
                                    </div>
                                )
                            )}
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
