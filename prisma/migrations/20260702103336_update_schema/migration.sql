/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetOTP` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetOTPExpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isVerified`,
    DROP COLUMN `resetOTP`,
    DROP COLUMN `resetOTPExpires`,
    DROP COLUMN `verificationToken`,
    ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpires` DATETIME(3) NULL;
