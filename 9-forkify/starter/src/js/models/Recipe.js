import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async get() {
        try {
            const result = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            alert(error);
            throw error;
        }
    }

    calculateTime() {
        const ingredientCount = this.ingredients.length;
        const periods = Math.ceil(ingredientCount / 3); // three ingredients = 1 period
        this.time = periods * 15;        
    }

    calculateServings() {
        this.servings = 4;
    }
}