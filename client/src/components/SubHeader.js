//Produces list of trail thumbnails, trails to display are passed in as prop 'trails'
import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Grid } from 'semantic-ui-react'

import { sortBy, searchTrails, refreshMap } from '../actions'

class SubHeader extends React.Component {

    //for search results page, we will also add a dropdown for number of search results
    renderDropdown(){
        const options = [
            {key: '10', value: 10, text: '10'},
            {key: '20', value: 20, text: '20'},
            {key: '30', value: 30, text: '30'},
            {key: '40', value: 40, text: '40'},
            {key: '50', value: 50, text: '50'}
        ]

        return(
            <Dropdown placeholder='Number of Results' selection options={options} onChange={(e, data)=>this.props.searchTrails(data.value)}/>
        )
    }

    //subheader contains sortby dropdown and text heading
    renderSubHeader(){
        const options = [
            {key: 'length', value: 'length', text: 'Distance'},
            {key: 'stars', value: 'stars', text: 'Rating'},
            // {key: 'difficulty', value: 'difficulty', text: 'Difficulty'},
            {key: 'name', value: 'name', text: 'Name'}
        ]

        const onDropdownChange = (val) => {
            this.props.sortBy(val)
            this.props.refreshMap(true)
        }

        return(
            <>
            <div className='ui divider' style={{marginTop:'-1rem'}}></div>
            <Grid>
                <Grid.Column width={6}>
                    <Dropdown placeholder='Sort by' selection options={options} onChange={(e, data)=>onDropdownChange(data.value)}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                        <h2 style={{textAlign:'center', textTransform:'capitalize'}}>{this.props.headerContent}</h2>
                        {this.props.addDropdown ? this.renderDropdown() : <></>}
                    </div>
                </Grid.Column> 
            </Grid>
            </>


            // <div className='ui secondary menu' style={{alignItems:'center'}}>
            //     <div style={{position:'absolute'}}>
            //         <Dropdown placeholder='Sort by' selection options={options} onChange={(e, data)=>this.props.sortBy(data.value)}/>
            //     </div>
            //     <h2 style={{margin:'12px auto 20px auto'}}>{this.props.headerContent}</h2>
            // </div>
        )
    }

    render(){
        return(
            <div style={{marginBottom:'15px'}}>
                {this.renderSubHeader()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return({
        user : state.currentUser
    })
}

export default connect(mapStateToProps,{sortBy, searchTrails, refreshMap})(SubHeader)