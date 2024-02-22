import CloseIcon from '@mui/icons-material/Close';
import numeral from 'numeral';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderContext';

function ItemOrderForPay({ orderItem }) {
    const { product, variation, quantity } = orderItem;

    const { deleteOrderItems, changeQuantity } = useContext(OrderContext);

    const handleRemove = () => {
        deleteOrderItems(orderItem);
    };

    const handleSubtract = () => {
        changeQuantity({
            product: product,
            variation: variation,
            quantity: quantity - 1,
        });
    };

    const handleAdd = () => {
        changeQuantity({
            product: product,
            variation: variation,
            quantity: quantity + 1,
        });
    };

    return (
        <div className="bg-white border-[#ccc] border-b-[1px] px-[6px] py-[20px] flex items-center ">
            <div
                onClick={handleRemove}
                className="w-[42px] h-[42px] cursor-pointer mr-[8px] text-[#333]"
            >
                <CloseIcon className="icon-close" />
            </div>
            <div className="flex max-md:block justify-between flex-[1]">
                <Link to={`/product/${product.id}`} className="flex">
                    <img
                        alt=""
                        src={product.thumbnail}
                        className="w-[60px] shrink-0"
                    ></img>
                    <div className="px-[16px]">
                        <p className="font-[700]">{product.name}</p>
                        <div className="flex gap-[16px]">
                            <p className="text-[14px] mt-[4px]">
                                Mã SP: {product.sku}
                            </p>
                            <p className="text-[14px] mt-[4px]">
                                Quy cách: {variation.name}
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="w-[120px] max-md:mt-[16px]">
                    <span className="text-[red] block text-right  max-md:text-left">
                        {numeral(variation?.price * 1000).format('0,0')}đ
                    </span>
                    <div className="flex h-[35px]  border-[#ccc] border-[1px] mt-[12px]">
                        <div
                            onClick={handleSubtract}
                            className="w-[35px] h-full  border-[#ccc] border-r-[1px] flex items-center justify-center font-[900]  text-[30px] cursor-pointer"
                        >
                            -
                        </div>
                        <div className="w-[50px] h-full flex items-center justify-center  font-[900]  text-[18px] cursor-pointer">
                            {quantity}
                        </div>
                        <div
                            onClick={handleAdd}
                            className="w-[35px]  border-[#ccc] border-l-[1px] h-full flex items-center justify-center  font-[900]  text-[26px] cursor-pointer"
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemOrderForPay;
