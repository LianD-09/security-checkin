/*
  Warnings:

  - Added the required column `latitude` to the `Checkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longtitude` to the `Checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checkin` ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longtitude` DOUBLE NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_location` MODIFY `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
