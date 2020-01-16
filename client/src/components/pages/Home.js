import React from 'react'
import { connect } from 'react-redux'
import { GoogleApiWrapper  } from 'google-maps-react'

import { refreshMap } from '../../actions'

import '../../styles/styles.css'

class Home extends React.Component {
    state = {searchTerm : ''}

    componentDidMount(){
        document.title = "Trail Finder"
        //this redirects the user to the page they were on if they logged in or signed up from there
        if(localStorage.getItem('redirectTo')){
            this.props.history.push(localStorage.getItem('redirectTo'))
            //now clear localStorage item so it won't redirect next time home page is visited
            localStorage.setItem('redirectTo','')
        }
    }

    submitSearch = (e) => {
        e.preventDefault()

        //this makes sure the map is rerendered on subsequent searches, otherwise it will be centered on the last search
        this.props.refreshMap(true)

        //geocoding (aka getting lat and long based on search term) is done here
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({address: this.state.searchTerm}, (res, status)=>{
            //store the search data on local storage so it isn't cleared when back arrow/refresh is pressed
            localStorage.setItem('searchTerm', this.state.searchTerm)
            localStorage.setItem('searchStatus', status)
            if(status==='OK'){ //prevents error if google cannot find a location associated with search term
                localStorage.setItem('lat', res[0].geometry.location.lat())
                localStorage.setItem('lng', res[0].geometry.location.lng())
                //prevents screen that says "no results for..." for several seconds after doing a second search, when the first search had no results
                localStorage.setItem('geocodingResults','true')
            }else{
                localStorage.setItem('geocodingResults','false')
            }
            this.props.history.push('/trails')
        })

    }

    render(){
        return(
            <div className='main-image'>
                <form className="search-box" onSubmit={e=>this.submitSearch(e)}>
                    <div className="ui massive icon input">
                        <input type="text" placeholder="Enter Location..." value={this.state.searchTerm} onChange={e=>this.setState({searchTerm:e.target.value})}/>
                            <i className="search icon"></i>
                            {/* the following div is just an overlay to make the search icon clickable */}
                            <div className='search-button' onClick={e=>this.submitSearch(e)}></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null,{ refreshMap })(GoogleApiWrapper({apiKey:process.env.REACT_APP_googleMapsAPIKey})(Home))