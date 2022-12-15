import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';
import numeral from 'numeral';
import { useContext } from 'react';
import { LastViewContext } from '../../contexts/LastViewContext';
import { CartContext } from '../../contexts/CartContext';

const cx = classNames.bind(styles);

function ProductItem({ isSlider, product, border }) {
    const { handleAddLastView } = useContext(LastViewContext);
    const { onAdd } = useContext(CartContext);

    const handleClickDetailProduct = (product) => {
        handleAddLastView(product);
    };

    const handleAddToCart = () => {
        onAdd(product, 1);
    };

    return (
        <div
            className={
                isSlider
                    ? ''
                    : 'w-[25%] max-sm:w-[50%] max-sm:mt-[16px] mb-[16px]'
            }
        >
            <Link
                to={`/product/${product?._id}`}
                className={cx(
                    'main-container',
                    isSlider && 'slider',
                    border && 'border',
                )}
                onClick={() => {
                    handleClickDetailProduct(product);
                }}
            >
                <div className={cx('container')}>
                    <img
                        src={
                            product?.thumb ||
                            'https://haitratancuong.com/vnt_upload/product/12_2021/thumbs/300__hop-tra-non-am-250g-1.jpg'
                        }
                        alt=""
                    ></img>
                    <span className={cx('title')}>
                        {product?.name ||
                            'Trà Đinh Thượng Hạng 1 tôm Sạch Vietgap, Trà Cổ Vị Truyền Thống'}
                    </span>
                    <span className={cx('price')}>
                        {numeral(product?.price * 1000).format('0,0')}đ
                    </span>

                    <div className={cx('action-container')}>
                        <Link
                            to={`/product/${product?._id}`}
                            className={cx('btn', 'more')}
                            onClick={() => {
                                handleClickDetailProduct(product);
                            }}
                        >
                            Chi tiết
                        </Link>
                        <Link
                            to="/pay"
                            onClick={handleAddToCart}
                            className={cx('btn', 'buy')}
                        >
                            Mua ngay
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProductItem;
