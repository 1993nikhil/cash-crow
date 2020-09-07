import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
   {
      id: 'r1',
      title: 'Learn Market',
      imageUrl: 'https://image.shutterstock.com/image-photo/investing-stock-market-concept-gain-260nw-750493204.jpg',
     ingredients: ['Learn', 'Explore', 'Build', 'Grow']
   },
    {
      id: 'r2',
      title: 'Grow Money',
  imageUrl: 'https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/investment_660_083017023050.jpg',
     ingredients: ['Goal', 'Invest', 'Earn', 'Money']
   }
  ]; 
  constructor() { }
  getAllRecipes(){
    return [...this.recipes]
  }
  

  

  getRecipeByID(recipeId: string) {
    return {...
     this.recipes.find(recipe => {
      return recipe.id === recipeId;
       })
    };
     }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
         });
           }

 }
