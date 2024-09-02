-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADM', 'COM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'COM';
