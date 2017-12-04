import React from 'react'
import axios from 'axios'

import Brunch from './results/Brunch'
import Lunch from './results/Lunch'
import Dinner from './results/Dinner'
import Music from './results/Music'

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // loading: false, 
            run: true,
            error: false,
            tileView: true,
            // town: '',
            // lat: '',
            // lon: '',
            fromForm: ''
        }
        this.tileView = this.tileView.bind(this) 
        this.newSearch = this.newSearch.bind(this)     
        this.backSearch = this.backSearch.bind(this)  
        this.saveSearch = this.saveSearch.bind(this)  
    }

    componentDidMount() {
        this.setState({fromForm: this.props.fromForm})
    }

    tileView() {
        this.setState({tileView: !this.state.tileView})
        console.log(this.state.tileView)
    }

    newSearch() {
        // this.setState({run: false})
        localStorage.removeItem('saved')
        localStorage.removeItem('search')
        localStorage.removeItem('startDate')
        localStorage.removeItem('endDate')
        localStorage.removeItem('brunch')
        localStorage.removeItem('lunch')
        localStorage.removeItem('dinner')
        localStorage.removeItem('shopping')
        localStorage.removeItem('music')
        localStorage.removeItem('quantity')
        const onNewSearch = this.props.onNewSearch
        onNewSearch(false)
    }

    backSearch() {
        const onBackSearch = this.props.onBackSearch
        onBackSearch(false)
    }

    saveSearch() {
        const id = this.props.currentUser._id
        console.log('clicked')
        axios({
            method: 'post', 
            url: `/api/users/${id}/searches`, 
            data: {
                search: localStorage.getItem('search'),
                startDate: localStorage.getItem('startDate'),
                endDate: localStorage.getItem('endDate'),
                brunch: JSON.parse(localStorage.getItem('brunch')),
                lunch: JSON.parse(localStorage.getItem('lunch')),
                dinner: JSON.parse(localStorage.getItem('dinner')),
                shopping: JSON.parse(localStorage.getItem('shopping')),
                music: JSON.parse(localStorage.getItem('music')),
                quantity: JSON.parse(localStorage.getItem('quantity'))
            }
        })
        .then((res) => {
            this.props.history.push(`/profile`)
        })
    }

	render() {
        const s = this.state
        return (
            <div className="results">
                <span>
                    <div>
                        {!!s.tileView
                            ? <span><button onClick={this.tileView}>Switch to List View</button></span>
                            : <span><button onClick={this.tileView}>Switch to Tile View</button></span>
                        }
                        <span><button onClick={this.newSearch}>New Search</button></span>
                        <span><button onClick={this.backSearch}>Back to Search</button></span>
                        {!!this.props.currentUser
                            ? <span><button onClick={this.saveSearch}>Save Search</button></span>
                            : null
                        }
                        
                    </div>
                 
                    <span>
                        {!!s.fromForm.brunch
                            ? <Brunch 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }
        
                        {!!s.fromForm.lunch
                            ? <Lunch 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView}  />
                            : null
                        }
        
                        {!!s.fromForm.dinner
                            ? <Dinner 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView}  />
                            : null
                        }
                        
                        {!!s.fromForm.music
                            ? <Music 
                                {...this.props} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }
                    </span>
                </span>
            </div>  
            
        )
    }
}

export default Results