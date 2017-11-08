import React from 'react'
import axios from 'axios'
import clientAuth from '../clientAuth'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: clientAuth.getCurrentUser()/*, props: props*/,
            searches: []
        }
    }
    
    componentDidMount() {
        const id = this.state.currentUser._id
        // // console.log(this.state)
        axios({method: "get", url:`/api/users/${id}`})
        .then((res) => {
            // console.log(res)
            this.setState({currentUser: res.data})
        })
        axios({method: 'get', url: `/api/users/${id}/searches`})
        .then((res) => {
            console.log(res.data)
            this.setState({searches: res.data})
        })
    }

    // editButton() {
    //     console.log(this.state.currentUser)
    //     this.props.history.push(`/profile/edit`)
    // }

    deleteSearch(id) {
        // const id = evt.target.parent()
        console.log(id)
    }

    render() {
        return (
            <div className="profile">
                
                <h1>{this.state.currentUser.name}'s Profile</h1>
                {/* <button onClick={this.editButton.bind(this)}>Edit Profile</button> */}
                {this.state.searches.map((search, i) => {
                    return (
                        <li key={i}>{search.search} <button key={search._id} onClick={this.deleteSearch.bind(this)}>x</button></li>
                    )
                })}

            </div>
        )
    }
}

export default Profile