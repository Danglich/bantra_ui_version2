import CloseIcon from '@mui/icons-material/Close';
import numeral from 'numeral';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

function ItemCart({ cartItem }) {
    const { onRemove, toggleShowCart } = useContext(CartContext);
    const handleRemove = () => {
        onRemove(cartItem.variation.id);
    };

    return (
        <div className="px-[15px] py-[15px] flex items-center relative border-b-[1px] border-[#ccc]">
            <div className="w-[60px] mr-[12px]">
                <img
                    alt=""
                    src={cartItem?.product.thumbnail}
                    className="w-[full]"
                ></img>
            </div>
            <Link
                onClick={toggleShowCart}
                to={`/product/${cartItem?.product.id}`}
                className="flex-[1]"
            >
                <p className="font-[500]">{cartItem?.product.name}</p>
                <div className="flex gap-[16px]">
                    <p className="text-[13px] pt-[4px] font-[400]">
                        Mã SP: {cartItem?.product.sku}
                    </p>
                    <p className="text-[13px] pt-[4px] font-[400]">
                        Quy cách : {cartItem?.variation.name}
                    </p>
                </div>
                <p className="font-[500] pt-[5px]">
                    {cartItem.quantity} x{' '}
                    {numeral(cartItem?.variation.price * 1000).format('0,0')}đ
                </p>
            </Link>
            <div
                className="absolute bottom-[20px] right-[32px] "
                onClick={handleRemove}
            >
                <div className="w-[20px] h-[20px] rounded-full border-[1px] border-[red] flex items-center justify-center cursor-pointer">
                    <CloseIcon className="text-[red]" />
                </div>
            </div>
        </div>
    );
}

export default ItemCart;
