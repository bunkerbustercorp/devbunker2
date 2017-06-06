import axios from 'axios';

export const getCategory = () => {
    return axios.get('/api/user/category');
}

export const createCategory = (name) => {
    return axios.post('/api/user/category', {name});
}

export const moveCategory = ({id, parentId, index}) => {
    return axios.put('/api/user/category', {id, parentId, index});
}

export const deleteCategory = (id) => {
    return axios.delete('/api/user/category/' + id)
}

export const renameCategory = ({id, name}) => {
    return axios.patch('/api/user/category/', {
        id,
        name
    });
}