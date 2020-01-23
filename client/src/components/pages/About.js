import React from 'react'

class About extends React.Component{
    componentDidMount(){
        document.title = 'Trail Finder | About'
    }

    render(){
        return(
            <div>
                <div className='ui divider' style={{marginTop:'-1rem'}}></div>
                <div>
                    <p>Trail Finder was built on a MERN stack (MongoDB, Express.js, React, Node.js) by <a href='https://github.com/RobertAMcCullough'>Bob McCullough</a>.</p>
                    <p>Other technologies used include Redux, Google's Geocoding and Maps Javascript APIs, Semantic UI, and Passport.js (Google, Facebook, Twitter, and Local authentication strategies).</p>
                    <p>This website was inspired by <a href='https://www.hikingproject.com'>Hiking Project</a> and makes use of their public <a href='https://www.hikingproject.com/data'>API</a>.</p>
                    <p>Contact Bob via <a href='mailto: robertamccullough@gmail.com'>email</a>.</p>
                </div>
            </div>
        )
    }
}

export default About