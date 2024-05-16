/*
  Warnings:

  - Added the required column `discovered` to the `craft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji` to the `craft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `libelle` to the `craft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "craft" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discovered" BOOLEAN NOT NULL,
ADD COLUMN     "emoji" TEXT NOT NULL,
ADD COLUMN     "libelle" TEXT NOT NULL;
