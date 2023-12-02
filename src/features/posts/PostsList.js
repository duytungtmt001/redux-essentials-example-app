import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { fetchPosts, selectPostIds, selectAllPosts, selectPostById } from './postsSlice';
import { useEffect, memo } from 'react';
import { Spinner } from '../../components/Spinner';

// ***Cách 1: Dùng React.memo()***
// const PostExcerpt = memo(({ post }) => {
//     return (
//         <article className="post-excerpt">
//             <h3>{post.title}</h3>
//             <div>
//                 <PostAuthor userId={post.user} />
//                 <TimeAgo timestamp={post.date} />
//             </div>
//             <p className="post-content">{post.content.substring(0, 100)}</p>

//             <ReactionButtons post={post} />
//             <Link to={`/posts/${post.id}`} className="button muted-button">
//                 View Post
//             </Link>
//         </article>
//     );
// });


// ***Cách 2: Dùng data postIds thay vì posts và thêm đối số thứ 2 cho useSelector là shallowEqual***
const PostExcerpt = ({ postId }) => {
    console.log('PostExcerpt: ' ,'re-render');

    const post = useSelector(state => selectPostById(state, postId));
    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    );
};

export const PostsList = () => {

    const dispatch = useDispatch();
    // const posts = useSelector(selectAllPosts);
    // const postIds = useSelector(selectAllIds, shallowEqual);
    const orderedPostIds = useSelector(selectPostIds);

    const postStatus = useSelector((state) => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if(postStatus === 'loading') {
        content = <Spinner text='Loading...' />;
    } else if(postStatus === 'succeeded') {
        content = orderedPostIds.map(postId => (
            <PostExcerpt key={postId} postId={postId} />
          ))
        // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        
        // content = orderedPosts.map(post => (
        //     <PostExcerpt key={post.id} post={post} />
        // ))

        // content = postIds.map(postId => (
        //     <PostExcerpt key={postId} postId={postId} />
        // ))
    } else if(postStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    );
};
