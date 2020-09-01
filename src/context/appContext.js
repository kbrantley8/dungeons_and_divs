import createDataContext from './createDataContext';
import userService from '../Backend/services/userService'
import userStorage from '../Backend/localStorage/userStorage'
import User from '../Backend/models/User'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'login_user':
            return {...state, user: action.user, login_err_msg: {}}
        case 'login_error':
            return {...state, login_err_msg: action.login_err_msg}
        case 'registration_error':
            return {...state, registration_err_msg: action.registration_err_msg}
        default: 
            return state;
    }
}

const loginUser = (dispatch) => {
    return async(email, password) => {
        var userData = await userService.loginUser(email, password)
        .then(user => { return user});
        
        if (userData.status === 404) {
            dispatch({type: 'login_error', login_err_msg: { "message": userData.message, "status": userData.status }})
        } else if (userData.status === 400) {
            dispatch({type: 'login_error', login_err_msg: { "message": userData.message, "status": userData.status }})
        } else {
            var user = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password, userData.account_type, userData.party_id, userData.bio);
            userStorage.storeUser(user)
            dispatch({type: 'login_user', user: user})
        }
    }
}

const registerUser = (dispatch) => {
    return async(first_name, last_name, email, password, account_type) => {
        var userData = await userService.createUser(first_name, last_name, email, password, account_type)
        .then(user => { return user});

        if (userData.status > 10) {
            dispatch({type: 'registration_error', registration_err_msg: { "message": userData.message, "status": userData.status }})
        } else {
            var user = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password, userData.account_type, userData.party_id, userData.bio);
            userStorage.storeUser(user)
            dispatch({type: 'login_user', user: user})
        }
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {
        loginUser,
        registerUser
    },
    {
        user: null
    }
)