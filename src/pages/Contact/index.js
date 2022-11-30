import { useEffect } from 'react';
import FormContact from '../../components/FormContact';
function Contact() {
    useEffect(() => {
        document.title = 'Liên hệ - góp ý';
    }, []);
    return (
        <div className="mx-auto py-[20px] mt-[12px] mb-[40px] max-md:px-[16px] xl:w-[1190px] max-xl:w-full">
            <h1 className="uppercase text-[#006837] text-[30px] text-center">
                Liên hệ hải trà tân cương
            </h1>
            <div className="flex max-md:block flex-row-reverse mt-[24px]">
                <div className="w-[50%] max-md:w-full">
                    <div className="ml-[20px]">
                        <h1 className="uppercase text-[#006837] text-[17px] underline">
                            Văn phòng đại diện
                        </h1>
                        <p className="text-[15px] mt-[10px]">
                            388D27A, Nguyễn Văn Cừ nối dài, Phường An Khánh,
                            Ninh Kiều, Cần Thơ 900000
                        </p>
                        <div className="h-[0.5px] bg-[#ccc] mt-[22px] mb-[12px]"></div>
                        <p className="text-[15px] pt-[3px]">
                            Điện thoại: 0918224431 (zalo)
                        </p>
                        <p className="text-[15px] pt-[3px]">
                            Email: haitratancuong@gmail.com
                        </p>
                        <p className="text-[15px] pt-[3px]">
                            Thanh toán qua chuyển khoản ngân hàng:
                        </p>
                        <p className="text-[15px] pt-[3px]">
                            Chuyển khoản qua tài khoản ngân hàng, Ghi chú Mua
                            hàng + Số điện thoại . Chúng tôi sẽ
                        </p>
                        <p className="text-[15px] pt-[3px]">
                            liên lạc lại để xác thực đơn hàng
                        </p>
                    </div>
                </div>
                <div className="w-[50%] max-md:w-full max-md:mt-[24px] px-[12px]">
                    <div className="mr-[20px]">
                        <FormContact />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
