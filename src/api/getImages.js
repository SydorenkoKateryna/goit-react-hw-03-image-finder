import axios from 'axios';

const getImages = async (search, page) => {
  const params = new URLSearchParams({
    key: '34807421-5d72157add84c9708a89e40b8',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });

  const response = await axios.get(
    `https://pixabay.com/api/?${params.toString()}`
  );

  if (response.status !== 200) {
    throw new Error(response.status);
  }

  return response;
};

export default getImages;
