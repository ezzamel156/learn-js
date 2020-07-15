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
            this.parseIngredients();
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

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']

        const newIngredients = this.ingredients.map(el => {
            // 1) uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) reform parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) parse ingredients into count, unit and ingredient
            const arrayIngredient = ingredient.split(' ');
            const unitIndex = arrayIngredient.findIndex(el2 => units.includes(el2));

            let objIngredient;
            if (unitIndex > -1) {
                // there's a unit
                // ex. 4 1/2 cups, arrayCount is [4, 1/2]
                const arrayCount = arrayIngredient.slice(0, unitIndex);

                let count;
                if (arrayCount.length === 1) {
                    count = eval(arrayCount[0].replace('-', '+'));
                } else {
                    count = eval(arrayCount.join('+'));
                }
                objIngredient = {
                    count,
                    unit: arrayIngredient[unitIndex],
                    ingredient : arrayIngredient.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(arrayIngredient[0], 10)) {
                // no unit but first element is a number
                objIngredient = {
                    count: parseInt(arrayIngredient[0], 10),
                    unit: '',
                    ingredient: arrayIngredient.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // no unit and no first element number
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        
        this.ingredients.forEach(ingredient => {
            ingredient.count *= newServings / this.servings;
        })
        this.servings = newServings;
    }
}