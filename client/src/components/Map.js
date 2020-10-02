import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { withRouter } from 'react-router-dom'

import { refreshMap } from '../actions'

// const redIcon = require('../assets/map-pin-red.png')
// const greenIcon = require('../assets/map-pin-green.png')
// const blueIcon = require('../assets/map-pin-blue.png')
// const redGreenIcon = require('../assets/map-pin-red-green.png')

class MapContainer extends React.Component {
    state={ name: '', marker: {}, visible: false}

    mapRendered=false //used in componentDidMount and componentDidUpdate

    renderMap(){
        if(this.props.trails.length>0) this.mapRendered=true //in some cases, trail data won't be available when component mounts, and if it doesn't then the code from componentDidMount will run in componenentDidUpdate
        if(this.props.trails.length===1) return //if there is only one marker, don't adjust size of the map

        //this sizes the map to fit all the markers
        const bounds = new window.google.maps.LatLngBounds()
        this.props.trails.map((trail)=>{
            bounds.extend(new window.google.maps.LatLng(
                trail.latitude,
                trail.longitude
            ))
            return null
        })

        this.refs.resultMap.map.fitBounds(bounds)
    }

    componentDidMount(){
        this.renderMap()
    }

    componentDidUpdate(){
        // if(this.mapRendered===true) return 
        
        //don't need to run the following code if it was run in componentDidMount
        if(this.mapRendered===false || this.props.redoMap===true){
            this.mapRendered=true;
            this.props.refreshMap(false) //this makes sure the map isn't refreshed again a second time
            this.renderMap()
        }

    }

    // including this component did update function will re-render the map each time a favorite/completed is updated, which will give a more accurate map but will also result in many more requests to the google map api which costs money
    // componentDidUpdate(){
    //     const bounds = new window.google.maps.LatLngBounds()
    //     this.props.trails.map((trail)=>{
    //         bounds.extend(new window.google.maps.LatLng(
    //             trail.latitude,
    //             trail.longitude
    //         ))
    //     })

    //     this.refs.resultMap.map.fitBounds(bounds)
    // }



    mapStyles = {
        width:'100%',
        height: '70vh'
        // height: this.props.showExtendedInfo ? '50vh' : '70vh'
    }

    createMarkers(){


        return this.props.trails.map((e,ind)=>{
            // let icon = blueIcon

            //find out if trail is in favorites or completed
            // if(this.props.user){
            //     if(this.props.user.wishList.find(el=>el.id===e.id)) icon=redIcon
            //     if(this.props.user.completed.find(el=>el.id===e.id)) icon=greenIcon
            //     if(this.props.user.wishList.find(el=>el.id===e.id) && this.props.user.completed.find(el=>el.id===e.id)) icon=redGreenIcon
            // }

            return <Marker 
                key={e.id} 
                id={e.id} 
                position={{lat: e.latitude, lng:e.longitude}}
                label={this.props.trails.length===1 ? '' : (ind+1).toString()} //doesn't add a label when there is only one trail
                // label={(ind+(this.props.pageNumber-1)*this.props.trailsPerPage+1).toString()} // this is used when using pagination
                onClick={(props)=>{this.props.history.push(`/trails/${props.id}`)}}
                onMouseover={(props, marker)=>{if(this.state.name!==e.name){this.setState({name: e.name, marker: marker, visible: true})}}}
                // icon={{
                //     url: icon,
                //     // anchor: new window.google.maps.Point(32,32),
                //     scaledSize: new window.google.maps.Size(32,32)
                // }}
            >
            </Marker>
        })
    }

    renderInfoWindow(){
        if(this.props.trails.length===1) return

        const renderIcons = () => {
            if(this.props.user){
                if(this.props.user.wishList.find(el=>el.name===this.state.name)&&this.props.user.completed.find(el=>el.name===this.state.name)){
                    return(
                        <>
                            <i className='ui heart icon' style={{color:'red'}}></i>
                            <i className='ui check circle icon' style={{color:'green'}}></i>
                        </>
                    )
                }if(this.props.user.completed.find(el=>el.name===this.state.name)){
                    return(
                        <i className='ui check circle icon' style={{color:'green'}}></i>
                    )
                }if(this.props.user.wishList.find(el=>el.name===this.state.name)){
                    return(
                        <i className='ui heart icon' style={{color:'red'}}></i>
                    )
                }
            }
        }

        return(
            <InfoWindow marker={this.state.marker} visible={this.state.visible}>
                <div>
                    <h5>{this.state.marker.label}. {this.state.name} {renderIcons()}</h5>
                    {/* <p style={{fontWeight:'bold'}}>{this.state.name}</p> */}
                </div>
            </InfoWindow>
        )
    }

    render(){
        return(
            <Map 
                google={this.props.google}
                ref='resultMap'
                zoom={11} //only applies when there is one trail and componentDidMount is bypassed
                style={this.mapStyles}
                visible={!this.props.showExtendedInfo}
                initialCenter={this.props.trails[0] ? {lat: this.props.trails[0].latitude, lng: this.props.trails[0].longitude} : {lat: 0, lng: 0}} //only applies when there is one trail and componentDidMount is bypassed
                onClick={()=>{this.setState({name: '', visible: false})}}
                // onReady={()=>{console.log('MAP READY')}}
            >
            {this.createMarkers()}
            {this.renderInfoWindow()}
            </Map>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.currentUser,
        redoMap: state.refreshMap,
        showExtendedInfo: state.extendedInfo
    })
}

const googleMapsKey = process.env.NODE_ENV==='production' ? process.env.REACT_APP_googleMapsAPIKey : process.env.REACT_APP_googleMapsAPIKey_dev

export default connect(mapStateToProps,{refreshMap})(GoogleApiWrapper({apiKey:googleMapsKey})(withRouter(MapContainer)))
