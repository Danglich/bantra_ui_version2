import { useState } from 'react';
import ModalLogin from '../../layout/components/Header/ModalLogin';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [isShowModalLogin, setIsShowModalLogin] = useState(false);

    const openModal = () => {
        setIsShowModalLogin(true);
    };

    const closeModalLogin = () => {
        setIsShowModalLogin(false);
    };
    return (
        <div className="mx-auto font-[500] min-h-[400px] flex items-center justify-center text-[30px] text-slate-800 py-[20px] text-center xl:w-[1190px] max-xl:w-full">
            <div>
                <button
                    onClick={openModal}
                    className="px-[12px] text-[16px] font-[600] text-white bg-[green] py-[6px] rounded"
                >
                    Đăng nhập
                </button>
                <Link className="block mt-[24px]" to="/">
                    Quay lại trang chủ
                </Link>
            </div>
            <ModalLogin
                isOpen={isShowModalLogin}
                closeModal={closeModalLogin}
            />
        </div>
    );
}

export default LoginPage;
