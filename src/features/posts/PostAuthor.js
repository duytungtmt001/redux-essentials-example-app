// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { fetchUsers } from '../users/usersSlice';

export const PostAuthor = ({ userId }) => {
    const author = useSelector(state =>
        state.users.find(user => user.id === userId)
    )

    return <span>by {author ? author.name : 'Unknown author'}</span>
}