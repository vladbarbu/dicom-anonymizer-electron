import i18n from "i18next";
import { Settings } from "lucide-react";
import { title } from "process";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                file_button: "Single/Multiple Files",
                directory_button: "Whole directory",
                settings: {
                    button: "Settings",
                    title: "App settings",
                    language_section_title: "Language settings",
                    language: "Select the language of the interface:",
                    output_section_title: "Output directory settings",
                    output_section_button: "Select output directory",
                    output_default_text: "No output directory selected",
                    checbox_section_title: "Anonymization options",
                    open_checkbox_options: [
                        "Institution Name",
                        "Performing Physician's Name",
                        "Name of Physician(s) Rading Study",
                        "Operator(s) Name",
                        "Patient's Birth Date",
                    ],
                    close_checkbox_options: ["Patient's Name", "Patient ID"],
                },
                home_page: {
                    title: "Anonymize",
                    title_list: ["CT", "MRI", "PET", "SPECT", "X-ray"],
                    subtitle: "effortlessly and securely 🛡️",
                },
            },
        },
        ro: {
            translation: {
                file_button: "Fișiere unice/multiple",
                directory_button: "Întregul director",
                settings: {
                    button: "Setări",
                    title: "Setări aplicație",
                    language: "Selectează limba interfeței:",
                    language_section_title: "Setări limbă",
                    output_section_title: "Setări director de salvare",
                    output_section_button: "Selectează directorul ",
                    output_default_text: "Nu a fost selectat niciun director de salvare",
                    checbox_section_title: "Opțiuni de anonimizare",
                    open_checkbox_options: [
                        "Nume instituție",
                        "Nume medic care a efectuat studiul",
                        "Nume medic(i) care au citit studiul",
                        "Nume operator(i)",
                        "Data nașterii pacientului",
                    ],
                    close_checkbox_options: ["Nume pacient", "ID pacient"],
                },
                home_page: {
                    title: "Anonimizează",
                    title_list: ["CT", "RMN", "PET", "SPECT", "X-ray"],
                    subtitle: "fără efort și sigur 🛡️",
                },
            },
        },
    },
});
