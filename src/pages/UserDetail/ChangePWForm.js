import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { apiUrl } from '../../constants';

function ChangePasswordForm() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState();

    const handleChangeForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword.trim() === formData.oldPassword.trim()) {
            setError('Mật khẩu mới phải khác với mật khẩu cũ');
            setFormData({});
        } else if (
            formData.newPassword.trim() !== formData.confirmNewPassword.trim()
        ) {
            setError('Nhập lại mật khẩu phải khớp');
            setFormData({});
        } else {
            try {
                await axios.put(
                    `${apiUrl}/api/users/update/password`,
                    formData,
                );
                setFormData({});
                setError('');
                message.success('Đã đổi mật khẩu thành công');
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
                message.error('Đổi mật khẩu không thành công');
            }
        }
    };

    return (
        <div className="mb-[32px]">
            <h1 className="text-[32px] mt-[24px] mb-[32px] text-center">
                ĐỔI MẬT KHẨU
            </h1>
            <form onSubmit={handleSubmit} className="w-[340px] mx-[auto]">
                <div className="mb-[12px]">
                    <label className="font-bold" for="">
                        Mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword || ''}
                        onChange={handleChangeForm}
                        required
                        className="w-full mt-[3px] border-[1px] border-solid border-[#ccc] px-[8px] py-[6px]"
                    />
                </div>
                <div className="mb-[12px]">
                    <label className="font-bold" for="">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword || ''}
                        onChange={handleChangeForm}
                        required
                        className="w-full mt-[3px] border-[1px] border-solid border-[#ccc] px-[8px] py-[6px]"
                    />
                </div>
                <div className="mb-[12px]">
                    <label className="font-bold" for="">
                        Nhập lại mật khẩu mới
                    </label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword || ''}
                        onChange={handleChangeForm}
                        required
                        className="w-full mt-[3px] border-[1px] border-solid border-[#ccc] px-[8px] py-[6px]"
                    />
                </div>
                {error && (
                    <p className="text-[red] mt-[8px] mb-[8px]">{error}</p>
                )}
                <button className="w-full rounded bg-blue-500 hover:bg-blue-600 py-[8px] text-white">
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    );
}

export default ChangePasswordForm;
