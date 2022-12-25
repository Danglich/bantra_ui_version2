import CloseIcon from '@mui/icons-material/Close';
import numeral from 'numeral';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

function ItemCartForPay({ cartItem }) {
    const { onRemove, toggleQuantity } = useContext(CartContext);

    const handleRemove = () => {
        onRemove(cartItem.product, cartItem.quantity);
    };

    const handleAdd = () => {
        toggleQuantity(cartItem, 'asc');
    };

    const handleSubtract = () => {
        toggleQuantity(cartItem, 'dec', cartItem.quantity);
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
                <Link to={`/product/${cartItem.product._id}`} className="flex">
                    <img
                        alt=""
                        src={cartItem?.product.thumb}
                        className="w-[60px] shrink-0"
                    ></img>
                    <div className="px-[16px]">
                        <p className="font-[700]">{cartItem?.product.name}</p>
                        <p className="text-[14px] mt-[4px]">
                            Mã SP: {cartItem?.product.code}
                        </p>
                    </div>
                </Link>
                <div className="w-[120px] max-md:mt-[16px]">
                    <span className="text-[red] block text-right  max-md:text-left">
                        {numeral(cartItem?.product.price * 1000).format('0,0')}đ
                    </span>
                    <div className="flex h-[35px]  border-[#ccc] border-[1px] mt-[12px]">
                        <div
                            onClick={handleSubtract}
                            className="w-[35px] h-full  border-[#ccc] border-r-[1px] flex items-center justify-center font-[900]  text-[30px] cursor-pointer"
                        >
                            -
                        </div>
                        <div className="w-[50px] h-full flex items-center justify-center  font-[900]  text-[18px] cursor-pointer">
                            {cartItem.quantity}
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

export default ItemCartForPay;
