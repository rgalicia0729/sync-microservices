import { useState } from 'react';
import axios from 'axios';

type CommentCreateProps = {
    postId: string;
}

export const CommentCreate = ({ postId }: CommentCreateProps) => {
    const [content, setContent] = useState<string>('');

    const onSubmit = async (event: any): Promise<void> => {
        event.preventDefault();

        await axios.post(`http://localhost:3001/posts/${postId}/comments`, { content });

        setContent('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input className="form-control" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <button className="btn btn-primary mt-2">Submit</button>
        </form>
    );
}