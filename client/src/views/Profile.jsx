import React from 'react'
import axios from 'axios'


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: this.props.currentUser,
            searches: []
        }
    }
    
    componentDidMount() {
        const id = this.state.currentUser._id
        axios({method: "get", url:`/api/users/${id}`})
        .then((res) => {
            this.setState({currentUser: res.data})
        })
        axios({method: 'get', url: `/api/users/${id}/searches`})
        .then((res) => {
            this.setState({searches: res.data})
        })
    }

    editButton() {
        this.props.history.push(`/profile/edit`)
    }

    onRemoveClick(id) {
        const userID = this.state.currentUser._id
        axios({method: 'delete', url: `/api/users/${userID}/searches/${id}`})
        .then((res) => {
            this.setState({searches: this.state.searches.filter((search) => {
                return search._id !== id
            })})
        })
    }

    savedSearch(search) {
        localStorage.setItem('search', search.search)
        localStorage.setItem('town', search.town)
        this.props.history.push(`/search`)
    }

    render() {
        return (
            <div className="profile">
                <div className="container">
                <div className="profile-container">
                <h2>Hi, {this.state.currentUser.name}</h2>
                {this.state.searches.map((search, i) => {
                    return (
                        <div className="searches" key={search._id}>
                            <span>{search.town}</span>
                            <button 
                                className="button button-outline searches-button"
                                onClick={this.onRemoveClick.bind(this, search._id)}>x
                            </button>
                            <button className="button button-outline"  onClick={this.savedSearch.bind(this, search)}>Load Search</button>

                        </div>
                    )
                })}
                </div>
                {<button className="button button-outline" onClick={this.editButton.bind(this)}>Edit Profile</button>}

                </div>
            </div>
        )
    }
}

export default Profile