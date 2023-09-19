import axios from 'axios';

const API = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function getData(config) {
  const {data} = await API.get('', {
    params: {
      key: '39012362-7b13feeec5008368b0a5b12ec',
      ...config,
    },
  });

  return data;
}
