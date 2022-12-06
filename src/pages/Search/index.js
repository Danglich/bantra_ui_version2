import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../constants';
import ProductItem from '../../components/ProductItem';
import NotFound from '../../components/NotFound';
import { Spin } from 'antd';

function Search() {
    const { search } = useLocation();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const products = await axios.get(
                    `${apiUrl}/product/search?q=${search.slice(3)}`,
                );

                setProducts(products.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }
    }, [search]);

    return (
        <div className="mx-auto py-[20px] mt-[12px] mb-[40px] max-md:px-[16px] xl:w-[1190px] max-xl:w-full">
            <h1 className="uppercase">Kết quả tìm kiếm</h1>
            <div className="bg-black px-[8px] py-[9px] mt-[32px] mb-[22px]">
                <h1 className=" text-white dark:text-[#555] text-[17px]">
                    Kết quả tìm kiếm sản phẩm
                </h1>
            </div>

            {isLoading ? (
                <div className="h-[260px] w-[full] flex items-center justify-center">
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
                                    key={product._id}
                                />
                            ))}
                        </>
                    ) : (
                        <NotFound title="Không tìm thấy sản phẩm nào" />
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
