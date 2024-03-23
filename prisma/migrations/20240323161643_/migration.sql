/*
  Warnings:

  - You are about to drop the column `categoryId` on the `UserCategoryLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserCategoryLink` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserCategoryLink_userId_categoryId_key";

-- AlterTable
ALTER TABLE "UserCategoryLink" DROP COLUMN "categoryId",
ADD COLUMN     "categoryList" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "UserCategoryLink_userId_key" ON "UserCategoryLink"("userId");
