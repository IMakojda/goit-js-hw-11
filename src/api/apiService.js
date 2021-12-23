const axios = require('axios').default;
import Notiflix from 'notiflix';

export default class NewsApiService{
    constructor(){
        this.searchQuery="";
        this.page=1;
    }

    async fetchImage() {
        const url = `https://pixabay.com/api/?key=24851883-9f712862249ea47cec284e68e&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        
        try {
        
        const response = await axios.get(url);
        const pictures=response.data;
        console.log(pictures);
        this.pageNext ();
        return pictures
        }
        
        catch (error) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        document.querySelector('.load-more').style.display="none";    
        
        }
    }

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery=newQuery
    }

    pageNext (){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }
}



