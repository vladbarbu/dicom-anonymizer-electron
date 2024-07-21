import dicomParser from "dicom-parser";
import { uids } from "./uids";
export const getDicomTags = async (filePath: string, fileName: string) => {
    console.log("filePath", filePath);
    console.log("fileName", fileName);

    const fs = window.electron.fs;
    const path = window.electron.path;

    try {
        const buffer = await fs.readFile(path.join(filePath, fileName));
        const byteArray = new Uint8Array(buffer);
        const dataSet = dicomParser.parseDicom(byteArray);
        var patientName = dataSet.string("x00100010");
        console.log("Patient Name = " + patientName);

        var patientId = dataSet.string("x00100020");
        console.log("Patient ID = " + patientId);

        var patientBirthDate = dataSet.string("x00100030");
        console.log("Patient Birth Date = " + patientBirthDate);

        var studyDescription = dataSet.string("x00081030");
        console.log("Study Description = " + studyDescription);

        var protocolName = dataSet.string("x00181030");
        console.log("Protocol Name = " + protocolName);

        var accessionNumber = dataSet.string("x00080050");
        console.log("Accession # = " + accessionNumber);

        var studyId = dataSet.string("x00200010");
        console.log("Study Id = " + studyId);

        var studyDate = dataSet.string("x00080020");
        console.log("Study Date = " + studyDate);

        var studyTime = dataSet.string("x00080030");
        console.log("Study Time = " + studyTime);

        var seriesDescription = dataSet.string("x0008103e");
        console.log("Series Description = " + seriesDescription);

        var seriesDate = dataSet.string("x00080021");
        console.log("Series Date = " + seriesDate);

        var seriesTime = dataSet.string("x00080031");
        console.log("Series Time = " + seriesTime);

        var acquisitionDate = dataSet.string("x00080022");
        console.log("Acquisition Date = " + acquisitionDate);

        var acquisitionTime = dataSet.string("x00080032");
        console.log("Acquisition Time = " + acquisitionTime);

        var contentDate = dataSet.string("x00080023");
        console.log("Content Date = " + contentDate);

        var contentTime = dataSet.string("x00080033");
        console.log("Content Time = " + contentTime);

        return 200;
    } catch (error) {
        console.error("Error reading or parsing DICOM file:", error);
        throw error;
    }
};
