import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import $ from 'jquery';
import axios from 'axios';
import Skeleton from '../../../components/Skeleton';
import { Link, useLocation } from 'react-router-dom';
import { apiUrl } from '../../../constants';

const cx = classNames.bind(styles);

function Category() {
    const [hideGoToTop, setHideGoToTop] = useState(true);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { pathname } = useLocation();

    const handleScrollTop = () => {
        //Sử dụng Jquery Animate
        $('html, body').animate({ scrollTop: 0 }, 500);
    };

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(
                    `${apiUrl}/api/product_categories`,
                );
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        if (!isCancelled) {
            fetchData();
        }

        return () => (isCancelled = true);
    }, []);

    useEffect(() => {
        const handleSetFixed = () => {
            if (window.scrollY > 0) {
                setHideGoToTop(false);
            } else {
                setHideGoToTop(true);
            }
        };
        window.addEventListener('scroll', handleSetFixed);

        return () => window.removeEventListener('scroll', handleSetFixed);
    });
    return (
        <div className="max-lg:hidden">
            <div className={cx('container')}>
                <div className="lg:w-full lg:mx-[16px] xl:w-[1190px]">
                    <ul className={cx('menu')}>
                        {isLoading && <Skeleton type="category" count={8} />}
                        {categories.map((item) => (
                            <Link
                                className={`${
                                    pathname.includes(item.slug) &&
                                    'text-blue-800'
                                }`}
                                to={`/${item.slug}`}
                            >
                                <li className={cx('item')} key={item.slug}>
                                    {item.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div
                    className={cx('go-to-top', hideGoToTop && 'hide')}
                    onClick={handleScrollTop}
                >
                    <ExpandLessIcon className={cx('go-to-top-icon')} />
                </div>
                <a href="tel:0334541656" className={cx('phone')}>
                    Hotline: 0334541656
                    <div className={cx('phone-icon-wrapper')}>
                        <PhoneInTalkIcon className={cx('phone-icon')} />
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Category;
