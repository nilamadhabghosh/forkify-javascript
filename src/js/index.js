import Search from './models/Search';
import {elements, renderLoder , clearLoader} from './Views/base';
import Recipe from './models/Recipe';
import * as searchview from './Views/searchview';

const state = {};


/**
 * Search Controller
 */
const controlSearch = async () => {
    const query = searchview.getInput();

    if (query){

        state.search = new Search(query);

        searchview.clearInput();
        searchview.clearresults();
        renderLoder(elements.searchRes);
        
        try {
        await state.search.getResults();

        clearLoader();

        searchview.renderResults(state.search.result);
        // console.log(state.search.result);
        }
        catch(err)
        {
            console.log('something went wrong search view');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn)
    {
        const gotopage = parseInt(btn.dataset.goto ,10);
        searchview.clearresults();
        searchview.renderResults(state.search.result,gotopage);
        console.log(gotopage);
    }
})

/**
 * Recipe Controller
 */

const controlRecipe = async () => {

    const id = window.location.hash.replace('#','');
    console.log(id);

    if(id)
    {
       //Prepare UI for changes

       //Create new Recipe Object
       state.recipe = new Recipe(id);
       
       try{
       //Get recipe data
       await state.recipe.getRecipe();

       //Calculate serving and time
       state.recipe.calcTime();
       state.recipe.calcServing();
       }
       catch(err)
       {
           alert('Something went Wrong recipe data');
       }
       //Render Results
    }
}


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));