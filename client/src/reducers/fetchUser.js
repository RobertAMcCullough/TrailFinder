import { FETCH_USER, TOGGLE_WISHLIST, TOGGLE_COMPLETE } from '../actions/types'

//null means waiting for initial response
export default (state = null, action) => {
    switch(action.type) {
        case (FETCH_USER):
            if(!action.payload.data) return false
            return action.payload.data
        case (TOGGLE_WISHLIST):
            return action.payload.data
        case (TOGGLE_COMPLETE):
            return action.payload.data
        default:
            return state
    }
}