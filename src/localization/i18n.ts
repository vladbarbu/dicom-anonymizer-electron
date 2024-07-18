import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                file_button: "Single/Multiple Files",
                directory_button: "Whole directory",
                settings_button: "Settings",
            },
        },
        ro: {
            translation: {
                file_button: "Fișiere unice/multiple",
                directory_button: "Întregul director",
                settings_button: "Setări",
            },
        },
    },
});
