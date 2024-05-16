import addDatas from './src/addDatas';
import addRecettes from './src/addRecettes';

async function main() {
    await addDatas();
    await addRecettes();
}