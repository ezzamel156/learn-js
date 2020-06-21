import Search from './models/Search';

/** Global state of app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = 'steak';
    if(query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results (loading spinner or something)

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render result on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


