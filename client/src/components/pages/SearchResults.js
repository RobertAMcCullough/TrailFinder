import React from 'react'
import { connect } from 'react-redux'
import { searchTrails } from '../../actions'
import { Link } from 'react-router-dom'

import TrailWithMap from '../TrailWithMap'

class SearchResults extends React.Component {
    searchTerm = localStorage.getItem('searchTerm')

    componentDidMount(){
        document.title = `Trail Finder | Search Results For ${this.searchTerm}`
        this.props.searchTrails()
    }

    render(){
        if(!this.props.trails){
            //this if statement prevents "no trail results for ..." for a second when making a second search if the previous one returned no results
            if(localStorage.getItem('geocodingResults')==='false' || localStorage.getItem('trailResults')==='false'){
                return(
                    <div style={{textAlign:'center'}}>
                        <h1 style={{marginTop:'4rem', textTransform:'capitalize'}}>No trails found near {this.searchTerm}</h1>
                        <Link to='/' style={{fontSize:'1.2rem'}}>Search again?</Link>
                    </div>
                )  
            }else{
                return(
                    <h3>Loading...</h3>
                )
            }
 
        }
        return(
            <div>
                <TrailWithMap trails={this.props.trails} headerContent={`Trails Near ${this.searchTerm}`} addDropdown={true}/>             
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        trails: state.trailSearchResults
    })
}

export default connect(mapStateToProps,{searchTrails})(SearchResults)