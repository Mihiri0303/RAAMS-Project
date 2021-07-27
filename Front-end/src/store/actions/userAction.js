import { SAVE_USER, REMOVE_USER } from './../types/userActionType';


export function loadUser() {
    try {
        const LocalData = localStorage.getItem('User');
        if (!LocalData) throw "error";
        const user = JSON.parse(LocalData);
        if(user.expire < new Date().getTime()) throw "Error";
        return user;
    } catch (error) {
        return {};
    }
}

function saveUser(user) {
    try {
        if(!user.expire) user.expire = new Date().getTime() + (1000 * 60 * 60 * 24);
        const StateData = JSON.stringify(user);
        localStorage.setItem("User", StateData);
        return user;
    } catch (error) {
        return null;
    }
}

function dropUser(user) {
    try {
        localStorage.removeItem("User");
        return null;
    } catch (error) {
        
    }
}

export const setUser = (user = null) => async dispatch => {
    try{
        // if(!user) user = loadUser();
        if(!user) throw "null user" // eslint-disable-line
        saveUser(user)
        dispatch({
            type: SAVE_USER,
            payload: user
        })
    }catch(err){
        dispatch(removeUser());
    }
}

export const removeUser = () =>async dispatch => {
    dropUser();
    dispatch({
        type: REMOVE_USER,
        payload:{}
    })
}