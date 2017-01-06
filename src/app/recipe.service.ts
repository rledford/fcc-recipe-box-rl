import { Injectable } from '@angular/core';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {

  storage = null;
  recipes = new Array<Recipe>();
  storageName = 'fcc-recipe-box-rledford';
  tmp: Recipe[] = [
    new Recipe('some recipe 1'),
    new Recipe('some other recipe 2')
  ];

  constructor() {
    this.storage = window.localStorage;
  }

  getRecipes (): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      if (this.storage === null) {
        reject('no localStorage');
      }
      let recipeText = this.storage.getItem(this.storageName);
      if (!recipeText) {
        console.log('no recipe text found in local storage');
        console.log('creating localStorage: ' + this.storageName);
        this.storage.setItem('fcc-recipe-box-rledford', JSON.stringify({recipeList: [new Recipe(
          'Pancakes', '1 1/2 Cup - Flour, 3 1/2 tsp - Baking Powder, 1 tsp - Salt, 1 tbsp - Sugar, 1 1/4 Cup - Milk, 1 Egg, 3 tbsp - Butter (Melted)',
          'Preheat pan or skillet to 375 F / 190 C.\n\nMix the wet and dry ingredients in a mixing bowl. Pour desired portions of the batter onto the pan. Let the batter sit on one side until bubbles appear and start to pop at the top. Flip the pancake over to the other side and let sit for 20 to 30 seconds. Remove from pan and serve.\n\nEnjoy!'
        )]}));
      }
      this.recipes = JSON.parse(this.storage.getItem(this.storageName))['recipeList'];
      resolve(this.recipes);
    });
  }

  saveRecipes (): void {
    this.storage.setItem(this.storageName, JSON.stringify({recipeList: this.recipes}));
  }
}
