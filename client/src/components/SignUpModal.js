import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import { openModal } from '../actions'

class SignUpModal extends React.Component {
    render(){
        return(
            <Modal 
                size='mini' 
                trigger={<button onClick={()=>this.props.openModal('signup',true)} className='ui primary button enlarge-on-hover' style={{margin:'auto 5px auto auto', backgroundColor:'#1A8D1A'}}>Sign Up</button>}
                open={this.props.isOpen}
                onClose={()=>this.props.openModal('signup',false)}
                >
                <Modal.Content>
                    <Modal.Description>
                        <div style={{textAlign:'center', width:'80%', margin:'0 auto'}}>                                    
                            <h1>Sign Up</h1>
                            <p>Welcome. Sign up below.</p>
                            <a className="ui primary button google" href='/auth/google' style={{margin:'10px 5px auto auto', width:'100%', backgroundColor:'#D3472C'}}><i className="google icon"/>Sign up with Google</a>
                            {/* <a className="ui primary button facebook" href='/auth/facebook' style={{margin:'10px 5px auto auto', width:'100%', backgroundColor:'#3D64A5'}}><i className="facebook icon"/>Sign up with Facebook</a> */}
                            <a className="ui primary button twitter" href='/auth/twitter' style={{margin:'10px 5px auto auto', width:'100%', backgroundColor:'##1DA1F2'}}><i className="twitter icon"/>Sign up with Twitter</a>
                            <div className='ui horizontal divider'>OR</div>
                            <form className='ui form' method='post' action='/auth/signup' autoComplete='off'>
                                <div className='field'>
                                    <input name='username' type='text' placeholder='Username'/>
                                </div>
                                <div className='field'>
                                    <input name='password' type='password' placeholder='Password'/>
                                </div>
                                <div className='field'>
                                    <input name='firstName' type='text' placeholder='First Name'/>
                                </div>
                                {/* <div className='field'>
                                    <input name='lastName' type='text' placeholder='Last Name'/>
                                </div> */}
                                <button className='ui primary submit button' type='submit' style={{width:'100%'}}>Sign Up</button>
                            </form>
                            <div style={{marginTop:'20px'}}><button className='button-link' onClick={()=>this.props.openModal('login',true)}>Already have an account?</button></div>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        isOpen: state.openModal.signup
    })
}

export default connect(mapStateToProps,{openModal})(SignUpModal)