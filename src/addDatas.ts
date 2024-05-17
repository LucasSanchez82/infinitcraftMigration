import { PrismaClient } from "@prisma/client";
import datajson from "./databru.json";
type Data = typeof datajson;

const prisma = new PrismaClient({ log: ["query"] });
const datas = datajson.element_data.elements;

async function main() {
  for (const element of datas) {
    try {
      await prisma.craft.create({
        data: {
          discovered: element.discovered,
          libelle: element.text,
          emoji: element.emoji,
        },
      });
    } catch (error) {
      console.log(`${element.text} - ${element.emoji}`);
    }
  }
}
await main()
export default main;