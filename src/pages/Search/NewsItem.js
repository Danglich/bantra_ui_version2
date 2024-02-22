import { Link } from 'react-router-dom';

function NewsItem({ news }) {
    console.log(news);
    return (
        <div className="w-[25%] cursor-pointer bg-white border-[1px] border-[solid] border-[#ccc] px-[20px] py-[22px]">
            <Link to={`/cam-nang/${news?.category?.slug}/${news?.id}`}>
                <div className="py-[12px] ">
                    <img
                        className="w-full hover:scale-[1.08]  transition duration-700 ease-in-out"
                        src={news.thumbnail}
                        alt="Hình ảnh"
                    />
                </div>
                <h2 className="font-bold text-[16px] mt-[12px]">
                    {news.title}
                </h2>
            </Link>
        </div>
    );
}

export default NewsItem;
