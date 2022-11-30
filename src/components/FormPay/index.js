import { message } from 'antd';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

function FormPay() {
    const { resetCart } = useContext(CartContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        resetCart();
        message.success('Chúc mừng! Đơn hàng của bạn đã tạo thành công');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Họ và tên *"
                className="h-[42px] px-[12px] w-full input mt-[18px]"
                required
            />
            <div>
                <input
                    placeholder="Điện thoại *"
                    className="h-[42px] px-[12px] w-[45%] max-sm:w-full input mt-[18px]"
                    required
                />
                <input
                    placeholder="Email"
                    className="h-[42px] px-[12px] w-[45%] max-sm:w-full float-right input mt-[18px]"
                />
            </div>
            <input
                placeholder="Địa chỉ *"
                className="h-[42px] px-[12px] w-full input mt-[18px]"
                required
            />
            <textarea
                placeholder="Ghi chú"
                className="h-[42px] px-[12px] w-full h-[80px] input mt-[18px]"
            />
            <button className="text-white hover:opacity-[0.8] font-[900] bg-[#006837] rounded-[4px] py-[11px] mt-[20px] float-right uppercase px-[20px]">
                Hoàn tất đơn hàng
            </button>
        </form>
    );
}

export default FormPay;
