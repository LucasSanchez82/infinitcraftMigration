import { PrismaClient } from "@prisma/client";
import datajson from "./databru.json";
type Data = typeof datajson;

const prisma = new PrismaClient({ log: ["query"] });
const datas = datajson.element_data.elements;

async function main() {
  for (let i = 126; i < datas.length; i++) {
    try {
      await prisma.craft.create({
        data: {
          discovered: datas[i].discovered,
          libelle: datas[i].text,
          emoji: datas[i].emoji,
        },
      });
    } catch (error) {
      console.log(`${datas[i].text} - ${datas[i].emoji}`);
    }
  }
}

export default main;