import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, loader } from './views/base'

/** Global state of app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};

// seach controller
const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    if(query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results (loading spinner or something)
        searchView.clearInput();
        searchView.clearResults();
        loader.render(elements.searchResult);

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render result on UI
        loader.clear();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultPages.addEventListener('click', e => {
    const button = e.target.closest('button');
    if(button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

// Recipe controller
// const recipe = new Recipe(686088);
// recipe.get();
// console.log(recipe);
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        // prepare ui
        loader.render(elements.recipe);

        // create new recipe
        state.recipe =  new Recipe(id);
        // window.r = state.recipe;
        try {
            // get recipe
            await state.recipe.get();
            
            // calculate servings and time
            state.recipe.calculateTime();
            state.recipe.calculateServings();
    
            // render recipe
            loader.clear();
            console.log(state.recipe);
        } catch (error) {
            alert(error);
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => { 
    console.log(event);
    window.addEventListener(event, controlRecipe) 
});



