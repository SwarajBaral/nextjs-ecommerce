/*
  Warnings:

  - The primary key for the `UserCategoryLink` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserCategoryLink" DROP CONSTRAINT "UserCategoryLink_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCategoryLink_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserCategoryLink_id_seq";
