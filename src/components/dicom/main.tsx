import dicomParser from "dicom-parser";

export const getDicomTags = async (filePath: string, fileName: string) => {
    console.log("filePath", filePath);
    console.log("fileName", fileName);

    const fs = window.electron.fs;
    const path = window.electron.path;

    try {
        const buffer = await fs.readFile(path.join(filePath, fileName));
        const byteArray = new Uint8Array(buffer);
        const dataSet = dicomParser.parseDicom(byteArray);

        const sections: { [key: string]: { [key: string]: string } } = {
            "Patient Information": {
                x00100010: "Patient Name",
                x00100020: "Patient ID",
                x00100030: "Patient Birth Date",
                x00100040: "Patient Sex",
            },
            "Study Information": {
                x00081030: "Study Description",
                x00181030: "Protocol Name",
                x00080050: "Accession #",
                x00200010: "Study Id",
                x00080020: "Study Date",
                x00080030: "Study Time",
            },
            "Series Information": {
                x0008103e: "Series Description",
                x00200011: "Series #",
                x00080060: "Modality",
                x00180015: "Body Part",
                x00080021: "Series Date",
                x00080031: "Series Time",
            },
            "Instance Information": {
                x00200013: "Instance #",
                x00200012: "Acquisition #",
                x00080022: "Acquisition Date",
                x00080032: "Acquisition Time",
                x00080023: "Content Date",
                x00080033: "Content Time",
            },
            "Image Information": {
                x00280010: "Rows",
                x00280011: "Columns",
                x00280004: "Photometric Interpretation",
                x00080008: "Image Type",
                x00280100: "Bits Allocated",
                x00280101: "Bits Stored",
                x00280102: "HighBit",
                x00280103: "Pixel Representation",
                x00281053: "Rescale Slope",
                x00281052: "Rescale Intercept",
                x00200032: "Image Position Patient",
                x00200037: "Image Orientation Patient",
                x00280030: "Pixel Spacing",
                x00280002: "Samples Per Pixel",
            },
            "Equipment Information": {
                x00080070: "Manufacturer",
                x00081090: "Model",
                x00081010: "Station Name",
                x00020016: "AE Title",
                x00080080: "Institution Name",
                x00181020: "Software Version",
                x00020013: "Implementation Version Name",
            },
            UIDS: {
                x0020000d: "Study UID",
                x0020000e: "Series UID",
                x00080018: "Instance UID",
                x00080016: "SOP Class UID",
                x00020010: "Transfer Syntax UID",
                x00200052: "Frame of Reference UID",
            },
        };

        const result: { [key: string]: { [key: string]: string } } = {};

        for (const section in sections) {
            if (Object.prototype.hasOwnProperty.call(sections, section)) {
                result[section] = {};
                for (const tag in sections[section]) {
                    if (Object.prototype.hasOwnProperty.call(sections[section], tag)) {
                        const value = dataSet.string(tag);
                        if (value !== undefined) {
                            result[section][sections[section][tag]] = value;
                        }
                    }
                }
            }
        }
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error reading or parsing DICOM file:", error);
        throw error;
    }
};
