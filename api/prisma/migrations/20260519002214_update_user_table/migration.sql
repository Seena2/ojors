/*
  Warnings:

  - Changed the type of `gender` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'JOB_SEEKER', 'HIRING_COMPANY', 'AGENCY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BASIC',
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
