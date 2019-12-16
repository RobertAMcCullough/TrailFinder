import { FETCH_TRAIL } from '../actions/types'

//null means waiting for initial response
export default (state = null, action) => {
    switch(action.type) {
        case (FETCH_TRAIL):
            return action.payload.data
        default:
            return state
    }
}