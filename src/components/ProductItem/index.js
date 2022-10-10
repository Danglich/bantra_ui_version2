import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem() {
    return (
        <div className={cx('main-container')}>
            <div className={cx('container')}>
                <img
                    src="https://haitratancuong.com/vnt_upload/product/12_2021/thumbs/300__hop-tra-non-am-250g-1.jpg"
                    alt=""
                ></img>
                <span className={cx('title')}>
                    Trà Đinh Thượng Hạng 1 tôm Sạch Vietgap, Trà Cổ Vị Truyền
                    Thống
                </span>
                <span className={cx('price')}>250.000đ</span>

                <div className={cx('action-container')}>
                    <button className={cx('btn', 'more')}>Chi tiết</button>
                    <button className={cx('btn', 'buy')}>Mua ngay</button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
