import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function usePosts(categoryId) {
    const fetchData = async () => {
        try {
            const { data } = categoryId
                ? await axios.get(`${apiUrl}/post/category/${categoryId}`)
                : await axios.get(`${apiUrl}/post`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['posts', categoryId], fetchData);
}

export default usePosts;
