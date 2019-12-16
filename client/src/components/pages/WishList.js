import React from 'react'
import { connect } from 'react-redux'

import TrailWithMap from '../TrailWithMap'

class WishList extends React.Component {
    componentDidMount(){
        document.title = "Trail Finder | Favorites"
    }

    headerContent(){
        if(!this.props.user) return ''
        if(this.props.user.wishList.length===0) return 'No Trails Added To Favorite List Yet'
        // return `${this.props.user.name ? this.props.user.name + "'s" : 'Your'} Favorite List`
        return `Your Favorite Trails`
    }

    render(){
        if(!this.props.user) return(<div>Log in to see favorite trails</div>)
        return(
            <div>
                <TrailWithMap trails={this.props.user.wishList} headerContent={this.headerContent()}/>             
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.currentUser
    })
}

export default connect(mapStateToProps)(WishList)