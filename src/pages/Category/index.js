import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import { Spin } from 'antd';
import axios from 'axios';
import { apiUrl } from '../../constants';

const cx = classNames.bind(styles);

function Category() {
    const { slug } = useParams();
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const [sortBy, setSortBy] = useState('newest');
    const [price, setPrice] = useState(null);

    const handleChangePrice = (price) => {
        setPrice(price);
        setCurrentPage(1);
    };

    //const []

    useEffect(() => {
        document.title = category?.name;
    }, [category]);

    useEffect(() => {
        setPrice(null);
        setCurrentPage(1);
    }, [slug]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        let isCacled = false;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const category = await axios.get(
                    `${apiUrl}/api/product_categories/${slug}`,
                );

                setCategory(category.data);

                if (category.data) {
                    const response = await axios.get(
                        `${apiUrl}/api/product_categories/${
                            category.data.id
                        }/products?page=${currentPage - 1}&sort=${sortBy}${
                            price && `&price=${price}`
                        }`,
                    );

                    const data = response.data;

                    setTotalPages(data.totalPages);
                    setCurrentPage(data.currentPage + 1);
                    setProducts(data.data);
                    setTotalProducts(data.totalItems);
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
    }, [slug, sortBy, price, currentPage]);

    return (
        <div className="flex items-center justify-center w-full ">
            <div className="w-full xl:w-[1190px]">
                <div className={cx('container')}>
                    <img
                        className={cx('img')}
                        alt="Ảnh"
                        src={category?.thumbnail}
                        key={slug}
                    ></img>
                    <h1 className={cx('title')}>{category?.name}</h1>
                    <div className={cx('filter-container')}>
                        <div className={cx('filter-price')}>
                            <span className={cx('filter-title')}>
                                Khoảng giá :{' '}
                            </span>
                            <div className="flex gap-[16px] max-lg:overflow-auto flex-1">
                                <button
                                    onClick={() => handleChangePrice('0-100')}
                                    className={`${
                                        price === '0-100' && 'active'
                                    } ${cx('filter-btn')}`}
                                >
                                    0-100.000đ
                                </button>
                                <button
                                    onClick={() => handleChangePrice('100-500')}
                                    className={`${
                                        price === '100-500' && 'active'
                                    } ${cx('filter-btn')}`}
                                >
                                    100.000đ-500.000đ
                                </button>
                                <button
                                    onClick={() =>
                                        handleChangePrice('500-1000')
                                    }
                                    className={`${
                                        price === '500-1000' && 'active'
                                    } ${cx('filter-btn')}`}
                                >
                                    500.000đ-1.000.000đ
                                </button>
                                <button
                                    onClick={() =>
                                        handleChangePrice('1000-2500')
                                    }
                                    className={`${
                                        price === '1000-2500' && 'active'
                                    } ${cx('filter-btn')}`}
                                >
                                    1.000.000đ-2.500.000đ
                                </button>

                                <button
                                    onClick={() =>
                                        handleChangePrice('2500-5000')
                                    }
                                    className={`${
                                        price === '2500-1000000' && 'active'
                                    } ${cx('filter-btn')}`}
                                >
                                    Trên 2.500.000đ
                                </button>
                            </div>
                        </div>
                        <div className={cx('filter-sort')}>
                            <span className={cx('filter-title')}>
                                {totalProducts} sản phẩm
                            </span>
                            <div className={cx('filter-sort-container')}>
                                <label className={cx('filter-item')}>
                                    Mới nhất
                                    <input
                                        name="sort"
                                        value="newest"
                                        type="radio"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSortBy('newest');
                                            }
                                        }}
                                        checked={sortBy === 'newest'}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('filter-item')}>
                                    Cũ nhất
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="oldest"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSortBy('oldest');
                                            }
                                        }}
                                        checked={sortBy === 'oldest'}
                                    />
                                    <span className={cx('checkmark')}></span>
                                </label>
                                <label className={cx('filter-item')}>
                                    Bán chạy nhất
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="bestseller"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSortBy('bestseller');
                                            }
                                        }}
                                        checked={sortBy === 'bestseller'}
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
                        {products?.length > 0 ? (
                            products.map((product) => {
                                return (
                                    <ProductItem
                                        key={product.id}
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
                                    src="https://haitratancuong.com/skins/default/images/nothing-found.png"
                                ></img>
                            </div>
                        )}
                    </div>
                    {products.length > 0 && (
                        <div className="mb-8 flex justify-start">
                            {/* Phần phân trang */}
                            <nav className="inline-flex">
                                <ul className="flex items-center">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1,
                                    ).map((pageNumber) => (
                                        <li
                                            key={pageNumber}
                                            onClick={() =>
                                                handlePageChange(pageNumber)
                                            }
                                            className={`cursor-pointer mx-2 px-3 py-1 rounded ${
                                                pageNumber === currentPage
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-gray-300 text-gray-700'
                                            }`}
                                        >
                                            {pageNumber}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Category;
