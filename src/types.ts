export interface Data {
    recettes: { [key: string]: Recette[] };
}

export interface Recette {
    recipe1: Recipe;
    recipe2: Recipe;
}

export interface Recipe {
    text:       string;
    emoji:      string;
    discovered: boolean;
}
