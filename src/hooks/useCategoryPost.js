import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function useCategoryPost(slug) {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/categoryPost/${slug}`);
            return data[0];
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['categoryPost', slug], fetchData);
}

export default useCategoryPost;
