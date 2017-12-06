import React from 'react'
import axios from 'axios'

import Antiques from './results/Antiques'
import Breweries from './results/Breweries'
import Brunch from './results/Brunch'
import Cafes from './results/Cafes'
import Clubs from './results/Clubs'
import Cocktails from './results/Cocktails'
import Comedy from './results/Comedy'
import Desserts from './results/Desserts'
import Fashion from './results/Fashion'
import FleaMarkets from './results/FleaMarkets'
import FoodStands from './results/FoodStands'
import Hiking from './results/Hiking'
import Media from './results/Media'
import Museums from './results/Museums'
import Music from './results/Music'
import Parks from './results/Parks'
import PerformingArts from './results/PerformingArts'
import Pubs from './results/Pubs'
import Spas from './results/Spas'
import SportingGoods from './results/SportingGoods'
import Sports from './results/Sports'
import Tech from './results/Tech'
import Vegetarian from './results/Vegetarian'
import Wineries from './results/Wineries'
import Zoos from './results/Zoos'

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            run: true,
            error: false,
            tileView: true,
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
    }

    newSearch() {
        // this.setState({run: false})
        localStorage.removeItem('saved')
        localStorage.removeItem('formInfo')
        const onNewSearch = this.props.onNewSearch
        onNewSearch(false)
    }

    backSearch() {
        const onBackSearch = this.props.onBackSearch
        onBackSearch(false)
    }

    saveSearch() {
        const id = this.props.currentUser._id
        // console.log('clicked')
        // console.log(localStorage.getItem('startDate'))
        axios({
            method: 'post', 
            url: `/api/users/${id}/searches`, 
            data: JSON.parse(localStorage.getItem('formInfo'))
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
                    <div className="buttons-bar">
                        {!!s.tileView
                            ? <span><button className="button button-clear" onClick={this.tileView}>Switch to List View</button></span>
                            : <span><button className="button button-clear"  onClick={this.tileView}>Switch to Tile View</button></span>
                        }
                        
                        {!!this.props.currentUser
                            ? <span><button className="button button-clear" onClick={this.saveSearch}>Save Search</button></span>
                            : null
                        }
                        <span><button className="button button-clear"  onClick={this.backSearch}>Back to Search</button></span>
                        <span><button className="button button-clear"  onClick={this.newSearch}>New Search</button></span>
                    </div>
                 
                    <div>
                        {!!s.fromForm.brunch
                            ? <Brunch 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.cafes
                            ? <Cafes 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.vegetarian
                            ? <Vegetarian 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.foodstands
                            ? <FoodStands 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.desserts
                            ? <Desserts 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.breweries
                            ? <Breweries 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }
                        {!!s.fromForm.wineries
                            ? <Wineries 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.cocktails
                            ? <Cocktails 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.pubs
                            ? <Pubs 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.clubs
                            ? <Clubs 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.fashion
                            ? <Fashion 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.antiques
                            ? <Antiques 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.media
                            ? <Media 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.sportinggoods
                            ? <SportingGoods 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.fleamarkets
                            ? <FleaMarkets 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.hiking
                            ? <Hiking 
                                {...this.props} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.museums
                            ? <Museums 
                                {...this.props} 
                                search={s.fromForm.search}
                                lon={s.fromForm.lon} 
                                lat={s.fromForm.lat}
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.zoos
                            ? <Zoos
                                {...this.props} 
                                search={s.fromForm.search}
                                lon={s.fromForm.lon} 
                                lat={s.fromForm.lat}
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.spas
                            ? <Spas 
                                {...this.props} 
                                search={s.fromForm.search}
                                lon={s.fromForm.lon} 
                                lat={s.fromForm.lat}
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.parks
                            ? <Parks 
                                {...this.props} 
                                search={s.fromForm.search}
                                lon={s.fromForm.lon} 
                                lat={s.fromForm.lat}
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
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

                        {!!s.fromForm.sports
                            ? <Sports 
                                {...this.props} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.performingarts
                            ? <PerformingArts
                                {...this.props} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.comedy
                            ? <Comedy 
                                {...this.props} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        {!!s.fromForm.technology
                            ? <Tech 
                                {...this.props} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }

                        
                    </div>
                </span>
            </div>  
            
        )
    }
}

export default Results