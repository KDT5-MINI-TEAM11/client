import { BASE_API_URL } from '@/data/constants';
import axios from 'axios';

export default axios.create({
  baseURL: BASE_API_URL,
});
