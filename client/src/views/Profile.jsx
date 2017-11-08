import React from 'react'
import axios from 'axios'
import clientAuth from '../clientAuth'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {currentUser: clientAuth.getCurrentUser()/*, props: props*/}
    }
    
    componentDidMount() {
        // const id = this.state.currentUser._id
        // // console.log(this.state)
        // axios({method: "get", url:`/api/users/${id}`})
        // .then((res) => {
        //     // console.log(res)
        //     this.setState({currentUser: res.data})
        // })
    }

    editButton() {
        const id = this.state.currentUser._id
        console.log(this.state.currentUser)
        this.props.history.push(`/profile/edit`)
    }

    render() {
        return (
            <div className="profile">
                
                <h1>{this.state.currentUser.name}'s Profile</h1>
                <button onClick={this.editButton.bind(this)}>Edit Profile</button>

            </div>
        )
    }
}

export default Profile