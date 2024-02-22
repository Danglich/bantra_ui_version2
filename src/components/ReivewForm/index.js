import { Rate, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { apiUrl } from '../../constants';

function ReviewForm({ isShow, closeModal, orderItem }) {
    const [content, setContent] = useState('');
    const [rate, setRate] = useState();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rate === 0) {
            setError('Vui lòng chọn số sao');
        } else if (content.trim().length < 5) {
            setError('Nội dung đánh giá phải ít nhất 5 kí tự');
        } else {
            try {
                await axios.post(`${apiUrl}/api/reviews`, {
                    orderId: orderItem.id,
                    content,
                    rate,
                });
                setContent('');
                setRate();
                closeModal();
                message.success('Đánh giá thành công');
                window.location.reload();
            } catch (error) {
                console.log(error);
                setError(error?.response.data.message);
                message.error('Bài đánh giá bị lỗi');
            }
        }
    };

    return (
        isShow && (
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="absolute z-[1] bg-white px-[24px] py-[24px] w-[60rem] rounded-[10px]">
                    <div>
                        <p className="font-bold">
                            Tên:{' '}
                            <span>{orderItem?.productItem.product.name}</span>
                        </p>
                        <p className="font-bold">
                            Loại:{' '}
                            <span className="font-[500]">
                                {orderItem?.productItem.name}
                            </span>
                        </p>
                        <p className="font-bold">
                            Giá:{' '}
                            <span className="font-[500]">
                                {orderItem?.productItem.price}
                            </span>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <p className="text-[red] my-[8px]">{error}</p>
                        )}
                        <div className="border-[1px] border-[#e5e5e5] mt-[24px]">
                            <textarea
                                placeholder="Mời nhập thắc mắc hoặc ý kiến của bạn *"
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                                value={content}
                                required
                                className="w-full px-[8px] min-h-[80px]"
                            />
                            <p className="block mt-[14px] text-[13px] text-[#999] ml-[4px]">
                                Nội dung chứa ít nhất 5 kí tự!
                            </p>
                        </div>
                        <div className="flex flex-wrap px-[16px] py-[10px] border-[1px] border-[#e5e5e5] border-t-0] justify-between">
                            <div className="w-[470px] mb-[8px]">
                                <span className="mr-[24px] ">
                                    1.Đánh giá của bạn về sản phẩm này? :
                                </span>
                                <Rate
                                    value={rate || 0}
                                    onChange={setRate}
                                    style={{ color: 'red' }}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#006837] text-white dark:text-[#555] uppercase w-[70px] h-[40px] rounded-[4px] text-center hover:opacity-[0.8]"
                            >
                                Gửi
                            </button>
                        </div>

                        <button
                            onClick={closeModal}
                            type="button"
                            className="bg-[red] text-white  mt-[20px] uppercase w-[70px] h-[40px] rounded-[4px] text-center hover:opacity-[0.8]"
                        >
                            Hủy
                        </button>
                    </form>
                </div>
                <div className="absolute inset-0 bg-[#000] opacity-[0.4]"></div>
            </div>
        )
    );
}

export default ReviewForm;
