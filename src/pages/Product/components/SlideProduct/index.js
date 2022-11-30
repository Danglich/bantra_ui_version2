import classNames from 'classnames/bind';
import styles from './SlideProduct.module.scss';
import Slider from 'infinite-react-carousel';
import ProductItem from '../../../../components/ProductItem';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateBefore';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SlideProduct({ products }) {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        if (window.innerWidth < 640 && window.innerHeight > 400) {
            setSlidesToShow(2);
        }
        if (window.innerWidth < 400) {
            setSlidesToShow(1);
        }
        if (window.innerWidth < 768 && window.innerHeight > 640) {
            setSlidesToShow(3);
        } else {
            setSlidesToShow(4);
        }
        const onResize = () => {
            if (window.innerWidth < 640 && window.innerHeight > 400) {
                setSlidesToShow(2);
            }
            if (window.innerWidth < 400) {
                setSlidesToShow(1);
            }
            if (window.innerWidth < 768 && window.innerHeight > 640) {
                setSlidesToShow(3);
            }
            if (window.innerWidth > 768) {
                setSlidesToShow(4);
            }
        };
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);
    return (
        <div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Sản phẩm cùng danh mục</h1>
                <div className={cx('slider-container')}>
                    <Slider
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
                                <NavigateBeforeIcon
                                    className={cx('btn-icon')}
                                />
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
                                isSlider
                                product={product}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default SlideProduct;
