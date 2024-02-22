import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import NotFound from '../../components/NotFound';
import { Spin } from 'antd';
import { apiUrl } from '../../constants';

function ProductList({ keyword }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangeCurrentPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: reponse } = await axios.get(
                    `${apiUrl}/api/products?page=${
                        currentPage - 1
                    }&keyword=${keyword}`,
                );
                setProducts(reponse.data);
                setTotalPages(reponse.totalPages);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }
    }, [keyword, currentPage]);

    return (
        <div className="">
            <div className="bg-[#38761d] px-[8px] py-[9px] mt-[32px] mb-[22px]">
                <h1 className=" text-white dark:text-[#555] text-[17px]">
                    Kết quả tìm kiếm sản phẩm
                </h1>
            </div>

            {isLoading ? (
                <div className="h-[600px] w-[full] flex items-center justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="flex flex-wrap mx-[-8px]">
                    {products.length > 0 ? (
                        <>
                            {products.map((product) => (
                                <ProductItem
                                    border
                                    product={product}
                                    key={product.id}
                                />
                            ))}
                        </>
                    ) : (
                        <NotFound title="Không tìm thấy sản phẩm nào" />
                    )}

                    {/* Phần phân trang */}
                    <ul className="flex gap-[12px]">
                        {Array(totalPages)
                            .fill()
                            .map((_, index) => (
                                <li
                                    onClick={() =>
                                        handleChangeCurrentPage(index + 1)
                                    }
                                    className={`px-[10px] py-[6px] rounded bg-[#ccc] cursor-pointer hover:opacity-[0.8] ${
                                        index + 1 === currentPage &&
                                        'bg-green-700 text-white'
                                    }`}
                                    key={index + 1}
                                >
                                    {index + 1}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProductList;
