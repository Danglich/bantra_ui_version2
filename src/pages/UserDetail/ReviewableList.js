import axios from 'axios';
import { useEffect, useState } from 'react';
import NotFound from '../../components/NotFound';
import { Link } from 'react-router-dom';
import ReviewForm from '../../components/ReivewForm';
import { apiUrl } from '../../constants';

function ReviewableList() {
    const [orderItems, setOrderItems] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [orderItemForReview, setOrderItemForReview] = useState();

    const closeModal = () => {
        setIsShowModal(false);
    };

    const openModal = () => {
        setIsShowModal(true);
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/orders/reviewable`)
            .then((response) => {
                setOrderItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleShowReviewModal = (orderItem) => {
        setOrderItemForReview(orderItem);
        openModal();
    };

    return (
        <div className="min-h-[480px]">
            <h1 className="text-center mt-[24px] mb-[24px]">
                Sản phẩm có thể đánh giá
            </h1>
            <table className="min-w-full mb-[30px] ">
                <thead>
                    <tr>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Mã sản phẩm
                        </th>

                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Hình ảnh
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Tên sản phẩm
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Sao
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Số lượng
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Đánh giá
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orderItems.map((orderItem) => (
                        <tr key={orderItem.id}>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {orderItem?.productItem.product.id}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                <img
                                    className="w-[36px] h-[36px]"
                                    src={
                                        orderItem?.productItem.product.thumbnail
                                    }
                                    alt="hình ảnh sản phẩm"
                                />
                            </td>

                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                <Link
                                    to={`/product/${orderItem?.productItem.product.id}`}
                                >
                                    {orderItem?.productItem.product.name}
                                </Link>
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {orderItem?.productItem.product.rate}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {orderItem?.quantity}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                <span
                                    onClick={() =>
                                        handleShowReviewModal(orderItem)
                                    }
                                    className="bg-green-500 text-white px-[6px] py-[4px] rounded cursor-pointer block"
                                >
                                    Đánh giá
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {orderItems.length <= 0 && (
                <div className="flex items-center">
                    <NotFound
                        title={'Không tìm thấy đơn hàng nào có thể đánh giá'}
                    />
                </div>
            )}

            <ReviewForm
                isShow={isShowModal}
                closeModal={closeModal}
                orderItem={orderItemForReview}
            />
        </div>
    );
}

export default ReviewableList;
