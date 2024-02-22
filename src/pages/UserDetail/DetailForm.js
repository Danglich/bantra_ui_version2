import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { apiUrl } from '../../constants';

function DetailForm({ user }) {
    const [userForm, setUserForm] = useState(user);

    const handleChangeUserDetail = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const updateUserDetail = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${apiUrl}/api/users/update/detail`, {
                full_name: userForm.fullName,
                phone_number: userForm.phoneNumber,
                gender: userForm.gender,
                email: user.email,
            });

            message.success('Cập nhật thành công!');

            window.location.reload();
        } catch (error) {
            console.log(error);
            message.error('Cập nhập không thành công');
        }
    };

    return (
        <form
            onSubmit={updateUserDetail}
            className="max-w-[400px] w-[400px] float-right"
        >
            <div className="mb-[16px]">
                <label className="font-bold mb-[4px] block">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    value={user?.email}
                    disabled={true}
                    className="border-[1px] border-solid border-[#ccc] w-full px-[8px] py-[6px]"
                />
            </div>
            <div className="mb-[16px]">
                <label className="font-bold mb-[4px] block">Họ và tên</label>
                <input
                    type="text"
                    placeholder="Họ và tên"
                    name="fullName"
                    onChange={handleChangeUserDetail}
                    value={user?.fullName}
                    className="border-[1px] border-solid border-[#ccc] w-full px-[8px] py-[6px]"
                />
            </div>
            <div className="mb-[16px]">
                <label className="font-bold mb-[4px] block">
                    Số điện thoại
                </label>
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    name="phoneNumber"
                    onChange={handleChangeUserDetail}
                    value={user?.phoneNumber}
                    className="border-[1px] border-solid border-[#ccc] w-full px-[8px] py-[6px]"
                />
            </div>

            <div className="mb-[16px]">
                <label className="font-bold mb-[4px] block">Giới tính</label>
                <select
                    name="gender"
                    className="w-[50%] p-2 border border-gray-300 rounded"
                    onChange={handleChangeUserDetail}
                    value={userForm?.gender}
                >
                    <option value="">Chọn giới tính</option>
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                </select>
            </div>

            <button className="w-full text-white rounded bg-blue-500 hover:bg-blue-600 py-[8px]">
                Cập nhật
            </button>
        </form>
    );
}

export default DetailForm;
