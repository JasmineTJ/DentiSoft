-- CreateTable
CREATE TABLE `Patient` (
    `patientID` INTEGER NOT NULL AUTO_INCREMENT,
    `PatientSSN` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `Smoker` BOOLEAN NOT NULL,
    `alcoholIntake` BOOLEAN NOT NULL,
    `bloodGroup` VARCHAR(191) NOT NULL,
    `InsuranceCompany` VARCHAR(191) NOT NULL DEFAULT 'None',
    `InsuranceCoverage` VARCHAR(191) NOT NULL DEFAULT 'None',

    UNIQUE INDEX `Patient_PatientSSN_key`(`PatientSSN`),
    UNIQUE INDEX `Patient_email_key`(`email`),
    PRIMARY KEY (`patientID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allergies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `allergySource` VARCHAR(191) NOT NULL,
    `patientId` INTEGER NOT NULL,

    UNIQUE INDEX `Allergies_patientId_key`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChronicDisease` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease` VARCHAR(191) NOT NULL,
    `patientId` INTEGER NOT NULL,

    UNIQUE INDEX `ChronicDisease_patientId_key`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnosis` (
    `DiagnosisID` INTEGER NOT NULL AUTO_INCREMENT,
    `AffectedArea` VARCHAR(191) NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `diagnosedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientId` INTEGER NOT NULL,
    `DentistSsn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`DiagnosisID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treatment` (
    `TreatmentID` INTEGER NOT NULL AUTO_INCREMENT,
    `TreatmentType` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `DentistSsn` VARCHAR(191) NOT NULL,
    `diagnosisId` INTEGER NOT NULL,

    PRIMARY KEY (`TreatmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dosage` DOUBLE NOT NULL,
    `DosageUnit` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `TreatmentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagingResults` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `DentistComments` VARCHAR(191) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `DiagnosisId` INTEGER NOT NULL,

    UNIQUE INDEX `ImagingResults_patientId_key`(`patientId`),
    UNIQUE INDEX `ImagingResults_DiagnosisId_key`(`DiagnosisId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dentist` (
    `DentistSSN` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `personalImageURL` VARCHAR(191) NULL,

    UNIQUE INDEX `Dentist_DentistSSN_key`(`DentistSSN`),
    PRIMARY KEY (`DentistSSN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DentistWorkingDays` (
    `day` VARCHAR(191) NOT NULL,
    `DentistSsn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`DentistSsn`, `day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DentistWorkingHours` (
    `shift` VARCHAR(191) NOT NULL,
    `DentistSsn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`DentistSsn`, `shift`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `EmployeeSSN` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_EmployeeSSN_key`(`EmployeeSSN`),
    PRIMARY KEY (`EmployeeSSN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeWorkingDays` (
    `day` VARCHAR(191) NOT NULL,
    `EmployeeSsn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmployeeWorkingDays_EmployeeSsn_key`(`EmployeeSsn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeWorkingHours` (
    `shift` VARCHAR(191) NOT NULL,
    `EmployeeSsn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmployeeWorkingHours_EmployeeSsn_key`(`EmployeeSsn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileLogin` (
    `LoginId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userType` VARCHAR(191) NOT NULL,
    `employeeSsn` VARCHAR(191) NULL,
    `dentistSsn` VARCHAR(191) NULL,
    `patientId` INTEGER NULL,

    UNIQUE INDEX `ProfileLogin_employeeSsn_key`(`employeeSsn`),
    UNIQUE INDEX `ProfileLogin_dentistSsn_key`(`dentistSsn`),
    UNIQUE INDEX `ProfileLogin_patientId_key`(`patientId`),
    PRIMARY KEY (`LoginId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `BillingId` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` DATETIME(3) NOT NULL,
    `TotalCost` DOUBLE NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `visitId` INTEGER NOT NULL,

    UNIQUE INDEX `Invoice_visitId_key`(`visitId`),
    PRIMARY KEY (`BillingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesProvided` (
    `ServiceName` VARCHAR(191) NOT NULL,
    `ServiceCost` DOUBLE NOT NULL,
    `ServiceId` INTEGER NOT NULL,

    UNIQUE INDEX `ServicesProvided_ServiceId_key`(`ServiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `ItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Manufacturer` VARCHAR(191) NOT NULL,
    `Supplier` VARCHAR(191) NOT NULL,
    `currentTotalQuantity` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemPurchaseDetails` (
    `PurchaseID` INTEGER NOT NULL AUTO_INCREMENT,
    `ItemID` INTEGER NOT NULL,
    `PurchaseDate` DATETIME(3) NOT NULL,
    `Cost` DOUBLE NOT NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`PurchaseID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `patientId` INTEGER NULL,
    `dentistSsn` VARCHAR(191) NULL,
    `employeeSsn` VARCHAR(191) NULL,
    `serviceId` INTEGER NOT NULL,
    `diagnosisId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procedure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `DentistSsn` VARCHAR(191) NULL,
    `PatientId` INTEGER NULL,
    `diagnosisId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
