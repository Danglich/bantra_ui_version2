import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../Post/components/SideBar';
import { apiUrl } from '../../constants';
import { useCallback } from 'react';
import { marked } from 'marked';
import styles from './PostDetail.module.scss';
import classNames from 'classnames/bind';
import PostMore from '../../components/PostMore';
import Rating from '../../components/Rate';

const cx = classNames.bind(styles);

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        document.title = post?.name;
    }, [post]);

    useEffect(() => {
        let isCacled = false;

        const fetchData = async () => {
            try {
                const product = await axios.get(`${apiUrl}/post/${id}`);
                setPost(product.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [id]);

    const descRef = useCallback(
        (node) => {
            if (node) {
                node.innerHTML = marked.parse(post?.content || '');
            }
        },
        [post],
    );

    const tbOfContentRef = useCallback(
        (node) => {
            if (node) {
                node.innerHTML = marked.parse(post?.tbOfContent || '');
            }
        },
        [post],
    );

    return (
        <div className="mx-auto font-[500] text-[30px] text-slate-800 py-[20px] text-center xl:w-[1190px] max-xl:w-full">
            <div className="bg-[#f6f6f6] w-full flex items-center justify-center mb-[22px]">
                <ul className="flex">
                    <li
                        className={cx(
                            'link-item',
                            post?.category?.name === 'Văn hóa' && 'active',
                        )}
                    >
                        <Link
                            className=" px-[16px] py-[12px] hover:text-[#006837] block text-[#333] font-[400]"
                            to={`/cam-nang/van-hoa`}
                        >
                            Văn hóa
                        </Link>
                    </li>
                    <li
                        className={cx(
                            'link-item',
                            post?.category?.name === 'Trà' && 'active',
                        )}
                    >
                        <Link
                            className=" px-[16px] py-[12px] hover:text-[#006837] block text-[#333] font-[400]"
                            to={`/cam-nang/tra`}
                        >
                            Trà
                        </Link>
                    </li>
                    <li
                        className={cx(
                            'link-item',
                            post?.category?.name === 'Dịch vụ' && 'active',
                        )}
                    >
                        <Link
                            className=" px-[16px] py-[12px] hover:text-[#006837] block text-[#333] font-[400]"
                            to={`/cam-nang/dich-vu`}
                        >
                            Dịch vụ
                        </Link>
                    </li>
                    <li
                        className={cx(
                            'link-item',
                            post?.category?.name === 'Tin tức ngành chè' &&
                                'active',
                        )}
                    >
                        <Link
                            className=" px-[16px] py-[12px] hover:text-[#006837] block text-[#333] font-[400]"
                            to={`/cam-nang/tin-tuc-nganh-che`}
                        >
                            Tin tức ngành chè
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-[32px] max-lg:block max-lg:px-[16px] max-xl:px-[16px]">
                <div className="flex-[3.5] ">
                    <h1 className="text-[30px] font-[500] text-left max-md:text-[26px]">
                        {post?.name}
                    </h1>
                    <div className="max-w-[420px] my-[16px] bg-[#e6ece9] border-[1px] border-[#ccc] rounded-[4px]">
                        <div className="px-[12px] py-[8px] border-b-[1px] border-[#dedede]">
                            <h1 className="font-[500] text-[17px] text-left">
                                Mục lục
                            </h1>
                        </div>
                        <div
                            className={cx('tbOfContent-container')}
                            ref={tbOfContentRef}
                        ></div>
                    </div>
                    <div
                        className={cx('content-container')}
                        ref={descRef}
                    ></div>
                    <div className="flex mb-[28px]">
                        <a
                            target="_blank"
                            href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
                            className="mr-[12px]"
                            rel="noreferrer"
                        >
                            <img
                                alt="Facebook"
                                src="https://haitratancuong.com/modules/news/images/share_fac.png"
                            ></img>
                        </a>
                        <a
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                            className="mr-[12px]"
                            rel="noreferrer"
                        >
                            <img
                                alt="Facebook"
                                src="https://haitratancuong.com/modules/news/images/share_twi.png"
                            ></img>
                        </a>
                    </div>
                    <PostMore />
                    <Rating title="Đánh giá bài viết" />
                </div>
                <div className="flex-1 max-lg:hidden">
                    <SideBar hiddenNav />
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
