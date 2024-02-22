import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotFound from '../../components/NotFound';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { apiUrl } from '../../constants';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('PENDING');

    useEffect(() => {
        document.title = 'Quản lý đơn hàng';
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/users/orders?status=${status}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [status]);

    const sideBar = [
        {
            title: 'Đang chờ',
            value: 'PENDING',
        },
        {
            title: 'Đang gửi',
            value: 'SENDING',
        },
        {
            title: 'Đã gửi thành công',
            value: 'SENT',
        },
        {
            title: 'Đã hủy',
            value: 'CANCELLED',
        },
    ];

    const handleFilterStatusChange = (status) => {
        setStatus(status);
    };

    const handleCancelOrder = async (order) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không ?')) {
            try {
                await axios.put(`${apiUrl}/api/users/orders/cancel`, order);
                message.success('Đơn hàng đã hủy thành công');
                setStatus('CANCELLED');
            } catch (error) {
                console.log(error);
                message.error('Không hủy được đơn hàng');
            }
        }
    };

    const handleReOrder = async (order) => {
        if (
            window.confirm('Bạn có chắc chắn muốn đặt lại đơn hàng này không')
        ) {
            try {
                await axios.put(`${apiUrl}/api/orders/update/status`, {
                    order_id: order?.id,
                    status: 'PENDING',
                });
                setStatus('PENDING');
                message.success('Đã đặt hàng thành công');
            } catch (error) {
                console.log(error);
                message.error('Đặt hàng không thành công');
            }
        }
    };

    return (
        <div className="container mx-auto min-h-[500px]">
            <h1 className="text-[32px] font-bold mb-[24px] mt-[24px] text-center">
                Danh sách đơn hàng
            </h1>
            <ul className="flex items-between mb-[16px]">
                {sideBar.map((s) => (
                    <li
                        onClick={() => handleFilterStatusChange(s.value)}
                        className={`mr-[12px] ${
                            s.value === status && 'bg-green-500 text-white'
                        } font-bold cursor-pointer px-[5px] py-[3px] rounded-[4px]`}
                    >
                        {s.title}
                    </li>
                ))}
            </ul>
            <table className="min-w-full mb-[30px] ">
                <thead>
                    <tr>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Mã đơn hàng
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Ngày đặt
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Tên sản phẩm
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Tổng tiền
                        </th>
                        <th className="py-3 font-[800] px-4 border-b border-gray-200">
                            Trạng thái
                        </th>
                        {status === 'PENDING' && (
                            <th className="py-3 font-[800] px-4 border-b border-gray-200">
                                Hủy
                            </th>
                        )}
                        {status === 'CANCELLED' && (
                            <th className="py-3 font-[800] px-4 border-b border-gray-200">
                                Mua lại
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {order.id}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {order.createdAt.slice(0, 10)}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                <ul>
                                    {order.items.map((item) => (
                                        <li>
                                            <Link
                                                to={`/product/${item.productItem.product.id}`}
                                            >
                                                {item.productItem.product.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                {order.total}
                            </td>
                            <td className="py-4 text-center px-4 border-b border-gray-200">
                                <span
                                    className={`block px-[6px] py-[4px] rounded-[3px] ${getStatusColor(
                                        order.status,
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </td>

                            {status === 'PENDING' && (
                                <td className="py-4 text-center px-4 border-b border-gray-200">
                                    <span
                                        onClick={() => handleCancelOrder(order)}
                                        className="block bg-[red] text-white px-[6px] py-[4px] cursor-pointer rounded"
                                    >
                                        Hủy
                                    </span>
                                </td>
                            )}
                            {status === 'CANCELLED' && (
                                <td className="py-4 text-center px-4 border-b border-gray-200">
                                    <span
                                        onClick={() => handleReOrder(order)}
                                        className="block bg-[green] text-white px-[6px] py-[4px] cursor-pointer rounded"
                                    >
                                        Mua lại
                                    </span>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {orders.length <= 0 && (
                <div className="flex items-center">
                    <NotFound title={'Không tìm thấy đơn hàng nào'} />
                </div>
            )}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'bg-yellow-200';
        case 'SENDING':
            return 'bg-blue-200';
        case 'CANCELLED':
            return 'bg-[red] text-white';
        case 'SENT':
            return 'bg-green-200';
        default:
            return '';
    }
};

export default OrderList;
