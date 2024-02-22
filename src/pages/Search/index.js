import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import NewsList from './NewsList';

function Search() {
    const { search } = useLocation();
    const keyword = search.slice(3);

    return (
        <div className="mx-auto py-[20px] mt-[12px] mb-[40px] max-md:px-[16px] xl:w-[1190px] max-xl:w-full">
            <h1 className="uppercase">Kết quả tìm kiếm</h1>
            <ProductList keyword={keyword} />
            <NewsList keyword={keyword} />
        </div>
    );
}

export default Search;
