import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice';
import usersSlice from '../features/users/usersSlice';
import notificationsSlice from '../features/notifications/notificationsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    notifications: notificationsSlice
  },
})
