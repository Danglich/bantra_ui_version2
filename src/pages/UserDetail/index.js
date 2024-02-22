import { Link, Outlet, useLocation } from 'react-router-dom';

function UserDetail() {
    const sidebars = [
        {
            name: 'Thông tin tài khoản',
            slug: '',
        },
        {
            name: 'Quản lý đơn hàng',
            slug: 'quan-ly-don-hang',
        },
        {
            name: 'Đánh giá',
            slug: 'danh-gia',
        },
        {
            name: 'Đổi mật khẩu mới',
            slug: 'doi-mat-khau',
        },
    ];

    const { pathname } = useLocation();

    //const { logout } = useContext(AuthContext);

    // const handleLogout = () => {
    //     logout();
    //     message.success('Đã đăng suất!');
    //     navigate('/');
    // };

    return (
        <div className=" max-w-[1200px] mx-[auto] rounded-[8px] ">
            <ul className="flex justify-center bg-green-700 py-[8px] text-white">
                {sidebars.map((side) => (
                    <li className="mx-[12px]">
                        <Link
                            className={`text-white ${
                                pathname.includes(side.slug) && 'text-[#40a9ff]'
                            } `}
                            to={`/thanh-vien/${side.slug}`}
                        >
                            {side.name}
                        </Link>
                    </li>
                ))}
                {/* <li onClick={handleLogout} className="mx-[12px]">
                    <span className="text-white cursor-pointer">Đăng suất</span>
                </li> */}
            </ul>
            <Outlet />
        </div>
    );
}

export default UserDetail;
