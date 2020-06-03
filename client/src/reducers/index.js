import { combineReducers } from 'redux'

import fetchUser from './fetchUser'
import searchTrails from './searchTrails'
import sortBy from './sortBy'
import fetchTrail from './fetchTrail'
import openModal from './openModal'
import refreshMap from './refreshMap'
import infoWindow from './infoWindow'
import extendedInfo from './extendedInfo'
import screenResize from './screenResize'

export default combineReducers({
    currentUser: fetchUser,
    trailSearchResults: searchTrails,
    sortBy: sortBy,
    currentTrail: fetchTrail,
    openModal: openModal,
    refreshMap: refreshMap,
    infoWindow: infoWindow,
    extendedInfo: extendedInfo,
    screenSize: screenResize
})