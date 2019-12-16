import { SEARCH_TRAILS } from '../actions/types'

//null means waiting for initial response
export default (state = [], action) => {
    switch(action.type) {
        case (SEARCH_TRAILS):
            //the first three happen when there are zero search results
            if(action.payload===null) return null 
            // if(!action.payload.data) return []
            if(!action.payload.data) return null
            if(action.payload.data.trails.length===0) return null
            return action.payload.data.trails
        default:
            return state
    }
}