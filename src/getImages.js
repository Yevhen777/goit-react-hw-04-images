import axios from 'axios';

export const getImages = async (query, page) => {
  const myKey = '27696674-0a1668506489034d568e98c79';

  const res = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return res.data.hits;
};
