import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('container')}>
            <div className={cx('logo')}></div>
            <div className={cx('search-container')}></div>
            <ul className={cx('menu')}>
                <li className={cx('item')}>Giới thiệu</li>
                <li className={cx('item')}>Khách sỉ</li>
                <li className={cx('item')}>Cẩm nang</li>
                <li className={cx('item')}>Liên hệ</li>
                <li className={cx('item', 'user')}></li>
            </ul>
            <div className={cx('phone')}></div>
            <div className={cx('cart')}></div>
        </div>
    );
}

export default Header;
