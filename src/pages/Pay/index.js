import numeral from 'numeral';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormPay from '../../components/FormPay';
import ItemCartForPay from '../../components/ItemCartForPay';
import NotFound from '../../components/NotFound';
import { CartContext } from '../../contexts/CartContext';

function Pay() {
    useEffect(() => {
        document.title = 'Thông tin thanh toán';
    }, []);

    const { cartItems, totalPrice } = useContext(CartContext);

    if (cartItems.length === 0)
        return (
            <div className="min-h-[400px]">
                <NotFound title="Giỏ hàng của bạn chưa có sản phẩm nào!" />
                <Link
                    className="text-center w-full block text-[red!important]"
                    to={'/'}
                >
                    Quay lại trang chủ
                </Link>
            </div>
        );

    return (
        <div className="mx-auto py-[20px] mt-[12px] mb-[40px] max-md:px-[16px] xl:w-[1190px] max-xl:w-full">
            <div className="flex max-md:block">
                <div className="w-[50%] max-md:w-full">
                    <div className="mr-[18px] max-md:mx-0 ">
                        <h1 className="uppercase font-[900] text-[#006837] text-[17px]">
                            Sản phẩm
                        </h1>
                        <div className="h-[1px] bg-[#006837] mt-[4px]"></div>
                        <div>
                            {cartItems.map((item) => (
                                <ItemCartForPay
                                    key={item.product._id}
                                    cartItem={item}
                                />
                            ))}
                        </div>
                        <div className="mt-[20px]">
                            <div className="flex items-center justify-between">
                                <p className="text-[15px] font-[500]">
                                    Thành tiền:{' '}
                                </p>
                                <p className="text-[15px] font-[600]">
                                    {numeral(totalPrice * 1000).format('0,0')}đ
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-[8px]">
                                <p className="text-[15px] font-[500]">
                                    Phí xuất hóa đơn:{' '}
                                </p>
                                <p className="text-[15px] font-[600]">0đ</p>
                            </div>
                            <div className="flex items-center justify-between mt-[8px]">
                                <p className="text-[15px] font-[500]">
                                    Phí xuất vận chuyển:{' '}
                                </p>
                                <p className="text-[15px] font-[600]">0đ</p>
                            </div>
                            <div className="flex items-center justify-between mt-[8px]">
                                <p className="text-[15px] font-[500]">
                                    Tổng cộng:{' '}
                                </p>
                                <p className="text-[19px] font-[700] text-[red]">
                                    {numeral(totalPrice * 1000).format('0,0')}đ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]  max-md:w-full">
                    <div className="ml-[18px] max-md:mx-0  max-md:mt-[20px]">
                        <h1 className="uppercase font-[900] text-[#006837] text-[17px]">
                            Thông tin đặt hàng
                        </h1>
                        <div className="h-[1px] bg-[#006837] mt-[4px]"></div>
                        <FormPay />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;
