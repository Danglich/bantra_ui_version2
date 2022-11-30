import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constants';

function PostMore() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            try {
                const posts = await axios.get(`${apiUrl}/post/top`);
                setPosts(posts.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isCacled) {
            fetchData();
        }
        return () => (isCacled = true);
    }, []);
    return (
        <div className="w-full pt-[4px] mb-[16px] border-t-[1px] border-[#006837]">
            <h1 className="uppercase text-[18px] text-left text-[#006837]">
                Các tin khác
            </h1>
            <div className="flex flex-wrap mx-[-8px]">
                {posts.slice(0, 4).map((post) => (
                    <div
                        key={post._id}
                        className="w-[25%] px-[8px] max-sm:w-[50%]"
                    >
                        <Link
                            to={`/cam-nang/${posts[0]?.category?.slug}/${posts[0]?._id}`}
                        >
                            <div className="w-full overflow-hidden group">
                                <img
                                    className="w-full group-hover:scale-[1.08] transition duration-700 ease-in-out"
                                    alt="Ảnh"
                                    src={post.thumb}
                                ></img>
                            </div>
                            <h5 className="mt-[10px] text-left font-bold">
                                {post.name}
                            </h5>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostMore;
