import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const defaultPhoto = require('../../assets/missing-avatar.png')

class Profile extends React.Component{
    componentDidMount(){
        document.title = 'Trail Finder | Profile'
    }

    renderTrails(type){
        return(
            <ul>
                {this.props.currentUser[type].map(el=><Link to={`/trails/${el.id}`} style={{color:'black'}}><li>{el.name}</li></Link>)}
            </ul>
        )
    }

    formatDate(date){
        const dateString = new Date(this.props.currentUser.dateCreated).toDateString()
        return(
            `${dateString.slice(3,10)}, ${dateString.slice(11,16)}`
        )
    }

    render(){
        if(!this.props.currentUser) return <div>Loading...</div>

        return(
            <div>
                <div className='ui divider' style={{marginTop:'-1rem'}}></div>
                <h2 style={{textAlign:'center', margin:'3rem'}}>User Profile</h2>
                <div className='ui grid'>
                    <div className='five wide column' style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
                        <img alt='Profile' id='profilePictureProfile' style={{width:'200px', height:'200px', objectFit:'cover', borderRadius:'50%'}}  src={this.props.currentUser.photo} onError={()=>{document.getElementById('profilePictureProfile').src=defaultPhoto;document.getElementById('profilePictureProfile').onerror=null}}/>
                        <h2>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h2>
                        <h4 style={{marginBottom:'0px'}}>Location:</h4>
                        <p>{this.props.currentUser.location}</p>
                        <h4 style={{marginBottom:'0px'}}>Member Since:</h4>
                        <p>{this.formatDate(this.props.currentUser.dateCreated)}</p>
                        <Link to='/settings' className='ui button enlarge-on-hover' style={{color:'white', backgroundColor:'#1A8D1A', marginTop:'2rem'}}>Edit Profile</Link>
                    </div>
                    <div className='eleven wide column'>
                        <Link to='/favorites' style={{color:'black'}}><h3><i className='ui icon heart' style={{color:'red'}}></i>Favorite Trails ({this.props.currentUser.wishList.length})</h3></Link>
                        {this.renderTrails('wishList')}
                        <Link to='/completed' style={{color:'black'}}><h3><i className='ui icon circle check' style={{color:'green'}}></i>Completed Trails ({this.props.currentUser.completed.length})</h3></Link>
                        {this.renderTrails('completed')}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return({
        currentUser: state.currentUser
    })
}

export default connect(mapStateToProps)(Profile)