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

    editButton() {
        console.log(this.state.currentUser)
        this.props.history.push(`/profile/edit`)
    }

    onRemoveClick(id) {
        // const id = evt
        console.log(id)
        const userID = this.state.currentUser._id
        axios({method: 'delete', url: `/api/users/${userID}/searches/${id}`})
        .then((res) => {
            this.setState({searches: this.state.searches.filter((search) => {
                return search._id !== id
            })})
        })
    }

    savedSearch(search) {
        // console.log(search)
        localStorage.setItem('search', search.search)
        localStorage.setItem('town', search.town)
        this.props.history.push(`/search`)
        console.log(localStorage)
    }

    render() {
        return (
            <div className="profile">
                <div className="container">
                <div className="profile-container">
                <h2>Saved Searches</h2>
                {this.state.searches.map((search, i) => {
                    return (
                        <div className="searches" key={search._id}>
                            <span>{search.town}</span>
                            <button 
                                className="button button-outline searches-button"
                                onClick={this.onRemoveClick.bind(this, search._id)}
                            >
                                x
                            </button>
                            <button className="button button-outline"  onClick={this.savedSearch.bind(this, search)}>Load Search</button>

                        </div>
                    )
                })}
                </div>
                {<button onClick={this.editButton.bind(this)}>Edit Profile</button>}

                </div>
            </div>
        )
    }
}

export default Profile