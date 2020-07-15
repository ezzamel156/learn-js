import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, loader } from './views/base';

/** Global state of app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};
window.lol = 'lol';
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
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id) {
        // prepare ui
        recipeView.clearRecipe();
        loader.render(elements.recipe);

        // highlight selected result
        if(state.search) searchView.highlightSelected(id);

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            
        } catch (error) {
            alert(error);
        }
    }
}

const controlList = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(ingredient => {
        const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(item);
    })
}


const controlLike = () => {
    if(!state.likes) state.likes = new Likes();

    const { id:recipeId, title, author, img} = state.recipe;
    if(!state.likes.isLiked(recipeId)) {
        const like = state.likes.addLike(recipeId, title, author, img);
        likesView.toggleLikeBtn(true);
        likesView.renderLike(like);
    } else {
        state.likes.deleteLike(recipeId);
        likesView.toggleLikeBtn(false);
        likesView.deleteLike(recipeId);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

// window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => { 
    window.addEventListener(event, controlRecipe);
});

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const value = parseFloat(e.target.value);
        state.list.updateCount(id, value);
    }
})

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});







