import fetchImages from "./fetchImages";
import { Notify } from 'notiflix';
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

async function onSubmit(e) {
  e.preventDefault()
      loadMoreBtn.classList.add('hide')
  if (e.currentTarget.searchQuery.value === "") {
    Notify.warning("please type some words in the search box")
    gallery.innerHTML = ""
  } else {
      try {
        page = 1
        name = e.currentTarget.searchQuery.value
        const picturesData = await fetchImages(name, page)
        if (picturesData.hits.length === 0) {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.")
          gallery.innerHTML = ""
        } else {
          loadImages(picturesData)
          Notify.success(`Hooray! We found ${picturesData.totalHits} images.`)
        }
    } catch (error) {
      console.log(error)
    }
  }
}

loadMoreBtn.addEventListener("click", loadMoreFunc)

async function loadMoreFunc(e) {
  e.preventDefault()
  try {
    page += 1
    const picturesData = await fetchImages(name, page)
    if (gallery.childNodes.length === picturesData.totalHits) {
      loadMoreBtn.classList.add('hide')
      Notify.info("We're sorry, but you've reached the end of search results.")
    } else {
      loadMoreImages(picturesData)
    }
    
  } catch (error) {
    console.log(error)
  }

}

function loadImages(arrayImages) {
    const markup = createMarkup(arrayImages)
  gallery.innerHTML = markup
  lightbox.refresh()
  if (!(arrayImages.totalHits < 40)){  loadMoreBtn.classList.remove('hide')}
}

function loadMoreImages(arrayImages) {
  const markup = createMarkup(arrayImages)
    gallery.insertAdjacentHTML('beforeend', markup)
  lightbox.refresh()
  // gallery.childNodes.length < 500 ?
}


function createMarkup(arrayImages) {
  return arrayImages.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
}