import { useContext } from 'react';
import { LastViewContext } from '../../contexts/LastViewContext';
import ProductItem from '../ProductItem';

function LastView() {
    const { lastViews } = useContext(LastViewContext);

    if (lastViews.length === 0) return <></>;

    return (
        <div>
            <h1 className="text-[22px] font-[500] mb-[16px]">
                Sản phẩm đã xem
            </h1>
            <div className="mx-[-7px] flex">
                {lastViews.map((product) => (
                    <ProductItem key={product._id} product={product} border />
                ))}
            </div>
        </div>
    );
}

export default LastView;
