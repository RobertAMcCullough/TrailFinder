import React from 'react'
import { connect } from 'react-redux'

import TrailWithMap from '../TrailWithMap'

class Completed extends React.Component {
    componentDidMount(){
        document.title = 'Trail Finder | Completed Trails'
    }

    headerContent(){
        if(!this.props.user) return ''
        if(this.props.user.wishList.length===0) return 'No Completed Trails Yet'
        // return `${this.props.user.name ? this.props.user.name + "'s" : 'Your'} Completed Trails`
        return `Your Completed Trails`
    }

    render(){
        if(!this.props.user) return(<div>Log in to see completed trails</div>)
        return(
            <div>
                <TrailWithMap trails={this.props.user.completed} headerContent={this.headerContent()}/>             
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.currentUser
    })
}

export default connect(mapStateToProps)(Completed)