import { SORT_TRAILS } from '../actions/types'

//null means waiting for initial response
export default (state = '', action) => {
    switch(action.type) {
        case (SORT_TRAILS):
            return action.payload
        default:
            return state
    }
}