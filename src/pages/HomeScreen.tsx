import React, { useState } from "react";
import { FlipWords } from "../components/ui/flip-words";
import { useTranslation } from "react-i18next";
import { SparklesCore } from "../components/ui/sparkles";

export function FlipWordsDemo() {
    const { t } = useTranslation();
    const words = t("home_page.title_list", { returnObjects: true }) as string[];
    const title = t("home_page.title");
    const subtitle = t("home_page.subtitle");

    return (
        <div className="flex w-full flex-col items-center justify-center px-4">
            <h1 className=" relative z-20 mx-auto text-center text-3xl font-normal text-neutral-500 dark:text-neutral-400 md:text-5xl xl:text-6xl">
                {title}
                <FlipWords words={words} /> <br />
                {subtitle}
            </h1>
            <div className="relative h-40 w-full">
                <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
                <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                <div className="absolute left-1/2 top-0 h-[5px] w-1/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
                <div className="absolute left-1/2 top-0 h-px w-1/4 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="h-full w-full"
                    particleColor={
                        document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"
                    }
                />
                <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(500px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    );
}
