import React, { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { Checkbox } from "@/components/ui/checkbox";

interface SettingsDrawerProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
}

export default function SettingsDrawer({ selectedPage, setSelectedPage }: SettingsDrawerProps) {
    const { t } = useTranslation();
    const openAnonymizationOptions = t("settings.open_checkbox_options", {
        returnObjects: true,
    }) as string[];
    const closedAnonymizationOptions = t("settings.close_checkbox_options", {
        returnObjects: true,
    }) as string[];

    const [outputDirectory, setOutputDirectory] = useState<string | null>(null);

    const handleDirectoryPicker = async () => {
        const directory = await window.electron.openDirectoryPicker();
        setOutputDirectory(directory);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={selectedPage === "settings" ? "secondary" : "outline"} size="xl">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings.button")}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{t("settings.title")}</DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                    <div>Language settings</div>
                    <div className="flex flex-row items-center gap-4">
                        <DrawerDescription>{t("settings.language")}</DrawerDescription>
                        <LangToggle />
                    </div>
                    <div>Output directory</div>
                    <div className="flex flex-row items-center gap-4">
                        <Button variant="secondary" onClick={handleDirectoryPicker}>
                            Select Directory
                        </Button>
                        <DrawerDescription>
                            {outputDirectory || "No directory selected"}
                        </DrawerDescription>
                    </div>
                    <div>Anonymization settings</div>
                    {openAnonymizationOptions.map((option) => (
                        <div className="flex items-center gap-2" key={option}>
                            <Checkbox id={option} />
                            <DrawerDescription>{option}</DrawerDescription>
                        </div>
                    ))}
                    {closedAnonymizationOptions.map((option) => (
                        <div className="flex items-center gap-2" key={option}>
                            <Checkbox id={option} disabled checked />
                            <DrawerDescription>{option}</DrawerDescription>
                        </div>
                    ))}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
