export default async function fetchImages(name, page) {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=31407151-553822a8b7d25cc0b7cb87592&q=${name}&image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=40`)
    const responseArray = await response.json();
    return responseArray;
  } catch {
    throw new Error(response.status)
}
}