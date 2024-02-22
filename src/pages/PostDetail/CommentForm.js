import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ModalLogin from '../../layout/components/Header/ModalLogin';

function CommentForm({ newsId, isSub, onSubmit, closeForm }) {
    const [comment, setComment] = useState('');
    const { user } = useContext(AuthContext);

    const [showModalLogin, setShowModalLogin] = useState(false);

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    const handleComment = async (e) => {
        e.preventDefault();

        if (!user) {
            setShowModalLogin(true);
        } else {
            await onSubmit(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleComment} className="mb-[24px]">
            <textarea
                placeholder="Đóng góp ý kiến của bạn"
                value={comment}
                onChange={handleChangeComment}
                required
                className="w-full min-h-[78px] border-[1px] border-[solid] border-[#ccc] px-[12px] py-[6px]"
            />
            <div className="flex items-start mt-[8px]">
                <button className="px-[24px] py-[6px] rounded bg-green-700 text-white">
                    Gửi
                </button>
                {isSub && (
                    <button
                        onClick={closeForm}
                        type="button"
                        className="px-[24px] ml-[24px] py-[6px] rounded bg-[red] text-white"
                    >
                        Đóng
                    </button>
                )}
            </div>

            <ModalLogin
                isOpen={showModalLogin}
                closeModal={() => {
                    setShowModalLogin(false);
                }}
            />
        </form>
    );
}

export default CommentForm;
