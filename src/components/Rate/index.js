import { Rate } from 'antd';

function Rating({ title, rate, onChange }) {
    const handleSetActive = (e) => {
        const filters = document.querySelectorAll('li');
        filters.forEach((filter) => {
            filter.classList.remove('active');
        });

        onChange(e.target.value);

        e.target.classList.add('active');
    };

    return (
        <div className="mb-[30px] mt-[30px]">
            <h1 className="text-[22px] font-bold mb-[16px] text-left">
                {title}
            </h1>
            <div className="flex flex-wrap bg-[#f3f3f3] px-[24px] py-[16px]">
                <div className="w-[190px] ">
                    <strong className="mr-[12px]">{rate}/5</strong>
                    <Rate value={rate} allowHalf style={{ color: 'red' }} />
                </div>
                <ul className="flex flex-wrap">
                    <li
                        value="all"
                        onClick={handleSetActive}
                        className="active py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        Tất cả sao
                    </li>
                    <li
                        value="1"
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        1 sao
                    </li>
                    <li
                        value="2"
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        2 sao
                    </li>
                    <li
                        value="3"
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        3 sao
                    </li>
                    <li
                        value="4"
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[16px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        4 sao
                    </li>
                    <li
                        value="5"
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        5 sao
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Rating;
