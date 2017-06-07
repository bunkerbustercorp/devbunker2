import axios from 'axios';

export const getPostByUserId = (userId) => {
    return axios.get(`/api/post/userid/${userId}`);
}

export const getPostByPostId = (postId) => {
    return axios.get(`/api/post/postid/${postId}`);
}

export const getPosts = () => {
    return axios.get('/api/post');
}

export const deletePost = (postId) => {
    return axios.delete(`/api/post/${postId}`);
}