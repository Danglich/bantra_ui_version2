import { CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Feature({ posts }) {
    return (
        <div className="w-full flex gap-[20px] max-md:flex-col">
            <Link
                to={`/cam-nang/${posts[0]?.category?.slug}/${posts[0]?._id}`}
                className="flex-1"
            >
                <div className="w-full overflow-hidden group">
                    <img
                        alt="Ảnh"
                        src={posts[0]?.thumb}
                        className="w-full cursor-pointer group-hover:scale-[1.08] transition duration-700 ease-in-out"
                    ></img>
                </div>
                <h2 className="font-bold text-left text-[17px] my-[12px] cursor-pointer">
                    {posts[0]?.name}
                </h2>
                <p className="text-[#888] text-left font-[400] text-[14px] leading-[23px]">
                    Mỗi năm cứ vào ngày 23 tháng chạp âm lịch mọi người lại nô
                    nức tiễn ông Táo về Trời. Táo quân sẽ lên Thiên đình để báo
                    cáo công việc một năm qua và khẩn cầu Thượng đế ban cho gia
                    chủ năm mới
                </p>
            </Link>
            <div className="flex-1 mt-[-12px]">
                {posts.slice(1).map((post) => (
                    <Link
                        to={`/cam-nang/${post?.category?.slug}/${post?._id}`}
                        key={post._id}
                        className="flex gap-[14px] py-[12px] border-b-[1px] border-[#ccc] last:border-b-0"
                    >
                        <div className="w-[135px] shrink-0 group overflow-hidden">
                            <img
                                className="w-full  align-middle cursor-pointer group-hover:scale-[1.08] transition duration-700 ease-in-out"
                                alt=""
                                src={post?.thumb}
                            ></img>
                        </div>
                        <div className="flex-1">
                            <p className="text-[#333]  text-left text-[15px] mt-[-2px] cursor-pointer">
                                {post?.name}
                            </p>
                            <span className="text-left block text-[14px] text-[300] text-[#006837] mt-[4px] flex items-center">
                                <CalendarOutlined className="mr-[10px] text-[14px]" />
                                02/10/2021
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Feature;
