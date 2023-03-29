type CommentListProps = {
    comments: Comment[];
}

export interface Comment {
    id: string;
    content: string;
    status: string;
}

export const CommentList = ({ comments }: CommentListProps) => {

    const getContent = ({ content, status }: Comment) => {
        if (status === 'approved') {
            return content;
        }

        if (status === 'pending') {
            return 'This comment is awaiting moderation';
        }

        if (status === 'rejected') {
            return 'This comment has been rejected';
        }
    }

    return (
        <ul>
            {
                comments.map(comment => (
                    <li key={comment.id}>{getContent(comment)}</li>
                ))
            }
        </ul>
    );
}