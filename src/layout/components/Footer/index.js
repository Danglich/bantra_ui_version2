import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import trans from '../../../acsset/images/trans.jpg';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('container')}>
            <div className={cx('body')}>
                <div className={cx('box')}>
                    <h1 className={cx('title')}>Hải trà tân cương</h1>
                    <ul className={cx('list')}>
                        <li className={cx('item')}>Về Hải Trà Tân Cương</li>
                        <li className={cx('item')}>Tầm nhìn - Sứ mệnh</li>
                        <li className={cx('item')}>Sứ mệnh lịch sử</li>
                        <li className={cx('item')}>
                            Chứng nhận và giải thưởng
                        </li>
                        <li className={cx('item')}>
                            Chính sách bảo mật thông tin
                        </li>
                    </ul>
                </div>
                <div className={cx('box')}>
                    <h1 className={cx('title')}>Hỗ trợ khách hàng</h1>
                    <ul className={cx('list')}>
                        <li className={cx('item')}>Hướng dẫn mua hàng</li>
                        <li className={cx('item')}>Hướng dẫn thanh toán</li>
                        <li className={cx('item')}>Đổi trả sản phẩm</li>
                        <li className={cx('item')}>Giao hàng</li>
                        <li className={cx('item')}>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                <div className={cx('box')}>
                    <h1 className={cx('title')}>Thông tin liên hệ</h1>
                    <ul className={cx('list')}>
                        <li className={cx('item')}>0312345678</li>
                        <li className={cx('item')}>nguyenvananh@gmail.com</li>
                    </ul>
                </div>
                <div className={cx('box')}>
                    <h1 className={cx('title')}>Đơn vị vận chuyển</h1>
                    <ul className={cx('list')}>
                        <li className={cx('item')}>
                            <img src={trans} alt=""></img>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
