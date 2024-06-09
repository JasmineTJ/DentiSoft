/*
  Warnings:

  - You are about to drop the column `yearsOfExperience` on the `dentist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `allergies` DROP FOREIGN KEY `Allergies_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `chronicdisease` DROP FOREIGN KEY `ChronicDisease_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `dentistworkingdays` DROP FOREIGN KEY `DentistWorkingDays_DentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `dentistworkinghours` DROP FOREIGN KEY `DentistWorkingHours_DentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_DentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `employeeworkingdays` DROP FOREIGN KEY `EmployeeWorkingDays_EmployeeSsn_fkey`;

-- DropForeignKey
ALTER TABLE `employeeworkinghours` DROP FOREIGN KEY `EmployeeWorkingHours_EmployeeSsn_fkey`;

-- DropForeignKey
ALTER TABLE `imagingresults` DROP FOREIGN KEY `ImagingResults_DiagnosisId_fkey`;

-- DropForeignKey
ALTER TABLE `imagingresults` DROP FOREIGN KEY `ImagingResults_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_visitId_fkey`;

-- DropForeignKey
ALTER TABLE `itempurchasedetails` DROP FOREIGN KEY `ItemPurchaseDetails_ItemID_fkey`;

-- DropForeignKey
ALTER TABLE `medications` DROP FOREIGN KEY `Medications_TreatmentId_fkey`;

-- DropForeignKey
ALTER TABLE `procedure` DROP FOREIGN KEY `Procedure_DentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `procedure` DROP FOREIGN KEY `Procedure_PatientId_fkey`;

-- DropForeignKey
ALTER TABLE `procedure` DROP FOREIGN KEY `Procedure_diagnosisId_fkey`;

-- DropForeignKey
ALTER TABLE `profilelogin` DROP FOREIGN KEY `ProfileLogin_dentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `profilelogin` DROP FOREIGN KEY `ProfileLogin_employeeSsn_fkey`;

-- DropForeignKey
ALTER TABLE `profilelogin` DROP FOREIGN KEY `ProfileLogin_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `treatment` DROP FOREIGN KEY `Treatment_DentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `treatment` DROP FOREIGN KEY `Treatment_diagnosisId_fkey`;

-- DropForeignKey
ALTER TABLE `treatment` DROP FOREIGN KEY `Treatment_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_dentistSsn_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_diagnosisId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_employeeSsn_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_serviceId_fkey`;

-- AlterTable
ALTER TABLE `dentist` DROP COLUMN `yearsOfExperience`,
    MODIFY `personalImageURL` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Allergies` ADD CONSTRAINT `Allergies_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChronicDisease` ADD CONSTRAINT `ChronicDisease_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_DentistSsn_fkey` FOREIGN KEY (`DentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treatment` ADD CONSTRAINT `Treatment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treatment` ADD CONSTRAINT `Treatment_DentistSsn_fkey` FOREIGN KEY (`DentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treatment` ADD CONSTRAINT `Treatment_diagnosisId_fkey` FOREIGN KEY (`diagnosisId`) REFERENCES `Diagnosis`(`DiagnosisID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medications` ADD CONSTRAINT `Medications_TreatmentId_fkey` FOREIGN KEY (`TreatmentId`) REFERENCES `Treatment`(`TreatmentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagingResults` ADD CONSTRAINT `ImagingResults_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagingResults` ADD CONSTRAINT `ImagingResults_DiagnosisId_fkey` FOREIGN KEY (`DiagnosisId`) REFERENCES `Diagnosis`(`DiagnosisID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DentistWorkingDays` ADD CONSTRAINT `DentistWorkingDays_DentistSsn_fkey` FOREIGN KEY (`DentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DentistWorkingHours` ADD CONSTRAINT `DentistWorkingHours_DentistSsn_fkey` FOREIGN KEY (`DentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeWorkingDays` ADD CONSTRAINT `EmployeeWorkingDays_EmployeeSsn_fkey` FOREIGN KEY (`EmployeeSsn`) REFERENCES `Employee`(`EmployeeSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeWorkingHours` ADD CONSTRAINT `EmployeeWorkingHours_EmployeeSsn_fkey` FOREIGN KEY (`EmployeeSsn`) REFERENCES `Employee`(`EmployeeSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLogin` ADD CONSTRAINT `ProfileLogin_employeeSsn_fkey` FOREIGN KEY (`employeeSsn`) REFERENCES `Employee`(`EmployeeSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLogin` ADD CONSTRAINT `ProfileLogin_dentistSsn_fkey` FOREIGN KEY (`dentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileLogin` ADD CONSTRAINT `ProfileLogin_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPurchaseDetails` ADD CONSTRAINT `ItemPurchaseDetails_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Item`(`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_dentistSsn_fkey` FOREIGN KEY (`dentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_employeeSsn_fkey` FOREIGN KEY (`employeeSsn`) REFERENCES `Employee`(`EmployeeSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `ServicesProvided`(`ServiceId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_diagnosisId_fkey` FOREIGN KEY (`diagnosisId`) REFERENCES `Diagnosis`(`DiagnosisID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedure` ADD CONSTRAINT `Procedure_DentistSsn_fkey` FOREIGN KEY (`DentistSsn`) REFERENCES `Dentist`(`DentistSSN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedure` ADD CONSTRAINT `Procedure_PatientId_fkey` FOREIGN KEY (`PatientId`) REFERENCES `Patient`(`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Procedure` ADD CONSTRAINT `Procedure_diagnosisId_fkey` FOREIGN KEY (`diagnosisId`) REFERENCES `Diagnosis`(`DiagnosisID`) ON DELETE CASCADE ON UPDATE CASCADE;
