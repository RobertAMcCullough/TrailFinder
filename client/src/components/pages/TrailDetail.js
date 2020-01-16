import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'

import { fetchTrail } from '../../actions'

import DifficultyLabel from '../DifficultyLabel'
import TodoCompleteButtons from '../TodoCompleteButtons'
import Map from '../Map'

const stockImage = 'https://i.imgur.com/TbzMxRA.jpg'
// import stockImage from '../../assets/naturePhoto2.jpg'

class TrailDetail extends React.Component {
    componentDidMount(){
        this.props.fetchTrail(this.props.match.params.id)
    }

    componentDidUpdate(){
        if(!this.props.trail) return
        if(document.title !== `Trail Finder | ${this.props.trail.name}`) document.title = `Trail Finder | ${this.props.trail.name}`
    }

    iconStyles = {
        width:'1.3rem'
    }

    // for labels that go with icon
    labelStyles = {
        fontWeight:'bold',
        fontSize:'1.15rem',
        paddingLeft:'.3rem',
        verticalAlign:'top'
    }

    // for first info under icon label
    detailStyles= {
        marginLeft:'1.6rem' //1.3 + .3
    }

    // for all other info items after first one
    detailStyles2= {
        marginLeft:'1.6rem',
        marginTop:'-1rem'
    }

    //calculates average and max grade of trail
    calcGrade(){
        let avg = Math.round(this.props.trail.ascent/(this.props.trail.length*5280)*100) //calcs grade and rounds
        let max = Math.round(avg*2.8) //assume max grade is 2.8 times the average
        return({avg,max})
    }

    getDifficulty(){
        switch(this.props.trail.difficulty) {
            case ('green'):
                return('Easy')
            case ('greenBlue'):
                return('Easy')
            case ('blue'):
                return('Intermediate')
            case ('blueBlack'):
                return('Intermediate')
            case ('black'):
                return('Difficult')
            default:
                return('Loading')
        }
    }

    //if there is no image available, a stock image and text is used
    renderImage = (trail) => {
        if(trail.imgMedium){
            return(
                <img src={trail.imgMedium} style={{width:'100%', height:'40vh', objectFit:'cover', borderRadius:'5px'}} alt={trail.name}/>
            )
        }else{
            return(
                <>
                    <img src={stockImage} style={{width:'100%', height:'40vh', objectFit:'cover', borderRadius:'5px'}} alt={trail.name}/>
                    <div style={{position:'absolute',bottom:'15px',left:'30px', color:'white', fontSize:'1.2rem', fontWeight:'bold'}}>No Photo Available (Stock Photo)</div>
                </>
            )
        }
    }

    render(){
        const trail = this.props.trail

        if(!trail || trail.id.toString()!==this.props.match.params.id) return <div>Loading...</div> //prevents error and prevents previously loaded trail from showing while data is being fetched
        return(
            <>
            <div className='ui divider' style={{marginTop:'-1rem'}}></div>
            <div className='ui grid' style={{marginTop:'1.5rem', minHeight:'88vh'}}>
                <div className='ten wide column'>
                    <div className='ui grid'>
                        <div className='row'>
                            <div className='sixteen wide column' style={{verticalAlign:'middle'}}>
                                <span style={{fontWeight:'bold', fontSize:'2rem'}}>{trail.name}</span> <span> - {trail.location}</span>
                                {/* <h1>{trail.name}</h1> */}
                                <div style={{fontWeight:'bold', fontSize:'1.1rem', marginTop:'.8rem'}}>
                                    "{trail.summary==='Needs Summary' ? 'A fun hike.' : trail.summary}"
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div id='difficulty' className='five wide column' style={{alignSelf:'center'}}>
                                <DifficultyLabel difficulty={trail.difficulty} />
                            </div>
                            <div className='five wide column middle aligned'>
                                <Rating icon='star' rating={Math.round(trail.stars)} maxRating={5}/> - {trail.stars} ({trail.starVotes} ratings)
                            </div>
                            <div className='six wide column middle aligned'>
                                <TodoCompleteButtons trail={trail} user={this.props.user} redirectTo={'/trails/'+this.props.match.params.id} buttonSize='small'/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='sixteen wide column'>
                                {this.renderImage(trail)}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='four wide column'>
                                <img src="https://cdn.apstatic.com/img/trailStats/hike.svg" style={this.iconStyles} alt='Trail Icon'></img><span style={this.labelStyles}>Trail</span>
                                <p style={this.detailStyles}><span style={{fontWeight:'bold'}}>{trail.length.toString().length===1 ? `${trail.length}.0` : trail.length}</span> miles</p>
                                <p style={this.detailStyles2}>{this.getDifficulty()}</p>
                            </div>
                            <div className='four wide column'>
                                <img src="https://cdn.apstatic.com/img/trailStats/elevationGain.svg" style={this.iconStyles} alt='Elevation Icon'></img><span style={this.labelStyles}>Elevation</span>
                                <p style={this.detailStyles}>Ascent: <span style={{fontWeight:'bold'}}>{trail.ascent}'</span></p>
                                <p style={this.detailStyles2}>Descent: <span style={{fontWeight:'bold'}}>{trail.descent}'</span></p>
                                <p style={this.detailStyles2}>High: <span style={{fontWeight:'bold'}}>{trail.high}'</span></p>
                                <p style={this.detailStyles2}>Low: <span style={{fontWeight:'bold'}}>{trail.low}'</span></p>
                            </div>
                            <div className='four wide column'>
                                <img src="https://cdn.apstatic.com/img/trailStats/upDownArrows.svg" style={this.iconStyles} alt='Up/Down Icon'></img><span style={this.labelStyles}>Grade</span>
                                <p style={this.detailStyles}>Avg Grade: <span style={{fontWeight:'bold'}}>{this.calcGrade().avg}%</span></p>
                                <p style={this.detailStyles2}>Max Grade: <span style={{fontWeight:'bold'}}>{this.calcGrade().max}%</span></p>
                            </div>
                            <div className='four wide column'>
                                <i className='ui icon bolt' style={{marginRight:'0rem'}}></i><span style={this.labelStyles}>Condition</span>
                                <p style={this.detailStyles}>{trail.conditionStatus}</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='six wide column'>
                <div className='row'>
                    <a className='ui button enlarge-on-hover' style={{color:'white', backgroundColor:'#1A8D1A', marginBottom:'1rem'}} target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${trail.latitude},${trail.longitude}`}><i className='ui icon location arrow'></i>Get Directions</a>
                </div>
                <div className='row'>
                    <Map trails={[this.props.trail]}/>
                </div>
            </div>
                <Link className='enlarge-on-hover' to='/trails'style={{paddingBottom:'3rem'}}><i className='ui icon left arrow'></i>Back to search results</Link>
            </div>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return({
        trail: state.currentTrail ? state.currentTrail.trails[0] : null, //prevents when there is no currentTrail.trails
        user: state.currentUser
    })
}

export default connect(mapStateToProps, {fetchTrail})(TrailDetail)