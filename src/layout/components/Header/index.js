import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../acsset/images/logo.png';
import user from '../../../acsset/images/user.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import Cart from '../../../components/Cart';
import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { useCallback } from 'react';
import ModalCategory from '../../../components/ModalCategory';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const { totalQuantities, showCart, toggleShowCart } =
        useContext(CartContext);

    const [isShowModal, setIsShowModal] = useState(false);

    const handleToggleShowModal = useCallback(() => {
        setIsShowModal(!isShowModal);
    }, [isShowModal, setIsShowModal]);

    return (
        <div className="w-full border-b-[1px] border-[#d6d6d6]">
            <div className="flex items-center mx-auto my-[10px] justify-between xl:w-[1190px] max-lg:px-[16px] max-lg:justify-between">
                <div
                    onClick={handleToggleShowModal}
                    className="hidden max-lg:block cursor-pointer"
                >
                    <MenuOutlined className={cx('list-icon')} />
                </div>

                <ModalCategory
                    isShowing={isShowModal}
                    toggle={handleToggleShowModal}
                />
                <Link to="/" className="mr-[70px] max-lg:mr-[0] ">
                    <img className="max-lg:w-[50px]" src={logo} alt="logo" />
                </Link>
                <div className="max-lg:hidden">
                    <form action="/search" className={cx('search-container')}>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Nhập từ khóa"
                            name="q"
                        ></input>
                        <button className={cx('search-icon-container')}>
                            <SearchIcon className={cx('search-icon')} />
                        </button>
                    </form>
                </div>
                <div className="max-lg:hidden">
                    <ul className={cx('menu')}>
                        <Link to="gioi-thieu">
                            <li className={cx('item')}>Giới thiệu</li>
                        </Link>
                        <Link to="/cam-nang">
                            <li className={cx('item')}>Cẩm nang</li>
                        </Link>
                        <Link to="/contact">
                            <li className={cx('item')}>Liên hệ</li>
                        </Link>
                        <li className={cx('item', 'user')}>
                            <img alt="avatar" src={user}></img>
                        </li>
                    </ul>
                </div>
                <div className="max-lg:hidden">
                    <div className={cx('phone-container')}>
                        <span className={cx('phone')}>
                            Hot line : 0358864002
                        </span>
                        <span className={cx('title')}>Tư vấn báo giá</span>
                    </div>
                </div>
                <div onClick={toggleShowCart} className={cx('cart')}>
                    <ShoppingCartIcon className={cx('icon')} />
                    <span className={cx('quantity')}>{totalQuantities}</span>
                </div>
                <Cart isShowing={showCart} toggle={toggleShowCart} />
            </div>

            <div className="hidden  xl:w-[1190px] max-lg:px-[16px] max-xl:block">
                <form action="/search" className="w-full my-[16px] relative">
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập từ khóa"
                        name="q"
                    ></input>
                    <div className={cx('search-icon-container')}>
                        <SearchIcon className={cx('search-icon')} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Header;
