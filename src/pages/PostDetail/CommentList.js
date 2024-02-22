import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { apiUrl } from '../../constants';

function CommentList({ newsId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/news_comments/${newsId}/top_level`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [newsId]);

    const handleSubmitComment = async (content) => {
        try {
            const { data } = await axios.post(`${apiUrl}/api/news_comments`, {
                content: content,
                newsId,
            });

            setComments((prev) => [...prev, data]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="text-left">
            <h1>Bình luận</h1>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    newsId={newsId}
                    comment={comment}
                />
            ))}

            <CommentForm
                newsId={newsId}
                isSub={false}
                onSubmit={handleSubmitComment}
            />
        </div>
    );
}

export default CommentList;
