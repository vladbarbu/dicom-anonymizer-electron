import dicomParser from "dicom-parser";
import { readJsonFile } from "@/helpers/settings_helpers";

export const getDicomTags = async (filePath: string, fileName: string) => {
    console.log("filePath", filePath);
    console.log("fileName", fileName);

    const fs = window.electron.fs;
    const path = window.electron.path;

    try {
        const buffer = await fs.readFile(path.join(filePath, fileName));
        const byteArray = new Uint8Array(buffer);
        const dataSet = dicomParser.parseDicom(byteArray);
        console.log(dataSet.elements);
        const sections: { [key: string]: { [key: string]: string } } = {
            PatientInformation: {
                x00100010: "PatientName",
                x00100020: "PatientID",
                x00100030: "PatientBirthDate",
                x00100040: "PatientSex",
            },
            StudyInformation: {
                x00081030: "StudyDescription",
                x00181030: "ProtocolName",
                x00080050: "AccessionNumber",
                x00200010: "StudyId",
                x00080020: "StudyDate",
                x00080030: "StudyTime",
            },
            SeriesInformation: {
                x0008103e: "SeriesDescription",
                x00200011: "SeriesNumber",
                x00080060: "Modality",
                x00180015: "BodyPart",
                x00080021: "SeriesDate",
                x00080031: "SeriesTime",
            },
            InstanceInformation: {
                x00200013: "InstanceNumber",
                x00200012: "AcquisitionNumber",
                x00080022: "AcquisitionDate",
                x00080032: "AcquisitionTime",
                x00080023: "ContentDate",
                x00080033: "ContentTime",
            },
            ImageInformation: {
                x00280010: "Rows",
                x00280011: "Columns",
                x00280004: "PhotometricInterpretation",
                x00080008: "ImageType",
                x00280100: "BitsAllocated",
                x00280101: "BitsStored",
                x00280102: "HighBit",
                x00280103: "PixelRepresentation",
                x00281053: "RescaleSlope",
                x00281052: "RescaleIntercept",
                x00200032: "ImagePositionPatient",
                x00200037: "ImageOrientationPatient",
                x00280030: "PixelSpacing",
                x00280002: "SamplesPerPixel",
            },
            EquipmentInformation: {
                x00080070: "Manufacturer",
                x00081090: "Model",
                x00081010: "StationName",
                x00020016: "AETitle",
                x00080080: "InstitutionName",
                x00181020: "SoftwareVersion",
                x00020013: "ImplementationVersionName",
            },
            UIDS: {
                x0020000d: "StudyUID",
                x0020000e: "SeriesUID",
                x00080018: "InstanceUID",
                x00080016: "SOPClassUID",
                x00020010: "TransferSyntaxUID",
                x00200052: "FrameofReferenceUID",
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
        return result;
    } catch (error) {
        console.error("Error reading or parsing DICOM file:", error);
        throw error;
    }
};

function getRandomString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const anonymizeDicom = async (filePath: string, fileName: string, selectedPath: string) => {
    const jsonContent = await readJsonFile("src/settings.json");
    const dicomTags: Record<string, string> = {};

    if (jsonContent.anonymize) {
        for (const [key, value] of Object.entries(jsonContent.anonymize)) {
            if (
                typeof value === "object" &&
                value !== null &&
                "tag" in value &&
                typeof value.tag === "string"
            ) {
                dicomTags[value.tag] = key;
            }
        }
    }

    const fs = window.electron.fs;
    const path = window.electron.path;

    const buffer = await fs.readFile(path.join(filePath, fileName));
    const byteArray = new Uint8Array(buffer);
    const dataSet = dicomParser.parseDicom(byteArray);

    for (const tag in dicomTags) {
        if (Object.prototype.hasOwnProperty.call(dicomTags, tag)) {
            const element = dataSet.elements[tag];
            const value = dataSet.string(tag);
            if (value !== undefined) {
                const newValue = getRandomString(value.length);

                for (let i = 0; i < element.length; i++) {
                    const char = newValue.length > i ? newValue.charCodeAt(i) : 32;
                    dataSet.byteArray[element.dataOffset + i] = char;
                }
            }
        }
    }

    const blob = new Blob([dataSet.byteArray], { type: "application/dicom" });
    const arrayBuffer = await blob.arrayBuffer();
    const anonymizedData = new Uint8Array(arrayBuffer);

    if (selectedPath && selectedPath.length > 0) {
        const outputFilePath = path.join(selectedPath, `anonymized_${fileName}`);
        await fs.writeFile(outputFilePath, anonymizedData);
    }
};
