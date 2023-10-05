/*
  Warnings:

  - The primary key for the `UserNewsSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `UserNewsSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserNewsSettings" DROP CONSTRAINT "UserNewsSettings_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserNewsSettings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserNewsSettings_id_seq";
