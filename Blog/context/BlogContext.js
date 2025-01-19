import React from "react";
import CreateDataContext from "./CreateDataContext";
import JsonServer from "../api/JsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case "edit_blogpost":
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost

            })
        case "delete_blogpost":
            return state.filter((blogPost) => blogPost.id !== action.payload)

        case "get_blogpost":
            return action.payload

        default:
            return state;
    }
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await JsonServer.post("/blogposts", { title, content })
        if (callback) {
            callback()
        }
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await JsonServer.put(`blogposts/${id}`, { title, content })
        if (callback) {
            callback()
        }
    };
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await JsonServer.get("/blogposts")
        dispatch({ type: "get_blogpost", payload: response.data });


    };
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await JsonServer.delete(`blogposts/${id}`)
        dispatch({ type: "delete_blogpost", payload: id });
    };
};

export const { Context, Provider } = CreateDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);
