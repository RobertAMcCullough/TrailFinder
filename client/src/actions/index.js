import axios from 'axios'
import convertTrail from '../helpers/convertTrails';

import { FETCH_USER, SEARCH_TRAILS, TOGGLE_WISHLIST, TOGGLE_COMPLETE, SORT_TRAILS, FETCH_TRAIL, OPEN_MODAL, REFRESH_MAP, INFO_WINDOW, EXTENDED_INFO, SCREEN_RESIZE } from './types'

//stores the width of the current display in pixels for use in responsive components
export const screenResize = width => {
    return({
        type: SCREEN_RESIZE,
        payload: width
    })
}

//get currently logged in user
export const fetchUser = () => {
    const user = axios.get('/api/current_user')

    return({
        payload: user,
        type: FETCH_USER
    })
}

//search for trails using search term
export const searchTrails = async (num=10) => {
    
    // // used when testing to reduce number of google map requests
    //     const lat: 38.856,
    //     const lng: -104.781

    const status = localStorage.getItem('searchStatus')
    const lat = localStorage.getItem('lat')
    const lng = localStorage.getItem('lng')

    const rapidApiTrailList = await axios.get(`/api/trails?lat=${lat}&lon=${lng}`)
        
    const trailList = {
        data: {
             trails: []
        }
    }

    if (rapidApiTrailList.data) {
        rapidApiTrailList.data.forEach((t) => {
            trailList.data.trails.push(convertTrail(t));
        })
    }
    
    //prevents screen that says "no results for..." for several seconds after doing a second search, when the first search had no results
    trailList.data.trails.length===0 ? localStorage.setItem('trailResults','false') : localStorage.setItem('trailResults','true')
    
    return({
        payload: trailList,
        type: SEARCH_TRAILS
    })

    //The following was used when a separate geocoding call was made, but this was changed since it creates API key security issues. The following call will not work with http restrictions (only IP)
    // const googleData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${process.env.REACT_APP_geocodingAPIKey}`)

    // //occurs when google can't find location
    // if(googleData.data.results.length===0){
    //     return({
    //         payload: null,
    //         type: SEARCH_TRAILS
    //     })
    // }

    // const location = googleData.data.results[0].geometry.location


    // The following was one option for protecting the geocoding api key:
    // //determines whether or not to use heroku's fixie plugin which provides a static ip address for the geocoding api key whitelist
    // let googleData = []

    // if(process.env.NODE_ENV==='development'){
    //     googleData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${process.env.REACT_APP_geocodingAPIKey}`)
    // }else{

    //     const fixieRequest = request.defaults({'proxy': process.env.FIXIE_URL})
    //     fixieRequest(`https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${process.env.REACT_APP_geocodingAPIKey}`, (req,res,body)=>{
    //     })
    //     return({
    //         payload: null,
    //         type: SEARCH_TRAILS
    //     })    
    // }
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
    const trailList = {
        data: {
             trails: []
        }
    }

    const lat = localStorage.getItem('lat')
    const lng = localStorage.getItem('lng')

    // used to make call to "https://www.hikingproject.com/data/get-trails-by-id?ids=${id}", now just find trail and r
    const rapidApiTrailList = await axios.get(`/api/trails?lat=${lat}&lon=${lng}&id=${id}`)

    if (rapidApiTrailList.data) {
       trailList.data.trails.push(convertTrail(rapidApiTrailList.data.filter((t) => t.id == id)[0]));
    }

    return({
        payload: trailList,
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

