import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../acsset/images/logo.png';
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
import ModalLogin from './ModalLogin';
import { AuthContext } from '../../../contexts/AuthContext';
import { message } from 'antd';

const cx = classNames.bind(styles);

function Header() {
    const { totalQuantities, showCart, toggleShowCart } =
        useContext(CartContext);

    const { user, logout } = useContext(AuthContext);
    const [isShowUserDetail, setIsShowUserDetail] = useState(false);

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalLogin, setIsShowModalLogin] = useState(false);

    const closeModalLogin = () => {
        setIsShowModalLogin(false);
    };

    const handleToggleShowModal = useCallback(() => {
        setIsShowModal(!isShowModal);
    }, [isShowModal, setIsShowModal]);

    const handleLogout = () => {
        logout();
        message.success('Đã đăng suất!');
        window.location.reload();
    };

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
                            {!user ? (
                                <div onClick={() => setIsShowModalLogin(true)}>
                                    <img
                                        className="w-[32px] h-[32px]"
                                        alt="avatar"
                                        src="https://www.shutterstock.com/shutterstock/photos/1153673752/display_1500/stock-vector-profile-placeholder-image-gray-silhouette-no-photo-1153673752.jpg"
                                    ></img>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        onClick={() =>
                                            setIsShowUserDetail(
                                                !isShowUserDetail,
                                            )
                                        }
                                        alt="avatar"
                                        className="w-[32px] h-[32px] rounded-full"
                                        src={
                                            user?.imageUrl ||
                                            'https://www.shutterstock.com/shutterstock/photos/1153673752/display_1500/stock-vector-profile-placeholder-image-gray-silhouette-no-photo-1153673752.jpg'
                                        }
                                    ></img>
                                    <div
                                        className={`${
                                            isShowUserDetail
                                                ? 'block'
                                                : 'hidden'
                                        } bg-white z-[1] absolute shadow-md top-[34px] left-[-16px] rounded-[4px] min-w-[230px]`}
                                    >
                                        <p className="font-bold bg-[#ccc] px-[12px] py-[8px]">
                                            {user.email}
                                        </p>
                                        <ul
                                            onClick={() =>
                                                setIsShowUserDetail(
                                                    !isShowUserDetail,
                                                )
                                            }
                                        >
                                            <li className=" px-[12px] hover:text-[#38761d] py-[8px] border-b-[1px] border-[#ccc]">
                                                <Link to={'/thanh-vien'}>
                                                    Thông tin tài khoản
                                                </Link>
                                            </li>
                                            <li className=" px-[12px] hover:text-[#38761d] py-[8px] border-b-[1px] border-[#ccc]">
                                                <Link
                                                    to={
                                                        '/thanh-vien/quan-ly-don-hang'
                                                    }
                                                >
                                                    Quản lý đơn hàng
                                                </Link>
                                            </li>
                                            <li className=" px-[12px] hover:text-[#38761d] py-[8px] border-b-[1px] border-[#ccc]">
                                                <Link
                                                    to={'/thanh-vien/danh-gia'}
                                                >
                                                    Đánh giá
                                                </Link>
                                            </li>
                                            <li className=" px-[12px] hover:text-[#38761d] py-[8px] border-b-[1px] border-[#ccc]">
                                                <Link
                                                    to={
                                                        '/thanh-vien/doi-mat-khau'
                                                    }
                                                >
                                                    Đổi mật khẩu
                                                </Link>
                                            </li>
                                            <li
                                                onClick={handleLogout}
                                                className=" px-[12px] hover:text-[#38761d] py-[8px] border-b-[1px] border-[#ccc]"
                                            >
                                                Đăng xuất
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <ModalLogin
                                isOpen={isShowModalLogin}
                                closeModal={closeModalLogin}
                            />
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
