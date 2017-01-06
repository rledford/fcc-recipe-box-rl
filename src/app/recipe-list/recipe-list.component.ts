import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Array<Recipe>;
  @Input() selectedRecipe: Recipe;
  @Output() recipeClicked: EventEmitter<Recipe> = new EventEmitter();

  constructor() { }

  onClickRecipe (recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }

  ngOnInit() {

  }
}
