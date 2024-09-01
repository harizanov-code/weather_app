/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- DropIndex
DROP INDEX "User_preferenceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferenceId";

-- DropTable
DROP TABLE "Preferences";

-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "searchedTown" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE INDEX "unique_user_preference_idx" ON "Preference"("userId");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
