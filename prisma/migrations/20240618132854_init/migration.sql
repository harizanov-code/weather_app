/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Preferences` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[preferenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferenceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_preferenceId_key" ON "User"("preferenceId");

-- RenameIndex
ALTER INDEX "userId_idx" RENAME TO "unique_user_preference_idx";
