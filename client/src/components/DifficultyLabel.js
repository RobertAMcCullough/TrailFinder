import React from 'react'

class DifficultyLabel extends React.Component {

    convertLabel(){
        switch(this.props.difficulty) {
            case ('green'):
                return({label:'Easy',color:'green'})
            case ('greenBlue'):
                return({label:'Easy',color:'green'})
            case ('blue'):
                return({label:'Intermediate',color:'blue'})
            case ('blueBlack'):
                return({label:'Intermediate',color:'blue'})
            case ('black'):
                return({label:'Difficult',color:'black'})
            default:
                return({label:'Loading',color:'white'})
        }
    }

    style={
        width:'100%',
        backgroundColor:this.convertLabel().color,
        color:'white',
        textTransform:'uppercase',
        textAlign:'center',
        fontWeight:'bold',
        padding:'5px',
        borderRadius:'5px'
    }

    render(){
        return(
            <div style={this.style}>
                {this.convertLabel().label}
            </div>
        )
    }
}

export default DifficultyLabel