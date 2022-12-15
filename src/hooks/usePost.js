import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../constants';

function usePost(postId) {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/post/${postId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return useQuery(['post', postId], fetchData);
}

export default usePost;
