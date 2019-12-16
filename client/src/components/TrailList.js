//Produces list of trail thumbnails, trails to display are passed in as prop 'trails'
//This component includes the code required to make card images go dim when hovered, but it is commented out
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { Rating, Dimmer, Image } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import { toggleWishlist, toggleComplete, infoWindow } from '../actions'

import DifficultyLabel from './DifficultyLabel'
import TodoCompleteButtons from './TodoCompleteButtons'

import stockImage from '../assets/naturePhoto2.jpg'

class TrailResultsList extends React.Component {
    //state stores id of trail with dimming effect (when hovering). null means none are dimmed
    state={
        dimmedId: null
    }

    //if there is no image available, a stock image and text is used
    renderImage = (trail) => {
        const choosePhoto = () => {
            if(trail.imgSmallMed){
                return(
                    <img src={trail.imgSmallMed} style={{height:'210px', objectFit:'cover'}} alt={trail.name}/>
                )
            }else{
                return(
                    <>
                        <img src={stockImage} style={{height:'210px', objectFit:'cover'}} alt={trail.name}/>
                        <div style={{position:'absolute',bottom:'10px',left:'10px', color:'white', fontWeight:'bold'}}>No Photo Available (Stock Photo)</div>
                    </>
                )
            }
        }
        return(
            <div className='image pointer-on-hover' style={{width:'290px'}} onClick={()=>{this.props.history.push(`/trails/${trail.id}`)}}>
                <div style={{position:'absolute',width:'45%',top:'2%',left:'2%'}}><DifficultyLabel difficulty={trail.difficulty} /></div>
                {choosePhoto(trail)}
            </div>
        )
    }

    //creates a small individual trail card
    renderSmallTrail(e,ind){
        //the number to beginning numbering trails for pagination
        // const pageNumStart=(this.props.pageNumber-1)*this.props.trailsPerPage+1



        // const renderDimmableImage = (trail) => {
        //     return(
        //         <Dimmer.Dimmable as={Image} blurring dimmed={this.state.dimmedId===e.id} onMouseEnter={()=>this.setState({dimmedId:e.id})} onMouseLeave={()=>{this.setState({dimmedId:null})}}>
        //             <Image fluid>
        //                 {this.renderImage(e)}
        //             </Image>
        //             <Dimmer active={this.state.dimmedId===e.id} inverted>
        //                 <Link to={`/trails/${e.id}`}>
        //                     <div className='ui primary button'>
        //                         More Info
        //                     </div>
        //                 </Link>
        //             </Dimmer>
        //         </Dimmer.Dimmable>
        //     )
        // }

        return(
            // <div key={e.id} className='ui card' onMouseEnter={()=>this.props.infoWindow(e.id)} onMouseLeave={()=>this.props.infoWindow(null)}> //this line can be used instead of the following one in order to change state when card is hovered over
            <div key={e.id} className='ui raised card enlarge-on-hover'>
                {/* Can either render a dimmable or non-dimmable image: */}
                {/* {renderDimmableImage(e)} */}
                {this.renderImage(e)}
                <div className='center aligned content'>
                    <Link to={`/trails/${e.id}`} style={{color:'black'}} className='header'>{`${ind+1}. ${e.name}`}</Link>
                    <div className='description'>
                        <Rating icon='star' rating={Math.round(e.stars)} maxRating={5}/> - {e.length.toString().length===1 ? `${e.length}.0` : e.length} Miles
                    </div>
                </div>
                <TodoCompleteButtons trail={e} user={this.props.user} redirectTo='/trails'/>
            </div>
        )
    }

    renderLargeTrails(trails){
        const renderItem = (trail,ind) =>{
            return(
                <div className='item' key={trail.id}>
                    {this.renderImage(trail)}
                    <div className='content'>
                        <Link to={`/trails/${trail.id}`} style={{color:'black'}} className='header'>{trail.name}</Link>
                        <div className='meta'>
                            {trail.location}
                        </div>
                        <div className='description'>
                            <p style={{fontWeight:'bold'}}>"{trail.summary==='Needs Summary' ? 'A fun hike.' : trail.summary}"</p>
                            <p><span style={{fontWeight:'bold'}}>{trail.length.toString().length===1 ? `${trail.length}.0` : trail.length}</span> miles</p>
                            <p><span style={{fontWeight:'bold'}}>{trail.ascent}</span> ft elevation gain</p>
                            <div style={{maxWidth:'45%'}}>
                                <Rating icon='star' rating={Math.round(trail.stars)} maxRating={5}/> - {trail.stars} ({trail.starVotes} ratings)
                            </div>
                            <div style={{maxWidth:'300px', marginLeft:'-15px'}}>
                                <TodoCompleteButtons trail={trail} user={this.props.user} redirectTo={'/trails/'+this.props.match.params.id} backgroundColor='white'/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div className='ui divided items'>
                {trails.map((trail,ind)=>renderItem(trail,ind))}
            </div>
        )
    }

    render(){
        if(!this.props.trails){
            return(<div>Loading...</div>)
        }

        let sortedTrails = this.props.sortBy ? this.props.trails.sort((a,b)=>(a[this.props.sortBy] > b[this.props.sortBy]) ? 1 : -1) : this.props.trails
        if(this.props.sortBy === 'stars' || this.props.sortBy === 'difficulty') sortedTrails = sortedTrails.reverse()

        return(
            <div>
                {this.props.showExtendedInfo ? this.renderLargeTrails(sortedTrails) : sortedTrails.map((e,ind)=>this.renderSmallTrail(e,ind))}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return({
        user : state.currentUser,
        sortBy: state.sortBy,
        showExtendedInfo: state.extendedInfo
    })
}

export default connect(mapStateToProps, {toggleWishlist, toggleComplete, infoWindow})(withRouter(TrailResultsList))