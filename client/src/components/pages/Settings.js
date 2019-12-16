import React from 'react'
import { connect } from 'react-redux'

const defaultPhoto = require('../../assets/missing-avatar.png')


class Settings extends React.Component{
    state = {
        units: 'imperial'
    }

    componentDidMount(){
        document.title = 'Trail Finder | Settings'
    }

    render(){
        if(!this.props.currentUser) return <div>Loading...</div>

        return(
            <div>
                <div className='ui divider' style={{marginTop:'-1rem'}}></div>
                <h2 style={{textAlign:'center', margin:'3rem'}}>User Settings</h2>
                <div className='ui grid'>
                    <div className='five wide column' style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
                        <img alt='Profile' id='profilePictureSettings' style={{width:'200px', height:'200px', objectFit:'cover', borderRadius:'50%'}} src={this.props.currentUser.photo} onError={()=>{document.getElementById('profilePictureSettings').src=defaultPhoto;document.getElementById('profilePictureSettings').onerror=null}}/>
                        {/* <img style={{width:'200px', borderRadius:'50%'}} src={this.props.currentUser.photo==='none' ? defaultPhoto : this.props.currentUser.photo}/> */}
                        <h2>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h2>
                    </div>
                    <div className='eleven wide column'>
                        <form method='post' action='/api/updateUser' className="ui form" style={{width:'70%'}} autoComplete='off'>
                            <div className="two fields">
                                <div className="field">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" defaultValue={this.props.currentUser.firstName} placeholder='First Name'/>
                                </div>
                                <div className="field">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" defaultValue={this.props.currentUser.lastName} placeholder='Last Name'/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Location</label>
                                <input type="text" name="location" defaultValue={this.props.currentUser.location} placeholder='Location'/>
                            </div>
                            <div className="field">
                                <label>Profile Photo URL</label>
                                <input type="text" name="photo" defaultValue={this.props.currentUser.photo} placeholder='Profile Photo URL'/>
                            </div>
                            <button className='ui button enlarge-on-hover' style={{color:'white', backgroundColor:'#1A8D1A', marginTop:'2rem'}} type="submit">Submit</button>
                        </form>
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

export default connect(mapStateToProps)(Settings)