import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'bbc69bd64bd24e5786a298814b5c8523',
  },
});
