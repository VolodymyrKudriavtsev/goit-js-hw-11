const searchParams = new URLSearchParams({
  key: '31991210-5d8d315bab6d2995c6cf86716',
  q: 'cats',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  // page: 1,
  // per_page: 4,
});

export const fetchPhoto = () => {
  searchParams.set('q', 'searchBoxValue');
  return fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(data => console.log(data))
    .catch(error => error);
};