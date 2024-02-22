import { useContext, useEffect } from 'react';
import AddressForm from './Address';
import DetailForm from './DetailForm';
import { AuthContext } from '../../contexts/AuthContext';

function Form() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Thông tin tài khoản';
    }, []);

    return (
        <div>
            <h1 className="text-[32px] font-[500] mt-[16px] mb-[24px] text-center">
                Thông tin tài khoản
            </h1>
            <div className="flex mb-[32px]">
                <div className="flex-[2]">
                    <DetailForm user={user} />
                </div>
                <div className="flex-[3]">
                    <AddressForm />
                </div>
            </div>
        </div>
    );
}

export default Form;
