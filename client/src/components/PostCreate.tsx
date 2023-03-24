import { useState } from 'react';
import axios from 'axios';

export const PostCreate = () => {
    const [title, setTitle] = useState<string>('');

    const onSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post('http://localhost:3000/posts', { title });

        setTitle('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
            </div>
            <button type='submit' className="btn btn-primary mt-2">Submit</button>
        </form>
    );
}