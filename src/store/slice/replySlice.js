import { createSlice } from "@reduxjs/toolkit";
const replySlice = createSlice({
    name: 'reply',
    initialState: {
        showcomment: false
    },
    reducers: {
        // 是否显示页面右面的回复帖子状态
        showCommentHandler(state, actions) {
            state.showcomment = !state.showcomment
        }
    }
})
export const { showCommentHandler } = replySlice.actions;
export const { reducer: replyReducer } = replySlice;