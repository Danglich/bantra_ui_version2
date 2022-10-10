import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../acsset/images/logo.png';
import user from '../../../acsset/images/user.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('container')}>
            <div className={cx('body')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={cx('search-container')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập từ khóa"
                    ></input>
                    <div className={cx('search-icon-container')}>
                        <SearchIcon className={cx('search-icon')} />
                    </div>
                </div>
                <ul className={cx('menu')}>
                    <li className={cx('item')}>Giới thiệu</li>
                    <li className={cx('item')}>Cẩm nang</li>
                    <li className={cx('item')}>Liên hệ</li>
                    <li className={cx('item', 'user')}>
                        <img alt="avatar" src={user}></img>
                    </li>
                </ul>
                <div className={cx('phone-container')}>
                    <span className={cx('phone')}>Hot line : 0358864002</span>
                    <span className={cx('title')}>Tư vấn báo giá</span>
                </div>
                <div className={cx('cart')}>
                    <ShoppingCartIcon className={cx('icon')} />
                    <span className={cx('quantity')}>0</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
