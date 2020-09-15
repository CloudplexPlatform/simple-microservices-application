const user = {
    name: 'Ameer',
    email: 'ameer@gmai.com',
    password: '123'
}
const userArr = {
    users: [user],
    activeUser: user
};

const userManagemet = (state = userArr, action) => {
    switch (action.type) {
        case 'INIT_USERS_STATE':
            {
                return {
                    ...state,
                    users: [...action.payload],
                }
            }

        case 'ADD_USER':
            {
                return {
                    ...state,
                    users: [
                        ...state.users,
                        {
                            ...action.payload
                        }
                    ]
                }
            }

        case 'EDIT_USER': {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user._id == action.payload._id) {
                        return { ...action.payload };
                    }
                    return user;
                })
            }
        }

        case 'DELETE_USER':
            {
                return {
                    ...state,
                    users: state.users.filter((user) => {
                        if (user._id != action.payload.id) {
                            return user;
                        }
                    })
                }
            }
            
        case 'SET_ACTIVE_USER':
            {
                return {
                    ...state,
                    activeUser: {
                        ...action.payload,
                    }
                }
            }
        default:
            return state;
    }
}

export default userManagemet;