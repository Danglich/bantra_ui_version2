import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import Slider from 'infinite-react-carousel';
import ProductItem from '../ProductItem';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateBefore';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function Slide({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [slidesToShow, setSlidesToShow] = useState(5);

    useEffect(() => {
        if (window.innerWidth < 640) {
            setSlidesToShow(2);
        }
        if (window.innerWidth < 768 && window.innerHeight > 640) {
            setSlidesToShow(3);
        } else {
            setSlidesToShow(5);
        }
        const onResize = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(2);
            }
            if (window.innerWidth < 768 && window.innerHeight > 640) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(5);
            }
        };
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const products = await axios.get(
                    `${apiUrl}/product?categoryId=${categoryId}`,
                );
                setProducts(products.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [categoryId]);

    if (isLoading)
        return (
            <div className="flex items-center justify-center my-[20px]">
                <Spin size="large" />
            </div>
        );

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>{products[0]?.category?.name}</h1>
            <div className={cx('slider-container')}>
                <Slider
                    adaptiveHeight
                    autoplay
                    slidesPerRow={1}
                    slidesToShow={slidesToShow}
                    prevArrow={
                        <button
                            style={{
                                backgroundColor: '#38761d',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: `calc(50% - 21px)`,
                            }}
                        >
                            <NavigateBeforeIcon className={cx('btn-icon')} />
                        </button>
                    }
                    nextArrow={
                        <button
                            style={{
                                backgroundColor: '#38761d',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: `calc(50% - 21px)`,
                                right: '0',
                                transform: `rotate3d(0, 0, 1, 180deg)`,
                            }}
                        >
                            <NavigateNextIcon className={cx('btn-icon')} />
                        </button>
                    }
                    className={cx('slider')}
                >
                    {products.map((product) => (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isSlider
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Slide;
