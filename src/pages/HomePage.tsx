import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import SideBar from "@/components/SideBar";
export default function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex h-screen w-screen flex-col items-end gap-4 p-4">
                {/* <h1 className="text-4xl font-bold">{t("title")}</h1>
                <h1 className="text-4xl font-bold">{t("description")}</h1> */}
                {/* <LangToggle /> */}
                <div className="h-8">
                    <ToggleTheme />
                </div>
                <div className={`flex h-[calc(100vh-110px)]  w-full gap-4 overflow-auto`}>
                    <SideBar />
                    <div className="light:bg-neutral-200 relative  flex  w-full flex-col rounded-xl bg-muted/100 p-4 lg:col-span-2">
                        asd
                    </div>
                </div>
            </div>
        </>
    );
}
