-- AlterTable
ALTER TABLE `user` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `resetOTP` VARCHAR(191) NULL,
    ADD COLUMN `resetOTPExpires` DATETIME(3) NULL,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL;
