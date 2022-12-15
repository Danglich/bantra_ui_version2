import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function useCategory(slug) {
    const fetchData = async () => {
        try {
            const { data } = slug
                ? await axios.get(`${apiUrl}/category/${slug}`)
                : await axios.get(`${apiUrl}/category`);

            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['category', slug], fetchData);
}

export default useCategory;
