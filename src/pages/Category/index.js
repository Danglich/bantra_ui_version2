import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants';
import ProductItem from '../../components/ProductItem';
import { Spin } from 'antd';

const cx = classNames.bind(styles);

function Category() {
    const { slug } = useParams();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [filterPrice, setFilterPrice] = useState();
    const [productsFilter, setProductsFilter] = useState([]);
    const [productsFilterPrice, setProductsFilterPrice] = useState([]);

    const productsAsc = useMemo(() => {
        return [...products].sort((a, b) => a.price - b.price);
    }, [products]);

    const productsDecs = useMemo(() => {
        return [...products].sort((a, b) => b.price - a.price);
    }, [products]);

    const productsNew = useMemo(() => {
        return [...products].sort((a, b) => b.createdAt - a.createdAt);
    }, [products]);

    useEffect(() => {
        document.title = category?.name;
    }, [category]);

    useEffect(() => {
        let isCacled = false;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const category = await axios.get(`${apiUrl}/category/${slug}`);

                setCategory(category.data);

                if (category.data) {
                    const products = await axios.get(
                        `${apiUrl}/product?categoryId=${category.data?._id}&&type=more`,
                    );

                    setProducts(products.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [slug]);

    const handleChangeCheckbox = (e) => {
        if (e.target.checked) {
            const inputPrices = document.querySelectorAll(
                'input[type="checkbox"]',
            );

            inputPrices.forEach((input) => {
                if (input !== e.target) {
                    input.checked = false;
                }
            });

            setFilter(e.target.value);
        } else {
            setFilter('');
        }
    };

    useEffect(() => {
        if (filter === 'new') {
            setProductsFilter(productsNew);
        }
        if (filter === 'asc') {
            setProductsFilter(productsAsc);
        }
        if (filter === 'decs') {
            setProductsFilter(productsDecs);
        }
        if (filter === '') {
            setProductsFilter(products);
        }
    }, [filter, productsAsc, productsDecs, productsNew, products]);

    const handleSetFilterPrice = (e, start, end) => {
        const filtersBtn = document.querySelectorAll(`.${cx('filter-btn')}`);

        if (e.target.classList.contains(cx('active'))) {
            e.target.classList.remove(cx('active'));
            setFilterPrice();
        } else {
            e.target.classList.add(cx('active'));
            setFilterPrice([start, end]);
        }

        filtersBtn.forEach((elm) => {
            if (elm.classList.contains(cx('active')) && elm !== e.target) {
                elm.classList.remove(cx('active'));
            }
        });
    };

    useEffect(() => {
        if (filterPrice) {
            setProductsFilterPrice(
                productsFilter.filter(
                    (item) =>
                        item.price > filterPrice[0] &&
                        item.price < filterPrice[1],
                ),
            );
        } else {
            setProductsFilterPrice([]);
        }
    }, [filterPrice, productsFilter]);

    return (
        <div className="flex items-center justify-center w-full ">
            <div className="w-full xl:w-[1190px]">
                <div className={cx('container')}>
                    <img
                        className={cx('img')}
                        alt="Ảnh"
                        src={category?.thumb}
                    ></img>
                    <h1 className={cx('title')}>{category?.name}</h1>
                    <div className={cx('filter-container')}>
                        <div className={cx('filter-price')}>
                            <span className={cx('filter-title')}>
                                Khoảng giá :{' '}
                            </span>
                            <div className="flex gap-[16px] max-lg:overflow-auto flex-1">
                                <button
                                    className={cx('filter-btn')}
                                    onClick={(e) => {
                                        handleSetFilterPrice(e, 0, 100);
                                    }}
                                >
                                    0-100.000đ
                                </button>
                                <button
                                    className={cx('filter-btn')}
                                    onClick={(e) => {
                                        handleSetFilterPrice(e, 100, 500);
                                    }}
                                >
                                    100.000đ-500.000đ
                                </button>
                                <button
                                    className={cx('filter-btn')}
                                    onClick={(e) => {
                                        handleSetFilterPrice(e, 500, 1000);
                                    }}
                                >
                                    500.000đ-1.000.000đ
                                </button>
                                <button
                                    className={cx('filter-btn')}
                                    onClick={(e) => {
                                        handleSetFilterPrice(e, 1000, 2500);
                                    }}
                                >
                                    1.000.000đ-2.500.000đ
                                </button>
                                <button
                                    className={cx('filter-btn')}
                                    onClick={(e) => {
                                        handleSetFilterPrice(e, 2500, 5000);
                                    }}
                                >
                                    2.500.000đ-5.000.000đ
                                </button>
                            </div>
                        </div>
                        <div className={cx('filter-sort')}>
                            <span className={cx('filter-title')}>
                                6 sản phẩm
                            </span>
                            <div className={cx('filter-sort-container')}>
                                <label className={cx('filter-item')}>
                                    Hàng mới
                                    <input
                                        name="time"
                                        value="new"
                                        type="checkbox"
                                        onClick={handleChangeCheckbox}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('filter-item')}>
                                    Giá tăng dần
                                    <input
                                        type="checkbox"
                                        name="price"
                                        value="asc"
                                        onClick={handleChangeCheckbox}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('filter-item')}>
                                    Giá giảm dần
                                    <input
                                        type="checkbox"
                                        name="price"
                                        value="decs"
                                        onClick={handleChangeCheckbox}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={cx('products-container')}>
                        {isLoading && (
                            <div className="mx-auto my-[20px]">
                                <Spin size="large" />
                            </div>
                        )}
                        {filterPrice && (
                            <>
                                {productsFilterPrice.length > 0 ? (
                                    productsFilterPrice.map((product) => {
                                        return (
                                            <ProductItem
                                                key={product._id}
                                                border
                                                product={product}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className={cx('no-items')}>
                                        <h1>Không tìm thấy sản phẩm</h1>
                                        <img
                                            alt="no item"
                                            src="https://haitratancuong.com/skins/default/images/nothing-found.png
    "
                                        ></img>
                                    </div>
                                )}
                            </>
                        )}
                        {!filterPrice &&
                            productsFilter.map((product) => {
                                return (
                                    <ProductItem
                                        key={product._id}
                                        border
                                        product={product}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
