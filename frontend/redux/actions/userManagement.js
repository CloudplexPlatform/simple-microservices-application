import axios from 'axios';

export const addUser = (userData) => {
    return {
        type: 'ADD_USER',
        payload: userData,
    }
}

export const editUser = (userData) => {
    return {
        type: 'EDIT_USER',
        payload: userData,
    }
}

export const deleteUser = (id) => {
    
    return dispatch => {
        return axios.delete(`/users`, {
            params: {
                id,
            }
        }).then((res) => {
            if (res.data.statusCode == 200) {
                dispatch({
                    type: 'DELETE_USER',
                    payload: {
                        id,
                    },
                })
            }
        })
    }
}

export const setActiveUser = (data) => {
    return {
        type: 'SET_ACTIVE_USER',
        payload: data,
    }
}

export const initUsersState = (data) => {
    return {
        type: 'INIT_USERS_STATE',
        payload: data,
    }
}

