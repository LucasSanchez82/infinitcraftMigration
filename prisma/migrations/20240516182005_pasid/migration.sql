-- CreateTable
CREATE TABLE "craft" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "pk_craft" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recette" (
    "id_enfant1" INTEGER NOT NULL,
    "id_enfant2" INTEGER NOT NULL,
    "id_parent" INTEGER NOT NULL,

    CONSTRAINT "recette_pkey" PRIMARY KEY ("id_enfant1","id_enfant2","id_parent")
);

-- CreateIndex
CREATE INDEX "i_fk_recette_craft" ON "recette"("id_enfant1");

-- CreateIndex
CREATE INDEX "i_fk_recette_craft1" ON "recette"("id_enfant2");

-- CreateIndex
CREATE INDEX "i_fk_recette_craft2" ON "recette"("id_parent");

-- AddForeignKey
ALTER TABLE "recette" ADD CONSTRAINT "fk_recette_craft" FOREIGN KEY ("id_enfant1") REFERENCES "craft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recette" ADD CONSTRAINT "fk_recette_craft1" FOREIGN KEY ("id_enfant2") REFERENCES "craft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recette" ADD CONSTRAINT "fk_recette_craft2" FOREIGN KEY ("id_parent") REFERENCES "craft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
