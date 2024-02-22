import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../constants';

function usePosts(categoryId) {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = categoryId
                    ? await axios.get(
                          `${apiUrl}/api/news_categories/news/${categoryId}`,
                      )
                    : await axios.get(`${apiUrl}/api/news`);

                setLoading(false);
                setData(data);
            } catch (error) {
                setLoading(false);

                console.log(error);
            }
        };

        fetchData();
    }, [categoryId]);

    return { data, isLoading };
}

export default usePosts;
