import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route} from 'react-router-dom'

import { fetchUser } from '../actions'

import Header from './Header'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import TrailDetail from './pages/TrailDetail'
import WishList from './pages/WishList'
import Completed from './pages/Completed'
import IncorrectLogin from './pages/IncorrectLogin'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import About from './pages/About'


class App extends React.Component {
    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        return(
            <div className=' main-container'>            
                <div className='ui container' style={{position:'relative'}}>
                    <BrowserRouter>
                        <Route path='/' component={Header}></Route>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/trails' exact component={SearchResults}></Route>
                        <Route path='/trails/:id' exact component={TrailDetail}></Route>
                        <Route path='/favorites' exact component={WishList}></Route>
                        <Route path='/completed' exact component={Completed}></Route>
                        <Route path='/incorrectLogin' exact component={IncorrectLogin}></Route>
                        <Route path='/settings' exact component={Settings}></Route>
                        <Route path='/profile' exact component={Profile}></Route>
                        <Route path='/about' exact component={About}></Route>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.currentUser
    })
}

export default connect(mapStateToProps, {fetchUser})(App)