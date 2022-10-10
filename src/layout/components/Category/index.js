import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import $ from 'jquery';

const cx = classNames.bind(styles);

function Category() {
    const [isFixed, setIsFixed] = useState(false);
    const [hideGoToTop, setHideGoToTop] = useState(true);

    const handleScrollTop = () => {
        //Sử dụng Jquery Animate
        $('html, body').animate({ scrollTop: 0 }, 500);
    };

    useEffect(() => {
        const handleSetFixed = () => {
            if (window.scrollY > 0) {
                setHideGoToTop(false);
            } else {
                setHideGoToTop(true);
            }
            if (window.scrollY > 104) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener('scroll', handleSetFixed);

        return () => window.removeEventListener('scroll', handleSetFixed);
    });
    return (
        <div className={cx('container', isFixed && 'fixed')}>
            <div className={cx('body')}>
                <ul className={cx('menu')}>
                    <li className={cx('item')}>Chè thái nguyên</li>
                    <li className={cx('item')}>Trà shan tuyết</li>
                    <li className={cx('item')}>Trà ô long</li>
                    <li className={cx('item')}>Trà thiết quan âm</li>
                    <li className={cx('item')}>Trà sen</li>
                    <li className={cx('item')}>Trà hoa nhài</li>
                    <li className={cx('item')}>Khay trà</li>
                    <li className={cx('item')}>Ấm chen</li>
                    <li className={cx('item')}>Hộp trà quà tặng</li>
                </ul>
            </div>
            <div
                className={cx('go-to-top', hideGoToTop && 'hide')}
                onClick={handleScrollTop}
            >
                <ExpandLessIcon className={cx('go-to-top-icon')} />
            </div>
            <a href="tel:0334541656" className={cx('phone')}>
                Hotline: 0334541656
                <div className={cx('phone-icon-wrapper')}>
                    <PhoneInTalkIcon className={cx('phone-icon')} />
                </div>
            </a>
        </div>
    );
}

export default Category;
