import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../constants';

function useCategoryPost(slug) {
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${apiUrl}/api/news_categories/${slug}`,
                );
                setCategory(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [slug]);
    return { category };
}

export default useCategoryPost;
