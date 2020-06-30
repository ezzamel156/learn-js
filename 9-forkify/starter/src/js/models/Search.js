import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {
        try {
            //destructuring
            const { 
                data : {
                    recipes
                }
            } = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = recipes;
            // console.log(this.recipes);
            // return recipes;
        } catch (error) {
            alert(error);
        }
    }
}