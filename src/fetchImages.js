export default function fetchImages(name, page) {
    return fetch(`https://pixabay.com/api/?key=31407151-553822a8b7d25cc0b7cb87592&q=${name}&image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=40`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
            }
      return response.json();
    }
  )
}