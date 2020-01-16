import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'
import UserAvatar from './UserAvatar'

const logo = 'https://i.imgur.com/efdCKOK.jpg'
// const logo = require('../assets/Logo.jpg')


class Header extends React.Component {

    renderButtons(){
        if(!this.props.currentUser){
            return(
                <>
                    <LogInModal/>
                    <SignUpModal/>
                </>
            )
        }else{
            return(
                <>
                    <Link className='ui item button-hover' to='/' style={{fontSize:'1.15rem', backgroundColor:'none'}}><i className='plus icon' style={{color:'black'}}></i>New Search</Link>
                    <Link className='ui item button-hover' to='/favorites' style={{fontSize:'1.15rem', backgroundColor:'none'}}><i className='heart icon' style={{color:'red'}}></i>Favorites</Link>
                    <Link className='ui item button-hover' to='/completed' style={{fontSize:'1.15rem', backgroundColor:'none'}}><i className='check circle icon' style={{color:'green'}}></i>Completed</Link>
                    <UserAvatar/>
                </>
            )
        }
    }

    render(){
        return(
            <div className='ui secondary menu'>
                <Link className="item button-hover" to='/' style={{backgroundColor:'none'}}>
                    <img src={logo} alt='logo'/>
                    <h3 style={{margin:'auto 10px'}}>Trail Finder</h3>
                </Link>
                <Link className='button-hover' style={{alignSelf:'center', color:'black'}} to='/about'>About</Link>
                <div className='right menu'>
                    {this.renderButtons()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        currentUser: state.currentUser
    })
}

export default connect(mapStateToProps)(Header)