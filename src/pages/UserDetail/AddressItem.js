import { message } from 'antd';
import axios from 'axios';
import { apiUrl } from '../../constants';

function AddressItem({ address }) {
    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?')) {
            try {
                await axios.delete(`${apiUrl}/api/addresses/${addressId}`);
                message.success('Đã xóa thành công');
                window.location.reload();
            } catch (error) {
                console.log(error);
                message.error('Xóa không thành công');
            }
        }
    };

    return (
        <div className="px-[12px] py-[12px] bg-[#f0f0f0] px-[16px] py-[12px] rounded-[4px]">
            <div className="flex mb-[4px]">
                <h1 className="flex-[1] text-[16px] font-[600]">
                    {address?.address.fullName}
                </h1>
                <div>
                    <button className="px-[8px] text-[14px] text-green-600">
                        Sửa
                    </button>
                    <button
                        onClick={() => handleDeleteAddress(address?.address.id)}
                        className="px-[8px] text-[14px] text-green-600"
                    >
                        Xóa
                    </button>
                </div>
            </div>
            <p className="text-[15px]">
                {address?.address.detail}, {address?.address.ward},{' '}
                {address?.address.district}, {address?.address.province}
            </p>
            <p className="text-[15px]">
                {address?.address.phoneNumber} - {address?.address.email}
            </p>
        </div>
    );
}

export default AddressItem;
