import fetchImages from "./fetchImages";

console.log("hello")

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionPosition: "bottom", captionDelay: 250 });

const searchForm = document.querySelector(".search-form")
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
    // loadMoreBtn.style.display = 'none'

let page 
let name 

searchForm.addEventListener("submit", onSubmit)

function onSubmit(e) {
    e.preventDefault()
    loadMoreBtn.classList.add('hide')
    page = 1
    name = e.currentTarget.searchQuery.value
    fetchImages(name, page).then((arrayImages) => loadImages(arrayImages))
        .catch((error) => console.log(error))
}

loadMoreBtn.addEventListener("click", loadMoreFunc)

function loadMoreFunc(e) {
    e.preventDefault()
        page += 1
        fetchImages(name, page).then((arrayImages) => loadMoreImages(arrayImages))
            .catch((error) => console.log(error))
}

function loadImages(arrayImages) {
    const markup = arrayImages.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__link" href="${largeImageURL}">
        <div class="gallery__item">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`
    }).join("");
    gallery.innerHTML = markup
        loadMoreBtn.classList.remove('hide')
// gallery.insertAdjacentHTML("beforeend", markup)
}

function loadMoreImages(arrayImages) {
    const markup = arrayImages.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__link" href="${largeImageURL}">
        <div class="gallery__item">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div></a>`
    }).join("");
    gallery.insertAdjacentHTML('beforeend', markup)
    lightbox.refresh()
// gallery.insertAdjacentHTML("beforeend", markup)
}


