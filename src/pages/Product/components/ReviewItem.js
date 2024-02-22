import { Rate, message } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { apiUrl } from '../../../constants';

function ReviewItem({ review }) {
    const { user } = useContext(AuthContext);

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này không')) {
            try {
                await axios.delete(`${apiUrl}/api/admin/reviews/${reviewId}`);
                message.success('Đã xóa thành công');
                window.location.reload();
            } catch (error) {
                console.log(error);
                message.error('Xóa đánh giá bị lỗi');
            }
        }
    };

    return (
        <div className="mt-[12px] mb-[24px] relative">
            <div className="flex items-center gap-[12px]">
                <h1 className="text-[18px]">
                    {review?.user.fullName || review?.user.email}
                </h1>
                <div className="translate-y-[-3px]">
                    <Rate
                        value={review?.rate || 0}
                        onFocus={() => {}}
                        onHoverChange={() => {}}
                        disabled
                    ></Rate>
                </div>
                <span>({review?.createdAt.slice(0, 10)})</span>
            </div>
            <div>
                <p className="font-bold">
                    Quy cách :{' '}
                    <span className="font-[500]">
                        {review?.orderItem.productItem.name}
                    </span>
                </p>
            </div>
            <p className="text-[16px]">{review?.content}</p>
            {user && user.id === review.user.id && (
                <div className="absolute top-[4px] right-[12px]">
                    <button
                        onClick={() => handleDeleteReview(review?.id)}
                        className="px-[8px] py-[4px] rounded-[3px] bg-[red] text-white"
                    >
                        Xóa
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReviewItem;
