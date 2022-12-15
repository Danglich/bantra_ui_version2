import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function useProduct(productId) {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/product/${productId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['product', productId], fetchData);
}

export default useProduct;
