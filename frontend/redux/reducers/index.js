import userManagemet from './userManagement';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

const allReducers = combineReducers({
    usersData: userManagemet,
    form: formReducer,
})

export default allReducers;