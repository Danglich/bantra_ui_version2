import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CommentForm from './CommentForm';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { message } from 'antd';
import { apiUrl } from '../../constants';

function CommentItem({ comment, newsId }) {
    const [commentData, setCommentData] = useState(comment);
    const [childrens, setChildrens] = useState([]);
    const [showChild, setShowChild] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (showChild) {
            axios
                .get(`${apiUrl}/api/news_comments/${commentData?.id}/child`)
                .then((response) => {
                    setChildrens(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [commentData, showChild]);

    const handleSubmitComment = async (content) => {
        try {
            const { data } = await axios.post(`${apiUrl}/api/news_comments`, {
                content: content,
                newsId,
                parentId: commentData?.id,
            });

            setChildrens((prev) => [...prev, data]);
            closeForm();
            setShowChild(true);
        } catch (error) {
            console.log(error);
        }
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này không')) {
            try {
                await axios.delete(`${apiUrl}/api/news_comments/${commentId}`);

                setCommentData();
                message.success('Đã xóa thành công');
            } catch (error) {
                console.log(error);
                message.error('Không thể xóa được');
            }
        }
    };

    return (
        commentData && (
            <div className="py-[16px]">
                <div className="flex justify-between">
                    <div>
                        <div className="flex mb-[8px] ">
                            {commentData?.user?.role === 'ADMIN' ? (
                                <span className="font-bold bg-[green] px-[6px] py-[3px] rounded text-white mr-[16px] block ">
                                    Admin
                                </span>
                            ) : (
                                <h1 className="text-[17px] font-[900] mr-[16px] italic text-[red]">
                                    {commentData?.user?.fullName ||
                                        commentData?.user?.email}
                                </h1>
                            )}
                            <p className="font-[400]">
                                {commentData?.createdAt.slice(0, 10)}
                            </p>
                        </div>
                        <p className="font-[400]">{commentData?.content}</p>
                    </div>
                    {user?.email === commentData?.user.email && (
                        <button
                            onClick={() => handleDeleteComment(commentData?.id)}
                            className="text-[red] mr-[24px]"
                        >
                            Xóa
                        </button>
                    )}
                </div>
                <div className="mt-[4px]">
                    {!showChild && (
                        <span
                            onClick={() => {
                                setShowChild(true);
                            }}
                            className="cursor-pointer text-[blue] mr-[24px]"
                        >
                            Xem tất cả
                        </span>
                    )}

                    {!showForm && (
                        <span
                            onClick={() => {
                                setShowForm(true);
                            }}
                            className="cursor-pointer text-[blue]"
                        >
                            Trả lời
                        </span>
                    )}
                </div>

                {showForm && (
                    <div className="ml-[24px] pt-[8px]">
                        <CommentForm
                            closeForm={closeForm}
                            isSub={true}
                            onSubmit={handleSubmitComment}
                        />
                    </div>
                )}

                {showChild && (
                    <div className="pl-[32px]">
                        {childrens.map((child) => (
                            <CommentItem comment={child} newsId={newsId} />
                        ))}
                    </div>
                )}
            </div>
        )
    );
}

export default CommentItem;
