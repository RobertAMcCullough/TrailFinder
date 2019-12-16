//This component contains code for optional pagination, which has been commented out
//This component renders the trail list and the map for search results, favorite, and completed pages
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Sticky } from 'semantic-ui-react'
// import { Grid, Sticky, Pagination } from 'semantic-ui-react'
import { extendedInfo } from '../actions'

import TrailList from './TrailList'
import Map from './Map'
import SubHeader from './SubHeader'



class TrailWithMap extends React.Component {
    
    contextRef = React.createRef() //for Sticky component

    // state = {
    //     activePage: 1
    // }
    
    // //number trails displayed per page:
    // trailsPerPage = 5

    //trail prop is the trails array sliced for pagination
    // trailProp = this.props.trails.slice((this.state.activePage-1)*this.trailsPerPage,this.state.activePage*this.trailsPerPage)

    componentDidMount(){
        if(this.props.showExtendedInfo===true) this.props.extendedInfo(false)
    }

    renderExtendedInfoButton(){
        if(this.props.showExtendedInfo){
            return(
                <div className='ui button enlarge-on-hover' style={{color:'white', backgroundColor:'#1A8D1A'}} onClick={()=>this.props.extendedInfo(false)}><i className='ui icon map'></i>Show Map</div>
            )
        }else{
            return(
                <div className='ui button enlarge-on-hover' style={{color:'white', backgroundColor:'#1A8D1A', marginBottom:'1rem'}} onClick={()=>this.props.extendedInfo(true)}><i className='ui icon plus'></i>More Info</div>
            )
        }

    }

    render(){
        // let trailProp = this.props.trails.slice((this.state.activePage-1)*this.trailsPerPage,this.state.activePage*this.trailsPerPage)


        return(
            <div>
                <SubHeader headerContent={this.props.headerContent} addDropdown={this.props.addDropdown}/>
                <div ref={this.contextRef}>
                    <Grid>
                        <Grid.Column width={this.props.showExtendedInfo ? 12 : 5}>
                            <TrailList trails={this.props.trails}/>
                            {/* <TrailList trails={trailProp} pageNumber={this.state.activePage} trailsPerPage={this.trailsPerPage}/> */}
                        </Grid.Column>
                        <Grid.Column width={this.props.showExtendedInfo ? 4 : 11}>
                                <Sticky context={this.contextRef} offset={50}>
                                    {this.renderExtendedInfoButton()}
                                    {/* <Map trails={trailProp} pageNumber={this.state.activePage} trailsPerPage={this.trailsPerPage}/> */}
                                    <Map trails={this.props.trails}/>
                                </Sticky> 

                        </Grid.Column> 
                    </Grid>
                </div>
                {/* <div className='ui centered grid' style={{marginTop:'1rem'}}>
                    <Pagination
                        activePage={this.state.activePage}
                        onPageChange={(e, {activePage})=>{this.setState({activePage})}}
                        totalPages={Math.ceil(this.props.trails.length/this.trailsPerPage)}
                    /> 
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return({
        showExtendedInfo: state.extendedInfo
    })
}

export default connect(mapStateToProps,{extendedInfo})(TrailWithMap)