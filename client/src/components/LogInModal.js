import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import { openModal } from '../actions'

class LogInModal extends React.Component {

    render(){
        return(
            <Modal 
                size='mini' 
                trigger={<button onClick={()=>this.props.openModal('login',true)} className='ui primary button enlarge-on-hover' style={{margin:'auto 5px auto auto', backgroundColor:'#1A8D1A'}}>Log In</button>}
                open={this.props.isOpen}
                onClose={()=>this.props.openModal('login',false)}
                >
                <Modal.Content>
                    <Modal.Description>
                        <div style={{textAlign:'center', width:'80%', margin:'0 auto'}}>                                    
                            <h1>Log In</h1>
                            <p>Welcome back. Log in below.</p>
                            <a className="ui primary button google" href='/auth/google' style={{margin:'10px 5px auto auto', width:'100%', backgroundColor:'#D3472C'}}><i className="google icon"/>Log in with Google</a>
                            <a className="ui primary button facebook" href='/auth/facebook' style={{margin:'10px 5px auto auto', width:'100%', backgroundColor:'#3D64A5'}}><i className="facebook icon"/>Log in with Facebook</a>
                            <div className='ui horizontal divider'>OR</div>
                            <form className='ui form' method='post' action='/auth/login' autoComplete='off'>
                                <div className='field'>
                                    <input name='username' type='text' placeholder='Username'/>
                                </div>
                                <div className='field'>
                                    <input name='password' type='password' placeholder='Password'/>
                                </div>
                                <button className='ui primary submit button' type='submit' style={{width:'100%'}}>Log In</button>
                            </form>
                            <div style={{marginTop:'20px'}}><button className='button-link' style={{cursor:'pointer'}} onClick={()=>this.props.openModal('signup',true)}>Need to create an account?</button></div>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        isOpen: state.openModal.login
    })
}

export default connect(mapStateToProps,{openModal})(LogInModal)