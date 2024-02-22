import { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import { message } from 'antd';
import { GOOGLE_AUTH_URL, apiUrl } from '../../../constants';

const ModalLogin = ({ isOpen, closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoginMode) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
            });
            const token = response.data.token;

            login(token); // Lưu token vào localStorage bằng AuthContext
            message.success('Đã đăng nhập thành công!');
            window.location.reload();
        } catch (error) {
            message.error('Đã đăng nhập thất bại!');
            setError(error.response.data.message);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                email,
                password,
                confirmPassword,
            });
            const token = response.data.token;

            login(token);
            message.success('Đã đăng Ký thành công!');
            window.location.reload();
        } catch (error) {
            message.error('Đăng đý đã thất bại!');
            setError(error.response.data.message);
        }
    };

    return (
        isOpen && (
            <div className="fixed z-[1] top-0 right-0 left-0 bottom-0">
                <div className="z-[1] w-[40rem] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                    <div className="">
                        <CloseIcon
                            onClick={closeModal}
                            className="text-white text-[24px !important]"
                        />
                    </div>
                    <div className=" bg-white px-[24px] pt-[24px] pb-[32px]">
                        <div className="flex mb-[12px]">
                            <button
                                className={`w-[50%] font-bold py-[8px] hover:opacity-[0.7] ${
                                    isLoginMode
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#ccc]'
                                }`}
                                onClick={() => setIsLoginMode(true)}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className={`w-[50%] font-bold py-[8px] hover:opacity-[0.7] ${
                                    !isLoginMode
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#ccc]'
                                }`}
                                onClick={() => setIsLoginMode(false)}
                            >
                                Đăng ký
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <p className="text-[red] py-[4px]">{error}</p>
                            )}
                            <input
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="border-[1px] border-[#ccc] border-solid w-[100%] px-[8px] py-[8px] mt-[16px]"
                            />
                            <input
                                name="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
                                className="border-[1px] border-[#ccc] border-solid w-[100%] px-[8px] py-[8px] mt-[16px]"
                            />
                            {!isLoginMode && (
                                <input
                                    name="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="border-[1px] border-[#ccc] border-solid w-[100%] px-[8px] py-[8px] mt-[16px]"
                                />
                            )}
                            {isLoginMode ? (
                                <button className="w-full text-white bg-green-500 py-[10px] mt-[24px] font-bold">
                                    Đăng nhập
                                </button>
                            ) : (
                                <button className="w-full text-white bg-green-500 py-[10px] mt-[24px] font-bold">
                                    Đăng ký
                                </button>
                            )}
                        </form>
                        <SocialLogin />
                    </div>
                </div>
                <div className="cursor-auto absolute top-0 right-0 left-0 bottom-0 bg-[black] opacity-[0.4]"></div>
            </div>
        )
    );
};

const SocialLogin = () => {
    return (
        <div className="mt-[12px]">
            <a
                className=" block flex items-center px-[16px] py-[6px] rounded-[44px] border-[1px] border-solid border-[#ccc]"
                href={GOOGLE_AUTH_URL}
            >
                <img
                    src={
                        'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'
                    }
                    alt="Google"
                    className="w-[30px] mr-[16px]"
                />{' '}
                <p>Đăng nhập bằng Google</p>
            </a>
        </div>
    );
};

export default ModalLogin;
