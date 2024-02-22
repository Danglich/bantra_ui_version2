import SendIcon from '@mui/icons-material/Send';
import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { apiUrl } from '../../constants';

function FormContact({ user }) {
    const [formState, setFormState] = useState({
        content: '',
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '',
        fullName: user?.fullName || '',
    });

    const handleChangeFormState = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${apiUrl}/api/contacts`, formState);
            message.success('Cảm ơn bạn đã liên hệ với chúng tôi !');
            setFormState({});
        } catch (error) {
            console.log(error);
            message.error('Liên hệ chưa thành công');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <p className="text-[15px]">
                Nếu quý khách có thắc mắc hay đóng góp xin vui lòng điền vào
                Form dưới đây và gửi cho chúng tôi. Xin chân thành cảm ơn!
            </p>
            <label className="text-[15px] font-[600] w-full block mb-[6px] mt-[24px]">
                Họ tên <strong className="text-[red]">*</strong>
            </label>
            <input
                required
                className="input h-[40px] px-[12px] w-full"
                name="fullName"
                value={formState.fullName || ''}
                onChange={handleChangeFormState}
            />
            <div className="mt-[16px] flex justify-between max-sm:block items-center">
                <div className="w-[48%] max-sm:w-full ">
                    <label className="text-[15px] font-[600] w-full block mb-[6px]">
                        Điện thoại <strong className="text-[red]">*</strong>
                    </label>
                    <input
                        required
                        className="input h-[40px] px-[12px] w-full"
                        name="phoneNumber"
                        value={formState.phoneNumber || ''}
                        onChange={handleChangeFormState}
                    />
                </div>
                <div className="w-[48%] max-sm:w-full  max-sm:mt-[16px]">
                    <label className="text-[15px] font-[600] w-full block mb-[6px]">
                        Email
                    </label>
                    <input
                        className="input h-[40px] px-[12px] w-full"
                        name="email"
                        value={formState.email || ''}
                        onChange={handleChangeFormState}
                    />
                </div>
            </div>
            <label className="text-[15px] font-[600] w-full block mb-[6px] mt-[16px]">
                Nội dung <strong className="text-[red]">*</strong>
            </label>
            <textarea
                required
                className="input h-[80px] px-[12px] w-full"
                name="content"
                value={formState.content || ''}
                onChange={handleChangeFormState}
            />
            <button className="w-[250px] h-[40px] bg-[#006837] text-white dark:text-[#555] text-[700] mt-[20px] max-sm:w-full ">
                <SendIcon /> GỬI
            </button>
        </form>
    );
}

export default FormContact;
