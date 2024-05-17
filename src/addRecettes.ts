import { PrismaClient, type Craft } from "@prisma/client";
import type { Data } from "./types";
import data from "./data.json";
import { craftSchema } from "./zod/craftSchema";
import type { z } from "zod";

const prisma = new PrismaClient({ log: ["query"] });
const elements = (data as Data).recettes;

const addRecetteToDb = async (
  craft: z.infer<typeof craftSchema>,
  parent: Craft
) => {
  const [recipe1, recipe2] = await prisma.$transaction([
    prisma.craft.findUnique({
      where: {
        libelle: craft.recipe1.text,
      },
    }),

    prisma.craft.findUnique({
      where: {
        libelle: craft.recipe2.text,
      },
    }),
  ]);
  if (recipe1 && recipe2) {
    await prisma.recette.create({
      data: {
        id_enfant1: recipe1.id,
        id_enfant2: recipe2.id,
        id_parent: parent.id,
      },
    });
  }
};

async function main() {
  for (const craftKey in elements) {
    const crafts = elements[craftKey];

    const parent = await prisma.craft.findUnique({
      where: {
        libelle: craftKey,
      },
    });

    console.log(parent);
    if (parent) {
      for (const craft of crafts) {
        const unsafeCraft = craftSchema.safeParse(craft);
        if (unsafeCraft.success) {
          try {
            await addRecetteToDb(unsafeCraft.data, parent);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(unsafeCraft.error.errors);
        }
      }
    }
  }
}
await main();
export default main;
