/*
  Warnings:

  - A unique constraint covering the columns `[libelle]` on the table `craft` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "craft_libelle_key" ON "craft"("libelle");
