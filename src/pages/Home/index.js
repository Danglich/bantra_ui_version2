import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import tra from '../../acsset/images/tra.jpg';
import slide1 from '../../acsset/images/slide1.png';
import slide2 from '../../acsset/images/slide2.png';
import List from '../../components/List';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('image')}>
                <img src={tra} alt="img" className={cx('img-background')}></img>
                <div className={cx('image-slide-container')}>
                    <div className={cx('image-slide-body')}>
                        <img src={slide1} alt=""></img>
                        <img src={slide2} alt=""></img>
                    </div>
                </div>
            </div>
            <div className={cx('sub-container')}>
                <div className={cx('body')}>
                    <List />
                    <List />
                    <List />
                    <List />
                </div>
            </div>
        </div>
    );
}

export default Home;
