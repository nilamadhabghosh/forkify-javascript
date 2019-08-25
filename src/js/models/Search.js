import axios from 'axios';

export default class Search {
    constructor(query){
        this.query =query;
    }

    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'fd1317355cf8be69949efe698486a3f4';
         
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.results);
        }
        catch(error){
            alert(error);
        }
        
        
    }
}
