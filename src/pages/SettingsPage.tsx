import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";

export default function SettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="light:bg-neutral-200 relative  flex  w-full flex-col rounded-xl bg-muted/100 p-4 lg:col-span-2">
            <h1 className="text-4xl font-bold">{t("settings.button")}</h1>
            <LangToggle />
            <h1 className="text-4xl font-bold">{t("settings.button")}</h1>
        </div>
    );
}
