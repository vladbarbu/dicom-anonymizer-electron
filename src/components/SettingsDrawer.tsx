import React from "react";
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

interface SettingsDrawerProps {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
}

export default function SettingsDrawer({ selectedPage, setSelectedPage }: SettingsDrawerProps) {
    const { t } = useTranslation();

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant={selectedPage === "settings" ? "secondary" : "outline"}
                    size="xl"
                    onClick={() => setSelectedPage("settings")}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    {t("settings_button")}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{t("settings_title")}</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
