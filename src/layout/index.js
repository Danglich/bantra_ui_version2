import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import Category from './components/Category';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

function Layout() {
    return (
        <div className={cx('container')}>
            <Header />
            <Category />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
