import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() edit: Boolean;
  @Output() saveChangesRequest: EventEmitter<Recipe> = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() deleteRequest = new EventEmitter();
  @Output() cancelEditRequest = new EventEmitter();

  editableRecipeName: string;

  constructor() { }

  onSaveChangesRequest (name, ingredients, instructions) {
    let recipe = new Recipe(name, ingredients, instructions);
    this.saveChangesRequest.emit(recipe);
  }

  onEditRequest () {
    this.editRequest.emit();
    this.editableRecipeName = this.recipe.name;
  }

  onCancelEditRequest () {
    this.cancelEditRequest.emit();
  }

  onDeleteRequest () {
    if (window.confirm(this.recipe.name + ': This recipe will be permanently deleted!')) {
      this.deleteRequest.emit();
    }
  }

  ngOnInit() {
    this.editableRecipeName = this.recipe.name;
  }

}
