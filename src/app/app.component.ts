import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

import { Recipe } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../960.css']
})
export class AppComponent implements OnInit {
  title = 'Recipe Box';
  recipes: Array<Recipe> = null;
  selectedRecipe: Recipe = null;
  editSelectedRecipe: Boolean = false;

  constructor (public storage: RecipeService) {
  }

  ngOnInit () {
    this.storage.getRecipes()
      .then( (recipes) => {
        console.log('got recipes');
        this.recipes = recipes;
        this.selectedRecipe = this.recipes[0];
      }, (error) => {
        console.log(error);
      });
  }

  onSelectRecipe (event: Recipe): void {
    if (event === this.selectedRecipe) { return; }
    console.log('selected recipe: ' + event.name);
    this.selectedRecipe = event;
    this.editSelectedRecipe = false;
  }

  onEditSelectedRecipe (): void {
    console.log('editing selected recipe');
    this.editSelectedRecipe = true;
  }

  onDeleteSelectedRecipe (): void {
    console.log('deleting selected recipe');
    let i = this.recipes.indexOf(this.selectedRecipe);
    if (i >= 0) {
      this.recipes.splice(i, 1);
      this.selectedRecipe = null;
    }

    this.storage.saveRecipes();
  }

  onSaveSelectedRecipeChanges (event: Recipe): void {
    console.log('saving changes to selected recipe');
    console.log(event);
    if (!/\S/.test(event.name)) {
      window.alert('Please provide a name for this recipe!');
      return;
    }
    this.selectedRecipe.name = event.name.trim();
    this.selectedRecipe.ingredients = event.ingredients.trim();
    this.selectedRecipe.instructions = event.instructions.trim();
    this.editSelectedRecipe = false;

    this.storage.saveRecipes();
  }

  onCancelEditRequest (): void {
    this.editSelectedRecipe = false;
  }

  addRecipe (): void {
    console.log('addRecipe');
    let name = prompt('Recipe Name', 'New Recipe');
    if (name) {
      name = name.trim();
      this.recipes.push(new Recipe(name));
      this.storage.saveRecipes();
      if (!this.editSelectedRecipe) {
        this.selectedRecipe = this.recipes[this.recipes.length - 1];
        this.editSelectedRecipe = true;
      }
    }
  }
}
