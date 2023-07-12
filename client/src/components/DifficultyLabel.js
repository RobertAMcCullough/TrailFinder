import React from 'react'

class DifficultyLabel extends React.Component {

    convertLabel(){
        switch(this.props.difficulty) {
            case ('Beginner'):
                return({label:'Beginner',color:'green'})
            case ('Intermediate'):
                return({label:'Intermediate',color:'blue'})
            case ('Advanced'):
                return({label:'Advanced',color:'black'})
            case (''):
                return({label:'Beginner',color:'green'})
            default:
                return({label:this.props.difficulty,color:'green'})
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