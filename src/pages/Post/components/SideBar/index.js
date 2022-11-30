import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../../../constants';
import { CaretRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SideBar({ hiddenNav, slugCategory }) {
    const [categorys, setCategorys] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            try {
                const categorys = await axios.get(`${apiUrl}/categoryPost`);
                const posts = await axios.get(`${apiUrl}/post/top`);
                setCategorys(categorys.data);
                setPosts(posts.data);
            } catch (error) {
                console.log(error);
                setCategorys([]);
            }
        };

        if (!isCacled) {
            fetchData();
        }
    }, []);

    return (
        <div className="sticky top-[0]">
            <ul className={hiddenNav && 'hidden'}>
                {categorys.map((category) => (
                    <Link key={category._id} to={`/cam-nang/${category.slug}`}>
                        <li
                            className={cx(
                                'flex items-center mb-[8px] justify-between text-left cursor-pointer text-[15px] px-[12px] py-[10px] rounded-[6px] hover:bg-[#006837] hover:text-white',
                                slugCategory === category.slug && 'active',
                            )}
                        >
                            {category.name}
                            <CaretRightOutlined />
                        </li>
                    </Link>
                ))}
            </ul>
            <h1 className="uppercase font-[600] text-[22px] mb-[16px]  pt-[32px] text-left">
                Tin xem nhiều
            </h1>
            <div>
                <div className="w-full overflow-hidden group">
                    <img
                        src={posts[0]?.thumb}
                        alt="ảnh"
                        className="w-full cursor-pointer group-hover:scale-[1.08] transition duration-700 ease-in-out"
                    ></img>
                </div>
                <Link
                    to={`/cam-nang/${posts[0]?.category?.slug}/${posts[0]?._id}`}
                >
                    <p className="text-left text-[15px] mt-[14px] font-[600] mb-[16px]">
                        {posts[0]?.name}
                    </p>
                </Link>
                <ul>
                    {posts.slice(1).map((post) => (
                        <Link
                            key={post._id}
                            to={`/cam-nang/${post?.category?.slug}/${post?._id}`}
                        >
                            <li className="text-left text-[#000] hover:text-[#006837] text-[15px] py-[10px] border-t-[1px] boder-t-[#ccc]">
                                {post?.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
