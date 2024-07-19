import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export function FlipWordsDemo() {
    const words = ["CT", "MRI", "PET", "SPECT", "X-ray"];

    return (
        <div className="flex w-full items-center justify-center px-4">
            <div className="mx-auto text-4xl font-normal text-neutral-600 dark:text-neutral-400">
                Anonymize
                <FlipWords words={words} /> <br />
                effortlessly and securely 🛡️
            </div>
        </div>
    );
}
