import { Ingredient } from './ingredient';

export class Recipe {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;

  constructor (name = 'New Recipe', ingredients = '', instructions = '') {
    this.id = Date.now();
    this.name = name;
    this.ingredients =  ingredients;
    this.instructions = instructions;
  }
}
