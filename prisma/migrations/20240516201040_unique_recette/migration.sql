/*
  Warnings:

  - A unique constraint covering the columns `[id_enfant1,id_enfant2,id_parent]` on the table `recette` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uq_recette" ON "recette"("id_enfant1", "id_enfant2", "id_parent");
