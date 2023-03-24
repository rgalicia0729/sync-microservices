import { useEffect, useState } from 'react';
import axios from 'axios';

interface Comment {
    id: string;
    content: string;
}

type CommentListProps = {
    postId: string;
}

export const CommentList = ({ postId }: CommentListProps) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async (): Promise<void> => {
        const { data } = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
        setComments(data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <ul>
            {
                comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))
            }
        </ul>
    );
}