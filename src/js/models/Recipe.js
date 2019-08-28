import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }


async getRecipe() {
      try{
         const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
         this.title = res.data.recipe.title;
         this.author = res.data.recipe.publisher;
         this.img = res.data.recipe.image_url;
         this.url = res.data.recipe.f2f_url;
         this.ingredients = res.data.recipe.ingredients;
         console.log(res);
      } 
      catch(error)
      {
          alert(error);
      }
}

calcTime(){
    // assume 15 min for 3 ingredients
    const numIng = this.ingredients.length;
    const period = Math.ceil(numIng/3);
    this.time = period * 15;
}

calcServing(){
    this.serving = 4;
}

parseIngredients(){
    
    const unitsLong = ['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
    const unitShort = ['tbsp','tbsp','oz','oz','cup','pound'];
    const newIngredients = this.ingredients.map( el => {

        //Uniform Units

        //Remove Parenthesis

        //parse Ingredients
    });

    this.ingredients = newIngredients;
}

}