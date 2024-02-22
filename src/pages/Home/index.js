import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import tra from '../../acsset/images/tra.jpg';
import slide1 from '../../acsset/images/slide1.png';
import slide2 from '../../acsset/images/slide2.png';
import List from '../../components/List';
import Slide from '../../components/Slide';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants';

const cx = classNames.bind(styles);

function Home() {
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        document.title = 'Hải trà Tân Cương';
    }, []);

    //const { data: categorys } = useCategory();

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/api/product_categories`,
                );
                setCategorys(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, []);

    return (
        <div>
            <div className={cx('image')}>
                <img src={tra} alt="img" className={cx('img-background')}></img>
                <div className="absolute bottom-[-60px] w-full items-center flex justify-center  max-lg:hidden">
                    <div className="flex items-center justify-between lg:w-[100%] xl:w-[1190px]">
                        <img className="w-[48%]" src={slide1} alt=""></img>
                        <img className="w-[48%]" src={slide2} alt=""></img>
                    </div>
                </div>
            </div>
            <div className={cx('sub-container')}>
                {categorys.length > 0 && (
                    <div className="w-[1190px] mt-[88px] mb-[40px] max-lg:w-full max-lg:px-[16px] ">
                        {categorys[0] && (
                            <Slide categoryId={categorys[0]?.id} />
                        )}
                        {categorys.map((item) => (
                            <List key={item.id} category={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
