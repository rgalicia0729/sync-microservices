import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';

interface Post {
    id: string;
    title: string;
}

export const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const { data } = await axios.get('http://localhost:3000/posts');
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values<Post>(posts).map((post) => (
        <div
            key={post.id}
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <hr />

                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    ))

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
}