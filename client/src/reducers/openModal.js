import { OPEN_MODAL } from '../actions/types'

//sets state to true or false for open state of signup and login modals
//payload is in form of array, with 0 index being 'login or 'signup' and 1 index being boolean stating whether it should be open
export default (state = {login: false, signup: false}, action) => {
    switch(action.type) {
        case (OPEN_MODAL):
            if(action.payload[0]==='login'){
                //if modal is false, then both modals are close, if it is true, the second modal is closed since only one should be open at a time
                return action.payload[1]===false ? {login: false, signup: false} : {login: true, signup: false}
            }else{
                return action.payload[1]===false ? {login: false, signup: false} : {login: false, signup: true}
            }
        default:
            return state
    }
}