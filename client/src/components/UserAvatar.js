import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const defaultPhoto = require('../assets/missing-avatar.png')

class UserAvatar extends React.Component{
    
    trigger = (
        <div style={{display:'flex', alignItems:'center'}}>
            <img alt='Profile' id='profilePictureAvatar' style={{height:'2.5rem', width:'2.5rem', objectFit:'cover', borderRadius:'100px'}} src={this.props.currentUser.photo} onError={()=>{document.getElementById('profilePictureAvatar').src=defaultPhoto;document.getElementById('profilePictureAvatar').onerror=null}}/>
            <span style={{marginLeft:'.8rem', fontSize:'1.15rem'}}>{this.props.currentUser ? this.props.currentUser.firstName : null}</span>
        </div>
    )

    // <a className="ui primary button google" href='/api/logout' style={{margin:'auto 5px auto auto'}}><i className="google icon"/>Sign Out {this.props.currentUser.firstName}</a>

    options = [
        { key: 'user', text: 'Your Profile',  as: Link, to:'/profile'},
        { key: 'settings', text: 'Account Settings', as: Link, to:'/settings'},
        { key: 'sign-out', text: 'Sign Out', as:'a', href:'/api/logout'},
    ]

    render(){
        return(
            <Dropdown className='enlarge-on-hover' style={{alignSelf:'center', margin:'0 1.5rem'}}
                trigger={this.trigger}
                options={this.options}
                icon={null}
            />
        )
    }
}

const mapStateToProps = state => {
    return({
        currentUser: state.currentUser
    })
}

export default connect(mapStateToProps, null)(UserAvatar)