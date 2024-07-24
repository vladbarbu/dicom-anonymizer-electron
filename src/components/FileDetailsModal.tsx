"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./ui/file-animated-modal";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
export function FileDetailsModal({
    dicomTags,
    handleOnCLoseModal,
}: {
    dicomTags: any;
    handleOnCLoseModal: () => void;
}) {
    return (
        <Modal open={true}>
            <ModalTrigger>
                <div></div>
            </ModalTrigger>
            <ModalBody handleOnCLoseModal={handleOnCLoseModal}>
                <ModalContent>
                    <ScrollArea className="h-[1100px] ">
                        {dicomTags && (
                            <div className=" p-4">
                                <Section title="Patient Information">
                                    <Field
                                        label="Patient Name"
                                        value={dicomTags.PatientInformation.PatientName}
                                    />
                                    <Field
                                        label="Patient ID"
                                        value={dicomTags.PatientInformation.PatientID}
                                    />
                                    <Field
                                        label="Patient Birth Date"
                                        value={dicomTags.PatientInformation.PatientBirthDate}
                                    />
                                    <Field
                                        label="Patient Sex"
                                        value={dicomTags.PatientInformation.PatientSex}
                                    />
                                </Section>
                                <Separator />
                                <Section title="Study Information">
                                    <Field
                                        label="Study Description"
                                        value={dicomTags.StudyInformation.StudyDescription}
                                    />
                                    <Field
                                        label="Protocol Name"
                                        value={dicomTags.StudyInformation.ProtocolName}
                                    />
                                    <Field
                                        label="Accession #"
                                        value={dicomTags.StudyInformation.AccessionNumber}
                                    />
                                    <Field
                                        label="Study ID"
                                        value={dicomTags.StudyInformation.StudyId}
                                    />
                                    <Field
                                        label="Study Date"
                                        value={dicomTags.StudyInformation.StudyDate}
                                    />
                                    <Field
                                        label="Study Time"
                                        value={dicomTags.StudyInformation.StudyTime}
                                    />
                                </Section>
                                <Separator />
                                <Section title="Series Information">
                                    <Field
                                        label="Series Description"
                                        value={dicomTags.SeriesInformation.SeriesDescription}
                                    />
                                    <Field
                                        label="Series #"
                                        value={dicomTags.SeriesInformation.SeriesNumber}
                                    />
                                    <Field
                                        label="Modality"
                                        value={dicomTags.SeriesInformation.Modality}
                                    />
                                    <Field
                                        label="Body Part"
                                        value={dicomTags.SeriesInformation.BodyPart}
                                    />
                                    <Field
                                        label="Series Date"
                                        value={dicomTags.SeriesInformation.SeriesDate}
                                    />
                                    <Field
                                        label="Series Time"
                                        value={dicomTags.SeriesInformation.SeriesTime}
                                    />
                                </Section>
                                <Separator />
                                <Section title="Instance Information">
                                    <Field
                                        label="Instance #"
                                        value={dicomTags.InstanceInformation.InstanceNumber}
                                    />
                                    <Field
                                        label="Acquisition #"
                                        value={dicomTags.InstanceInformation.AcquisitionNumber}
                                    />
                                    <Field
                                        label="Acquisition Date"
                                        value={dicomTags.InstanceInformation.AcquisitionDate}
                                    />
                                    <Field
                                        label="Acquisition Time"
                                        value={dicomTags.InstanceInformation.AcquisitionTime}
                                    />
                                    <Field
                                        label="Content Date"
                                        value={dicomTags.InstanceInformation.ContentDate}
                                    />
                                    <Field
                                        label="Content Time"
                                        value={dicomTags.InstanceInformation.ContentTime}
                                    />
                                </Section>
                                <Separator />
                                <Section title="Equipment Information">
                                    <Field
                                        label="Manufacturer"
                                        value={dicomTags.EquipmentInformation.Manufacturer}
                                    />
                                    <Field
                                        label="Model"
                                        value={dicomTags.EquipmentInformation.Model}
                                    />
                                    <Field
                                        label="Station Name"
                                        value={dicomTags.EquipmentInformation.StationName}
                                    />
                                    <Field
                                        label="AE Title"
                                        value={dicomTags.EquipmentInformation.AETitle}
                                    />
                                    <Field
                                        label="Institution Name"
                                        value={dicomTags.EquipmentInformation.InstitutionName}
                                    />
                                    <Field
                                        label="Software Version"
                                        value={dicomTags.EquipmentInformation.SoftwareVersion}
                                    />
                                    <Field
                                        label="Implementation Version Name"
                                        value={
                                            dicomTags.EquipmentInformation.ImplementationVersionName
                                        }
                                    />
                                </Section>
                                <Separator />
                                <Section title="UIDS">
                                    <Field label="Study UID" value={dicomTags.UIDS.StudyUID} />
                                    <Field label="Series UID" value={dicomTags.UIDS.SeriesUID} />
                                    <Field
                                        label="Instance UID"
                                        value={dicomTags.UIDS.InstanceUID}
                                    />
                                    <Field
                                        label="SOP Class UID"
                                        value={dicomTags.UIDS.SOPClassUID}
                                    />
                                    <Field
                                        label="Transfer Syntax UID"
                                        value={dicomTags.UIDS.TransferSyntaxUID}
                                    />
                                    <Field
                                        label="Frame of Reference UID"
                                        value={dicomTags.UIDS.FrameOfReferenceUID}
                                    />
                                </Section>
                            </div>
                        )}
                    </ScrollArea>
                </ModalContent>
            </ModalBody>
        </Modal>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4">
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
);

const Field = ({ label, value }: { label: string; value: any }) => (
    <div className="flex">
        <div className="w-1/3 font-semibold">{label}:</div>
        <div className="w-2/3 break-words">{value}</div>
    </div>
);
