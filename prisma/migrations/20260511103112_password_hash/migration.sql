/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" 
ADD COLUMN     "passwordHash" TEXT NOT NULL;
UPDATE "User" SET "password" = "passwordHash";
DROP COLUMN "password",

