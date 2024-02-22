import classNames from 'classnames/bind';
import styles from './List.module.scss';
import ProductItem from '../ProductItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants';

const cx = classNames.bind(styles);

function List({ category }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    //const { isLoading, data: products } = useList(category._id, 'less');

    useEffect(() => {
        let isCacled = false;

        const fetchData = async () => {
            setIsloading(true);
            try {
                const products = await axios.get(
                    `${apiUrl}/api/product_categories/${category.id}/products`,
                );

                setProducts(products.data.data);
                setIsloading(false);
            } catch (error) {
                console.log(error);
                setIsloading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [category.id]);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className="uppercase text-[2.6rem] font-bold max-md:text-[2rem]">
                    {category.name}
                </h1>
                <Link
                    to={`/${category?.slug}`}
                    className="uppercase text-[1.6rem] text-[#006837!important] font-[600] flex items-center max-md:text-[1.3rem]"
                >
                    Xem tất cả
                    <ArrowRightIcon className={cx('right-icon')} />
                </Link>
            </div>
            <div className={cx('list')}>
                {!isLoading &&
                    products.map((pr) => (
                        <ProductItem key={pr.id} product={pr} />
                    ))}
                {isLoading && <Skeleton type="product" count={4} />}
            </div>
        </div>
    );
}

export default List;
