import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUrl } from '../../constants';

function AddressForm() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [address, setAddress] = useState({});

    const handleChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Gọi API để lấy danh sách tỉnh/thành phố
        fetch('https://provinces.open-api.vn/api/?depth=3')
            .then((response) => response.json())
            .then((data) => setProvinces(data))
            .catch((error) => console.log(error));
    }, []);

    const handleProvinceChange = (event) => {
        handleChangeAddress(event);

        const provinceId = event.target.value;

        if (provinceId) {
            // Gọi API để lấy danh sách quận/huyện dựa trên tỉnh/thành phố
            fetch(`https://provinces.open-api.vn/api/p/${provinceId}/?depth=2`)
                .then((response) => response.json())
                .then((data) => setDistricts(data.districts))
                .catch((error) => console.log(error));
        } else {
            setDistricts([]);
            setWards([]);
        }
    };

    const handleDistrictChange = (event) => {
        handleChangeAddress(event);

        const districtId = event.target.value;
        if (districtId) {
            // Gọi API để lấy danh sách phường/xã dựa trên quận/huyện
            fetch(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
                .then((response) => response.json())
                .then((data) => setWards(data.wards))
                .catch((error) => console.log(error));
        } else {
            setWards([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addressForm = {
            ...address,
            province: provinces.find((p) => p.code == address.province).name,
            district: districts.find((d) => d.code == address.district).name,
            ward: wards.find((w) => w.code == address.ward).name,
        };

        try {
            await axios.post(`${apiUrl}/api/users/addresses`, addressForm);
            message.success('Thêm địa chỉ thành công');
        } catch (error) {
            console.log(error);
            message.error('Thêm địa chỉ không thành công');
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Thêm Địa chỉ</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 text-[14px]">
                    <input
                        type="text"
                        className="text-[15px] px-[8px] py-[6px] w-full border-[1px] border-[#ccc] border-solid"
                        placeholder="Họ và tên"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleChangeAddress}
                        required
                    />
                </div>

                <div className="mb-6 text-[14px] flex gap-[12px]">
                    <input
                        type="text"
                        className=" px-[8px] py-[6px] w-[50%] border-[1px] border-[#ccc] border-solid"
                        placeholder="Số điện thoại"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleChangeAddress}
                        required
                    />
                    <input
                        type="text"
                        className=" px-[8px] py-[6px] w-[50%] border-[1px] border-[#ccc] border-solid"
                        placeholder="Email"
                        name="email"
                        value={address.email}
                        onChange={handleChangeAddress}
                        required
                    />
                </div>
                <div className="mb-6 text-[14px] flex gap-[12px]">
                    <select
                        id="province"
                        name="province"
                        onChange={handleProvinceChange}
                        className="w-[50%] p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    <select
                        id="district"
                        name="district"
                        onChange={handleDistrictChange}
                        className="w-[50%] p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6 text-[14px] flex gap-[12px]">
                    <select
                        id="ward"
                        name="ward"
                        className="w-[50%] p-2 border border-gray-300 rounded"
                        required
                        onChange={handleChangeAddress}
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((ward) => (
                            <option key={ward.code} value={ward.code}>
                                {ward.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        className="w-[50%] p-2 border-[1px] border-solid border-[#ccc]"
                        name="detail"
                        value={address.detail}
                        onChange={handleChangeAddress}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="px-[8px] w-full py-[8px] bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Thêm địa chỉ
                </button>
            </form>
        </>
    );
}

export default AddressForm;
