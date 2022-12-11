const axios = require('axios').default;

const searchParams = new URLSearchParams({
  key: '31991210-5d8d315bab6d2995c6cf86716',
  q: 'cats',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 4,
});

export async function fetchPhoto(query) {
  searchParams.set('q', query);
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
