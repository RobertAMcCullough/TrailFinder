import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { toggleWishlist, toggleComplete, openModal } from '../actions'

class TodoCompleteButtons extends React.Component {

    //removes gray background when buttons are used outside card
    backgroundStyle = this.props.backgroundColor === 'white' ? {cursor:'pointer', display:'flex'} : {display:'flex', padding:'0'}
    backgroundClass = this.props.backgroundColor === 'white' ? '' : 'ui bottom attached button'


    //colors buttons based on type (red or green) and whether they are selected
    buttonStyles(type,trail){
        if(type==='wishList'){
            // if(this.props.user.wishList.length===0) return
            if(this.props.user.wishList.find(el=>el.id===trail.id)){
                return({color:'red'})
            }else{
                return({})
            }
        }else{
            if(this.props.user.completed.find(el=>el.id===trail.id)){
                return({color:'green', marginLeft:'3.5px'})
            }else{
                return({marginLeft:'3.5px'})
            }
        }
    }

    //this changes the color of the icon immediately, otherwise there is a delay between the click and when component is re-rendered
    toggleHeart(trail){
        document.getElementById(`${trail.id}-heart`).style.color === 'red' ? document.getElementById(`${trail.id}-heart`).style.color = '#2C2C2C' : document.getElementById(`${trail.id}-heart`).style.color = 'red'
        this.props.toggleWishlist(trail)
    }

    //this changes the color of the icon immediately, otherwise there is a delay between the click and when component is re-rendered
    toggleCheck(trail){
        document.getElementById(`${trail.id}-check`).style.color === 'green' ? document.getElementById(`${trail.id}-check`).style.color = '#2C2C2C' : document.getElementById(`${trail.id}-check`).style.color = 'green'
        this.props.toggleComplete(trail)
    }

    //creates favorite/complete buttons or login button if user is not logged in
    render(){
        const trail=this.props.trail
        // if logged in
        if(this.props.user){
            return(
                <div className={this.backgroundClass} style={this.backgroundStyle}>
                    <div style = {{width:'49%', padding:'11px 0 11px 21px'}} onClick = {()=>this.toggleHeart(trail)}>
                        <i id={`${trail.id}-heart`} className='heart icon' style={this.buttonStyles('wishList',trail)}></i>
                        Favorites
                    </div>
                    <div style = {{width:'49%', padding:'11px 21px 11px 0'}} onClick = {()=>this.toggleCheck(trail)}>
                        Completed
                        <i id={`${trail.id}-check`} className='check circle icon' style={this.buttonStyles('completed',trail)}></i>
                    </div>
                </div>
            )
        // if not logged in then open login modal
        }else{
            return(
                //localstorage item 'redirectTo' will store the page to redirect to after logging in or signing up, if not on home page
                <div onClick={()=>{this.props.openModal('login',true); localStorage.setItem('redirectTo',this.props.redirectTo)}}>
                    <div className={this.backgroundClass} style={this.backgroundStyle}>
                        <div style = {{width:'100%', padding:'11px 0'}}>
                            <i className='plus icon'></i>
                            Login to add to list
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(null,{toggleComplete,toggleWishlist,openModal})(withRouter(TodoCompleteButtons))