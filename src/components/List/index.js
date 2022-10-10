import classNames from 'classnames/bind';
import styles from './List.module.scss';
import ProductItem from '../ProductItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const cx = classNames.bind(styles);

function List() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Chè thái nguyên</h1>
                <button className={cx('more-btn')}>
                    Xem tất cả
                    <ArrowRightIcon className={cx('right-icon')} />
                </button>
            </div>
            <div className={cx('list')}>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    );
}

export default List;
