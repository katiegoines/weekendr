import React from 'react'
import axios from 'axios'
// import clientAuth from '../clientAuth'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: props}
    }
    
    componentDidMount() {
        const id = this.props.match.params.id
        // console.log(this.state)
        axios({method: "get", url:`/api/users/${id}`})
        .then((res) => {
            // console.log(res)
            this.setState({user: res.data})
        })
    }

    render() {
        return (
            <div className="profile">
                
                <h1>{this.state.user.name}'s Profile</h1>

            </div>
        )
    }
}

export default Profile