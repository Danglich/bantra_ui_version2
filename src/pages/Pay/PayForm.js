import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { OrderContext } from '../../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../constants';

function PayForm() {
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const { user } = useContext(AuthContext);

    const { orderItems } = useContext(OrderContext);

    const [addressId, setAddressId] = useState('fast');
    const [paymentType, setPaymentType] = useState('1');
    const [shippingType, setShippingType] = useState('1');
    const [note, setNote] = useState('');

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };

    const handleShippingTypeChange = (e) => {
        setShippingType(e.target.value);
    };

    const handleChangeAddressId = (e) => {
        setAddressId(e.target.value);
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/users/${user?.id}/addresses`)
            .then((response) => {
                setAddresses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [addressForm, setAddressForm] = useState({});

    const handleChangeAddress = (e) => {
        setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
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

        const items = orderItems.map((orderItem) => ({
            product_id: orderItem.variation.id,
            quantity: orderItem.quantity,
        }));

        if (addressId === 'fast') {
            const address = {
                ...addressForm,
                province: provinces.find((p) => p.code == addressForm.province)
                    .name,
                district: districts.find((d) => d.code == addressForm.district)
                    .name,
                ward: wards.find((w) => w.code == addressForm.ward).name,
            };

            axios
                .post(
                    user
                        ? `${apiUrl}/api/users/addresses`
                        : `${apiUrl}/api/addresses`,
                    address,
                )
                .then((response) => {
                    axios
                        .post(`${apiUrl}/api/orders`, {
                            payment_id: paymentType,
                            address_id: user
                                ? response.data.address.id
                                : response.data.id,
                            shipping_id: shippingType,
                            note: note,
                            items: items,
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    message.success('Đã đặt hàng thành công');

                    navigate('/thanh-vien/quan-ly-don-hang');
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Thêm đơn hàng đã bị lỗi');
                });
        } else {
            try {
                await axios.post(`${apiUrl}/api/orders`, {
                    payment_id: paymentType,
                    address_id: addressId,
                    shipping_id: shippingType,
                    note: note,
                    items: items,
                });

                message.success('Đã đặt hàng thành công');

                navigate('/thanh-vien/quan-ly-don-hang');
            } catch (error) {
                console.log(error);
                message.error('Thêm đơn hàng đã bị lỗi');
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="ml-[18px] max-md:mx-0  max-md:mt-[20px]"
        >
            <h1 className="uppercase font-[900] text-[#006837] text-[17px]">
                Thông tin giao hàng
            </h1>
            {addresses.map((address) => (
                <div
                    key={address.id}
                    className="flex py-[12px] border-b-[1px] border-solid border-[#ccc]"
                >
                    <div>
                        <input
                            type="radio"
                            className=""
                            id={address.id}
                            value={address?.address.id}
                            onChange={handleChangeAddressId}
                            checked={address?.address.id == addressId}
                            name="addressId"
                        />
                    </div>
                    <label
                        className="bladdress?.ock ml-[12px]"
                        htmlFor={address.id}
                    >
                        <h1 className="text-[16px] font-[700]">
                            {address?.address.fullName}
                        </h1>
                        <p className="text-[13px]">
                            {address?.address.detail}, {address?.address.ward},{' '}
                            {address?.address.district},{' '}
                            {address?.address.province}
                        </p>
                        <p className="text-[13px]">
                            {address?.address.phoneNumber} -{' '}
                            {address?.address.email}
                        </p>
                    </label>
                </div>
            ))}

            <div className="flex mt-[12px]">
                <div>
                    <input
                        id="fast"
                        type="radio"
                        value="fast"
                        className=""
                        name="addressId"
                        onChange={handleChangeAddressId}
                        checked={addressId === 'fast'}
                    />
                </div>
                <label htmlFor="fast" className="block ml-[12px]">
                    Mua hàng nhanh (không cần tài khoản)
                </label>
            </div>

            {addressId === 'fast' && (
                <div className="mt-[20px]">
                    <div className="mb-6 text-[14px]">
                        <input
                            type="text"
                            className="text-[15px] px-[8px] py-[6px] w-full border-[1px] border-[#ccc] border-solid"
                            placeholder="Họ và tên"
                            name="fullName"
                            value={addressForm.fullName}
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
                            value={addressForm.phoneNumber}
                            onChange={handleChangeAddress}
                            required
                        />
                        <input
                            type="text"
                            className=" px-[8px] py-[6px] w-[50%] border-[1px] border-[#ccc] border-solid"
                            placeholder="Email"
                            name="email"
                            value={addressForm.email}
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
                                <option
                                    key={province.code}
                                    value={province.code}
                                >
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
                                <option
                                    key={district.code}
                                    value={district.code}
                                >
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
                            value={addressForm.detail}
                            onChange={handleChangeAddress}
                            required
                        />
                    </div>
                </div>
            )}

            <textarea
                name="note"
                onChange={handleChangeNote}
                value={note}
                placeholder="Chú ý khi giao hàng"
                className="h-[70px] mt-[12px] w-full border-[1px] border-solid border-[#ccc] text-[14px] px-[12px] py-[8px]"
            />

            <h1 className="uppercase font-[900] mt-[16px] text-[#006837] text-[17px] border-b-[1px] border-solid border-green-600">
                Phương thức thanh toán
            </h1>
            <div className="flex mt-[12px]">
                <div>
                    <input
                        id="paymentType1"
                        type="radio"
                        value="1"
                        className=""
                        name="paymentType"
                        onChange={handlePaymentTypeChange}
                        checked={paymentType === '1'}
                    />
                </div>
                <label htmlFor="paymentType1" className="block ml-[12px]">
                    Thanh toán khi nhận hàng
                </label>
            </div>

            <div className="flex mt-[12px]">
                <div>
                    <input
                        id="paymentType2"
                        type="radio"
                        value="2"
                        className=""
                        name="paymentType"
                        onChange={handlePaymentTypeChange}
                        checked={paymentType === '2'}
                    />
                </div>
                <label htmlFor="paymentType2" className="block ml-[12px]">
                    Thanh toán bằng hình thức chuyển khoản
                </label>
            </div>

            {/* Phương thức vận chuyển */}
            <div>
                <h1 className="uppercase font-[900] mt-[16px] text-[#006837] text-[17px] border-b-[1px] border-solid border-green-600">
                    Phương thức vận chuyển
                </h1>
                <div className="flex mt-[12px]">
                    <div>
                        <input
                            id="shippingType1"
                            type="radio"
                            value="1"
                            className=""
                            name="shippingType"
                            onChange={handleShippingTypeChange}
                            checked={shippingType === '1'}
                        />
                    </div>
                    <label htmlFor="shippingType1" className="block ml-[12px]">
                        Giao hàng nhanh
                    </label>
                </div>

                <div className="flex mt-[12px]">
                    <div>
                        <input
                            id="shippingType2"
                            type="radio"
                            value="2"
                            className=""
                            name="shippingType"
                            onChange={handleShippingTypeChange}
                            checked={shippingType === '2'}
                        />
                    </div>
                    <label htmlFor="shippingType2" className="block ml-[12px]">
                        Giao hàng hỏa tốc
                    </label>
                </div>
            </div>

            <button className="w-[250px] mt-[24px] uppercase text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-[6px] py-[8px]">
                Hoàn tất đặt hàng
            </button>
        </form>
    );
}

export default PayForm;
