import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function useList(categoryId, type) {
    const fetchData = async () => {
        if (!categoryId) {
            return [];
        }
        try {
            const { data } = await axios.get(
                `${apiUrl}/product?categoryId=${categoryId}&&type=${
                    type || ''
                }`,
            );
            return data || [];
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['list', categoryId, type], fetchData);
}

export default useList;
