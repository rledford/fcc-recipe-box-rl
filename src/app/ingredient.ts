export class Ingredient {
  name: string;     // the name of the ingredient
  amount: string;   // the amount ie: '1 tsp'

  constructor (name = 'INGREDIENT', amount = '1 UNIT') {
    this.name = name;
    this.amount = amount;
  }
}
