import { Timeline } from 'antd';
import { useEffect } from 'react';

function Introduce() {
    const handleSetActive = (e) => {
        const linkItems = document.querySelectorAll('.link-item ');
        linkItems.forEach((item) => {
            item.classList.remove('active-link');
        });

        e.target.classList.add('active-link');
    };

    useEffect(() => {
        document.title = 'Giới thiệu vùng đất chè Thái Nguyên';
    }, []);

    return (
        <div className="xl:w-[1190px] max-xl:w-full mx-auto max-sm:mx-[8px] ">
            <h1 className="text-center uppercase text-[32px] font-bold my-[20px]">
                Giới thiệu
            </h1>
            <div className="flex items-center justify-center mb-[28px] sticky top-0 max-lg:hidden">
                <ul className=" flex gap-[16px] ">
                    <a href="#tab1" onClick={handleSetActive}>
                        <li className="link-item active-link uppercase text-[16px] bg-white px-[16px] py-[10px] hover:bg-[#006837] hover:text-[white] rounded-[3px] cursor-pointer">
                            Hải trà tân cương
                        </li>
                    </a>
                    <a href="#tab2" onClick={handleSetActive}>
                        <li className="link-item uppercase text-[16px] bg-white px-[16px] py-[10px] hover:bg-[#006837] hover:text-[white] rounded-[3px] cursor-pointer">
                            Tầm nhìn sứ mệnh
                        </li>
                    </a>
                    <a href="#tab3" onClick={handleSetActive}>
                        <li className="link-item uppercase text-[16px] bg-white px-[16px] py-[10px] hover:bg-[#006837] hover:text-[white] rounded-[3px] cursor-pointer">
                            Lịch sử phát triển
                        </li>
                    </a>
                    <a href="#tab4" onClick={handleSetActive}>
                        <li className="link-item uppercase text-[16px] bg-white px-[16px] py-[10px] hover:bg-[#006837] hover:text-[white] rounded-[3px] cursor-pointer">
                            Chứng nhận và giải thưởng
                        </li>
                    </a>
                </ul>
            </div>
            <div
                id="tab1"
                className="mb-[40px] border-t-[1px] border-[#ccc] pt-[24px]"
            >
                <h1 className="uppercase text-[#006837] text-[22px] font-bold text-center">
                    hải trà tân cương
                </h1>
                <div className="mx-auto h-[30px] w-[2px] bg-[#006837] my-[8px]"></div>
                <p className="text-center max-w-[1000px] mx-auto py-[16px]">
                    Từ xưa đến nay, nhắc đến Thái Nguyên, là mọi người đều nghĩ
                    ngay đến vùng đất bạt ngàn cánh đồng chè xanh. Nói tới trà
                    ngon thì không thể không nhắc tới Trà Thái Nguyên – đặc sản
                    nổi tiếng nhất của mảnh đất hình chữ S. Gia đình chúng tôi
                    có truyền thống lâu đời làm Chè Thái Nguyên từ năm 1925 đến
                    nay.
                </p>
                <img
                    className="w-full"
                    alt="Ảnh"
                    src="https://haitratancuong.com/vnt_upload/about/12_2021/thu_hai_che_tan_cuong.png"
                ></img>
                <p className="text-center max-w-[1000px] mx-auto py-[16px]">
                    Tất cả sản phẩm chè của Hợp Tác Xã đều được trồng bằng
                    phương pháp hữu cơ sao chế và đóng gói thủ công. Chè được
                    trồng bằng hạt trên đồi chè cổ lâu năm mặc dù có năng suất
                    thấp hơn so với giống chè mới. Nhưng vẫn giữ lại đúng chất
                    lượng chè với hương cốm, có vị chát, hậu ngọt sâu, màu nước
                    vàng sáng đúng với truyền thống từ vùng đất Tân Cương.
                </p>
                <img
                    className="w-full"
                    alt="Ảnh"
                    src="https://haitratancuong.com/vnt_upload/about/12_2021/tom_non_dac_biet.png"
                ></img>
                <div className="flex gap-[16px] py-[20px] max-lg:block">
                    <div className="max-lg:w-[100%]">
                        <p className="mb-[14px]">
                            Tâm Hải Trà là người đang nắm giữ hàng nghìn hecta
                            chè. Có thể nói, chị là một trong những người gắn bó
                            với chè Thái Nguyên ngon lâu nhất. Chị là người đi
                            đầu, đề xướng ra mô hình trồng chè theo mô hình khép
                            kín đạt chuẩn VietGap.
                        </p>
                        <p className="mb-[14px]">
                            Hàng năm, hợp tác xã này xuất sản phẩm ra thị trường
                            với số lượng cực kỳ hữu hạn. Để tìm mua được giống
                            chè Thái Nguyên ngon là điều không hề dễ dàng. Hiện
                            nay, Hải Trà Tân Cương được chị Hoàng Thị Tân phân
                            phối chính thức sản phẩm.
                        </p>
                        <p className="mb-[14px]">
                            Hơn nữa các hình ảnh, video, sản phẩm cũng đều được
                            cấp phép bởi chị Tân. Có thể nói, Hải Trà Tân Cương
                            là địa chỉ chuyên cung ứng chè Thái Nguyên chính
                            hiệu. Khi mua các sản phẩm tại cơ sở này bạn sẽ nhận
                            được nhiều mức giá ưu đãi cùng chính sách bán hàng
                            vô cùng hấp dẫn.
                        </p>
                    </div>
                    <img
                        className="w-full "
                        alt="Ảnh"
                        src="https://haitratancuong.com/vnt_upload/about/12_2021/img2.jpg"
                    ></img>
                </div>
            </div>
            <div
                id="tab2"
                className="mb-[40px] border-t-[1px] border-[#ccc] pt-[24px]"
            >
                <h1 className="uppercase text-[#006837] text-[22px] font-bold text-center">
                    Tầm nhìn - sứ mệnh
                </h1>
                <div className="mx-auto h-[30px] w-[2px] bg-[#006837] my-[8px]"></div>
                <div className="flex  max-lg:block py-[20px]">
                    <div className="w-[50%] pr-[15px]  max-lg:w-full  max-lg:px-[10px]">
                        <div className="px-[30px] py-[40px] border-[1px] border-[#006837] h-full">
                            <h1 className="uppercase font-bold text-[#006837] text-[20px] mb-[14px]">
                                Tầm nhìn
                            </h1>
                            <p>
                                Ngoài các sản phẩm chủ lực Trà Thái Nguyên HTX
                                chúng tôi còn cung cấp các mặt hàng Hộp trà quà
                                tặng, dụng cụ pha trà. Các sản phẩm mà chúng tôi
                                cung cấp đa phần đều là các mặt hàng cao cấp và
                                đảm bảo chất lượng.
                            </p>
                        </div>
                    </div>
                    <div className="w-[50%] pl-[15px] max-lg:w-full max-lg:mt-[20px] max-lg:px-[10px]">
                        <img
                            className="w-full"
                            alt="Ảnh"
                            src="https://haitratancuong.com/vnt_upload/about/03_2022/su_menh_hai_tra_tan_cuong.jpg"
                        ></img>
                    </div>
                </div>
                <div className="flex  max-lg:block py-[20px]">
                    <div className="w-[50%] pr-[15px]  max-lg:w-full  max-lg:px-[10px]">
                        <img
                            className="w-full"
                            alt="Ảnh"
                            src="https://haitratancuong.com/vnt_upload/about/03_2022/qua_tang_tra_thai_nguyen_570.png"
                        ></img>
                    </div>
                    <div className="w-[50%] pl-[15px] max-lg:w-full max-lg:mt-[20px] max-lg:px-[10px]">
                        <div className="px-[30px] py-[40px] border-[1px] border-[#006837] h-full">
                            <h1 className="uppercase font-bold text-[#006837] text-[20px] mb-[14px]">
                                Sứ mệnh
                            </h1>
                            <p>
                                Với mong muốn đem đến cho mọi người một nét văn
                                hóa đặc trưng của người Việt Nam, chúng tôi đã
                                tiến hành đưa sản phẩm và thương hiệu lên
                                website Hải Trà Tân Cương nhằm giúp mọi người
                                hiểu biết hơn về các sản phẩm của chúng tôi .
                                Đồng thời chúng tôi sẽ cung cấp thêm những kiến
                                thức về trà, về các sản phẩm trà và các kinh
                                nghiệm chọn và pha trà.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="tab3"
                className="mb-[40px] border-t-[1px] border-[#ccc] pt-[24px]"
            >
                <h1 className="uppercase text-[#006837] text-[22px] font-bold text-center">
                    Lịch sử phát triển
                </h1>
                <div className="mx-auto h-[30px] w-[2px] bg-[#006837] my-[8px]"></div>
                <img
                    className="mx-auto my-[16px]"
                    alt="ảnh"
                    src="https://haitratancuong.com/vnt_upload/about/12_2021/logo.png"
                ></img>
                <div className="mt-[36px]">
                    <Timeline mode="alternate">
                        <Timeline.Item label="2018" color="#006837">
                            Được cấp giấy chứng nhận sử dụng địa lý Tân Cương,
                            đây là logo chỉ có 4 vùng ở Phía Tây Tỉnh Thái
                            Nguyên được cấp.
                        </Timeline.Item>
                        <Timeline.Item label="2019" color="#006837">
                            Được cấp giấy chứng nhận an toàn vệ sinh thực phẩm,
                            nên khách hàng sử dụng trà tại Hải Trà Tân Cương an
                            tâm.
                        </Timeline.Item>
                        <Timeline.Item label="2020" color="#006837">
                            Đạt OCOP 4 Sao 2 dòng sản phẩm nổi bật: Nhất Đinh
                            Trà và Trà Tôm Nõn do phó chủ tịch Dương Văn Lượng
                            ký ngày 29/10/2020
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
            <div
                id="tab4"
                className="mb-[40px] border-t-[1px] border-[#ccc] pt-[24px]"
            >
                <h1 className="uppercase text-[#006837] text-[22px] font-bold text-center">
                    Chứng nhận và giải thưởng
                </h1>
                <div className="mx-auto h-[30px] w-[2px] bg-[#006837] my-[8px]"></div>
                <div className="flex max-md:block">
                    <div className="w-[33.33%] max-md:w-full px-[15px] mt-[32px]">
                        <div className="pb-[24px] border-b-[1px] border-[#ccc]">
                            <img
                                className="w-[65%] mx-auto"
                                alt="ảnh"
                                src="https://haitratancuong.com/vnt_upload/about/12_2021/chung_nhan_tra_tom_non_ocop_4_sao.png"
                            ></img>
                        </div>
                        <h1 className="text-center uppercase text-[17px] mt-[16px]">
                            Giấy chứng nhận trà 4 sao
                        </h1>
                    </div>
                    <div className="w-[33.33%] max-md:w-full px-[15px]  mt-[32px]">
                        <div className="pb-[24px] border-b-[1px] border-[#ccc]">
                            <img
                                className="w-[65%] mx-auto"
                                alt="ảnh"
                                src="https://haitratancuong.com/vnt_upload/about/12_2021/doc020.jpg"
                            ></img>
                        </div>
                        <h1 className="text-center uppercase text-[17px] mt-[16px]">
                            Giấy chứng địa lí Tân Cương
                        </h1>
                    </div>
                    <div className="w-[33.33%] max-md:w-full px-[15px]  mt-[32px]">
                        <div className="pb-[24px] border-b-[1px] border-[#ccc]">
                            <img
                                className="w-[65%] mx-auto"
                                alt="ảnh"
                                src="https://haitratancuong.com/vnt_upload/about/12_2021/chung_nhan_vietgap-1.png"
                            ></img>
                        </div>
                        <h1 className="text-center uppercase text-[17px] mt-[16px]">
                            Giấy chứng nhận VIETGAP
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduce;
