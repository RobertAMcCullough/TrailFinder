import axios from 'axios'

import { FETCH_USER, SEARCH_TRAILS, TOGGLE_WISHLIST, TOGGLE_COMPLETE, SORT_TRAILS, FETCH_TRAIL, OPEN_MODAL, REFRESH_MAP, INFO_WINDOW, EXTENDED_INFO } from './types'

//get currently logged in user
export const fetchUser = () => {
    const user = axios.get('/api/current_user')

    return({
        payload: user,
        type: FETCH_USER
    })
}

//search for trails using search term
export const searchTrails = async (term, num=10) => {
    const googleData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${process.env.REACT_APP_geocodingAPIKey}`)

    //occurs when google can't find location
    if(googleData.data.results.length===0){
        return({
            payload: null,
            type: SEARCH_TRAILS
        })
    }

    const location = googleData.data.results[0].geometry.location

    // // used when testing to reduce number of google map requests
    // const location = {
    //     lat: 38.856,
    //     lng: -104.781
    // }
    
    const trailList = axios.get(`https://www.hikingproject.com/data/get-trails?lat=${location.lat}&lon=${location.lng}&maxResults=${num}&maxDistance=10&key=${process.env.REACT_APP_hikingProjectAPIKey}`)

    return({
        payload: trailList,
        type: SEARCH_TRAILS
    })
}

//toggle whether trail is in wishlist array or not
export const toggleWishlist = (trail) => {
    const user = axios.post('/api/wishlist', {trail})

    return({
        payload: user,
        type: TOGGLE_WISHLIST
    })
}

//toggle whether trail is in completed array or not
export const toggleComplete = (trail) => {
    const user = axios.post('/api/completed', {trail})

    return({
        payload: user,
        type: TOGGLE_COMPLETE
    })
}

//sort trails by rating, distance or name - actual sorting is done is trailList component
export const sortBy = (sortBy) => {

    return({
        payload: sortBy,
        type: SORT_TRAILS
    })
}

//fetches one trail
export const fetchTrail = async (id) => {
    const trail = axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=${process.env.REACT_APP_hikingProjectAPIKey}`)

    return({
        payload: trail,
        type: FETCH_TRAIL
    })
}

//switches open states of signup and login modals
//modal arg is either 'signup' or 'login', isOpen arg is boolean
export const openModal = (modal, isOpen) => {
    return({
        payload: ([modal, isOpen]),
        type: OPEN_MODAL
    })
}

//if refreshMap is ever set to true, the map will be refreshed, this is done when resorting list
//anytime refreshMap is set to true, it must be set back to false right after the map is updated so it doesn't keep updating which has a fee associated with it
export const refreshMap = (trueOrFalse) => {
    return({
        payload: trueOrFalse,
        type: REFRESH_MAP
    })
}

//indicates the infoWindow that should be active on google map due to hovering on trail list or on marker
export const infoWindow = (id) => {
    return({
        payload: id,
        type: INFO_WINDOW
    })
}

//indicates if extended info should be shown on trail list screen, true means enxtended info is shown
export const extendedInfo = (trueOrFalse) => {
    return({
        payload: trueOrFalse,
        type: EXTENDED_INFO
    })
}

