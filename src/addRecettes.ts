import { PrismaClient } from "@prisma/client";
import data from "./data.json";
import { craftSchema } from "./zod/craftSchema";
type Data = typeof data;
type Elements = Data["recettes"];
type ElementsKeys = keyof Elements;
type Craft = Elements[ElementsKeys];

const prisma = new PrismaClient({ log: ["query"] });
const elements = data.recettes;

async function main() {
  for (const craftKey in elements) {
    const crafts = elements[craftKey as ElementsKeys];

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
          const data = unsafeCraft.data;
          const [recipe1, recipe2] = await prisma.$transaction([
            prisma.craft.findUnique({
              where: {
                libelle: data.recipe1.text,
              },
            }),

            prisma.craft.findUnique({
              where: {
                libelle: data.recipe2.text,
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
        } else {
          console.log(unsafeCraft.error.errors);
        }
      }
    }
  }
}

export default main;