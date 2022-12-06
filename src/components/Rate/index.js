import { message, Rate } from 'antd';
import { useEffect, useRef, useState } from 'react';

function Rating({ title }) {
    const [comment, setComment] = useState('');
    const [start, setStart] = useState(0);
    const [commentError, setCommentError] = useState(false);
    const [formInput, setFormInput] = useState({ name: '', email: '' });

    const handleChangeInput = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };

    const inputCommentRef = useRef();

    useEffect(() => {
        if (comment.length > 4) {
            setCommentError(false);
        }
    }, [comment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!start) {
            message.error('Vui lòng cho điểm đánh giá');
        } else if (comment.length < 5) {
            setCommentError(true);
            inputCommentRef.current.focus();
        } else {
            setComment('');
            setStart(0);
            setFormInput({ name: '', email: '' });
            message.success(
                'Viết đánh giá thành công. Vui lòng chờ BQT phê duyệt',
            );
        }
    };

    const handleSetActive = (e) => {
        const filters = document.querySelectorAll('li');
        filters.forEach((filter) => {
            filter.classList.remove('active');
        });

        e.target.classList.add('active');
    };

    return (
        <form className="mb-[30px] mt-[30px]" onSubmit={handleSubmit}>
            <h1 className="text-[22px] font-bold mb-[16px] text-left">
                {title}
            </h1>
            <div className="flex flex-wrap bg-[#f3f3f3] px-[24px] py-[16px]">
                <div className="w-[190px] ">
                    <strong className="mr-[12px]">0/5</strong>
                    <Rate value={0} allowHalf style={{ color: 'red' }} />
                </div>
                <ul className="flex flex-wrap">
                    <li
                        onClick={handleSetActive}
                        className="active py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        Tất cả sao
                    </li>
                    <li
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        1 sao
                    </li>
                    <li
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        2 sao
                    </li>
                    <li
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        3 sao
                    </li>
                    <li
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[16px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        4 sao
                    </li>
                    <li
                        onClick={handleSetActive}
                        className="py-[6px] px-[12px] bg-[#fff] max-lg:mt-[14px] text-center cursor-pointer border-[1px] border-[#e1dddd] rounded-[3px] mr-[20px] min-w-[100px] hover:border-[#006837] hover:text-[#006837] "
                    >
                        5 sao
                    </li>
                </ul>
            </div>
            <div className="border-[1px] border-[#e5e5e5] mt-[24px]">
                <textarea
                    className={
                        commentError
                            ? 'h-[90px] resize-none px-[10px] py-[10px] w-[100%] outline-1 outline-[red] '
                            : 'h-[90px] resize-none px-[10px] py-[10px] w-[100%] outline-0'
                    }
                    ref={inputCommentRef}
                    placeholder="Mời nhập thắc mắc hoặc ý kiến của bạn *"
                    onChange={(e) => {
                        setComment(e.target.value.trim());
                    }}
                    value={comment}
                />
                <p className="block mt-[14px] text-[13px] text-[#999] ml-[4px]">
                    Nội dung chứa ít nhất 5 kí tự!
                </p>
            </div>
            <div className="flex flex-wrap px-[16px] py-[10px] border-[1px] border-[#e5e5e5] border-t-0] justify-between">
                <div className="w-[470px]">
                    <span className="mr-[24px]">
                        1.Đánh giá của bạn về sản phẩm này? :
                    </span>
                    <Rate
                        value={start}
                        onChange={setStart}
                        style={{ color: 'red' }}
                    />
                </div>
                <div className="max-lg:mt-[20px]">
                    <input
                        className="h-[40px]  input px-[12px] rounded-[2px] mr-[12px]"
                        placeholder="Tên của bạn"
                        required
                        onChange={handleChangeInput}
                        name="name"
                        value={formInput?.name || ''}
                    ></input>
                    <input
                        className="h-[40px]  input px-[12px] rounded-[2px] mr-[12px]"
                        placeholder="Email của bạn"
                        type="email"
                        required
                        onChange={handleChangeInput}
                        name="email"
                        value={formInput?.email || ''}
                    ></input>
                    <button className="bg-[#006837] text-white dark:text-[#555] uppercase w-[70px] h-[40px] rounded-[4px] text-center hover:opacity-[0.8]">
                        Gửi
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Rating;
