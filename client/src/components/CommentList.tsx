type CommentListProps = {
    comments: Comment[];
}

export interface Comment {
    id: string;
    content: string;
}

export const CommentList = ({ comments }: CommentListProps) => {
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