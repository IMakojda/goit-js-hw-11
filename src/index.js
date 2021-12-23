import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from "./api/apiService";

import Notiflix from 'notiflix';

const newsApi= new NewsApiService();

const refs ={
    form:document.getElementById('search-form'),
    loadMore:document.querySelector('.load-more'),
    gallery:document.querySelector('.gallery'),
    
}
refs.loadMore.style.display="none";
refs.form.addEventListener('submit',onSearch);
refs.loadMore.addEventListener('click',onLoadMore);

function onSearch (e){
    e.preventDefault();
    clearArticles ();
    refs.loadMore.style.display="none";
    newsApi.query=e.currentTarget.searchQuery.value;
    if(newsApi.query===''){
     return errorShow()
    }
    newsApi.resetPage();
    newsApi.fetchImage().then(({hits,totalHits })=>{
      if(totalHits === 0){return errorShow()}
      appendArticlesMarkup(hits)
      showTotalImage(totalHits)
      lazyScroll(0)
      refs.loadMore.style.display="flex"
    });
}

function onLoadMore (){
    newsApi.fetchImage().then(({hits})=>{appendArticlesMarkup(hits)});
    lazyScroll(0)
}

function appendArticlesMarkup(articles){

refs.gallery.insertAdjacentHTML('beforeend',addCardImage(articles));
const lightbox = new SimpleLightbox('.gallery a');

}

function addCardImage(card){
    return card.map(el=>`
  <div class="photo-card">
    <div class='imageThumb'>
      <a href="${el.largeImageURL}" class='link'>
        <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width="400px" heigth="270px" class='img'/>
      </a>
    </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> <br>${el.likes}
        </p>
        <p class="info-item">
          <b>Views</b> <br>${el.views}
        </p>
        <p class="info-item">
          <b>Comments</b> <br>${el.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> <br>${el.downloads}
        </p>
      </div>
  </div>`)
}

function clearArticles (){
    refs.gallery.innerHTML = '';
}

function errorShow(){
  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function showTotalImage(total){
  Notiflix.Notify.success(`"Hooray! We found ${total} images."`);
}

function lazyScroll(a){
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * a,
  behavior: "smooth",
});
}