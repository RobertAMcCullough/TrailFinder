import { EXTENDED_INFO } from '../actions/types'

export default (state = false, action) => {
    switch(action.type) {
        case (EXTENDED_INFO):
            return action.payload
        default:
            return state
    }
}