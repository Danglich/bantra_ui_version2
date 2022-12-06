import axios from 'axios';
import { useEffect, useState } from 'react';
import Feature from './components/Feature';
import SideBar from './components/SideBar';
import { CalendarOutlined } from '@ant-design/icons';
import { apiUrl } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import NotFound from '../../components/NotFound';

function Post() {
    const [posts, setPosts] = useState([]);
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState();

    useEffect(() => {
        document.title = 'Tin tức - Sự kiện';
    }, []);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (!slug) {
                    const posts = await axios.get(`${apiUrl}/post`);

                    setPosts(posts.data);
                    setIsLoading(false);
                } else {
                    const category = await axios.get(
                        `${apiUrl}/categoryPost/${slug}`,
                    );
                    setCategory(category.data[0]);
                    const posts = await axios.get(
                        `${apiUrl}/post/category/${category.data[0]._id}`,
                    );

                    setPosts(posts.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [slug]);

    return (
        <div className="mx-auto font-[500] text-[30px] text-slate-800 px-[12px] py-[20px] text-center xl:w-[1190px] max-xl:w-full">
            <h1 className="uppercase mb-[20px]">
                {category ? category.name : 'Tin tức sự kiện'}
            </h1>
            <div className="flex gap-[20px]">
                <div className="flex-[3.5] ">
                    {isLoading && <Spin size="large" />}
                    {!isLoading && (
                        <>
                            {posts.length > 0 ? (
                                <>
                                    <Feature posts={posts.slice(0, 5)} />
                                    <div className="mt-[20px]">
                                        {posts.slice(5).map((post) => (
                                            <Link
                                                to={`/cam-nang/${posts[0]?.category?.slug}/${posts[0]?._id}`}
                                                key={post._id}
                                                className="flex gap-[20px] py-[20px] border-b-[1px] border-[#ccc]"
                                            >
                                                <div className="flex-1 shrink-0  overflow-hidden group">
                                                    <img
                                                        className="w-full cursor-pointer group-hover:scale-[1.08] transition duration-700 ease-in-out"
                                                        alt=""
                                                        src={post?.thumb}
                                                    ></img>
                                                </div>
                                                <div className="flex-[1.5]">
                                                    <h3 className="font-bold text-[18px] text-left">
                                                        {post?.name}
                                                    </h3>
                                                    <span className="text-left block text-[14px] text-[300] text-[#006837] my-[8px] flex items-center">
                                                        <CalendarOutlined className="mr-[10px] text-[14px]" />
                                                        02/10/2021
                                                    </span>
                                                    <p className="text-left text-[15px] text-[#333]">
                                                        Bạn đang có nhu cầu tìm
                                                        mua loại trà Thái Nguyên
                                                        tại An Giang hàng chuẩn,
                                                        chất lượng cao? Hải Trà
                                                        Tân Cương chuyên bán Trà
                                                        Thái Nguyên ở An Giang
                                                        nước xanh thơm cốm, tiền
                                                        chát ngọt hậu
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <NotFound title="Không tìn thấy bài viết nào" />
                            )}
                        </>
                    )}
                </div>
                <div className="flex-1 max-lg:hidden">
                    <SideBar slugCategory={slug} />
                </div>
            </div>
        </div>
    );
}

export default Post;
