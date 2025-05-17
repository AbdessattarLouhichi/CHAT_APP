import { configureStore, combineReducers } from '@reduxjs/toolkit'
// ...
import authReducer from './features/authSlice'
import chatReducer from './features/chatSlice'

const rootReducer = combineReducers({
    auth : authReducer,
    chat: chatReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;