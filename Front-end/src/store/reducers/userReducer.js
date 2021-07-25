import { SAVE_USER, REMOVE_USER } from '../types/userActionType';


const init = {};

export default function UserReducer(state=init,action){
    switch (action.type){
        case SAVE_USER: return action.payload
        case REMOVE_USER: return {}
        default:return state
    }
}
