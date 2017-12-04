import React from 'react'

import Brunch from './results/Brunch'
import Lunch from './results/Lunch'
import Dinner from './results/Dinner'
import YelpShopping from './results/YelpShopping'
import Music from './results/Music'

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // loading: false, 
            error: false,
            tileView: true,
            // town: '',
            // lat: '',
            // lon: '',
            fromForm: ''
        }
    }

    componentDidMount() {
        this.setState({fromForm: this.props.fromForm})
    }

    componentDidUpdate() {
        if(this.state.tileView !== this.props.tileView) {
            this.setState({tileView: this.props.tileView})
        }
    }

	render() {
        const s = this.state
        return (


            <div className="results">
                <span>
                    <span>
                        {!!s.tileView
                            ? <div><button onClick={this.tileView}>Switch to List View</button></div>
                            : <div><button onClick={this.tileView}>Switch to Tile View</button></div>}
                    </span>
                 
                    <span>
                        {!!s.run && !!s.fromForm.brunch
                            ? <Brunch 
                                {...this.props} 
                                run={s.run} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }
        
                        {!!s.run && !!s.fromForm.lunch
                            ? <Lunch 
                                {...this.props} 
                                run={s.run} search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView}  />
                            : null
                        }
        
                        {!!s.run && !!s.fromForm.dinner
                            ? <Dinner 
                                {...this.props} 
                                run={s.run} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView}  />
                            : null
                        }
        
                        {/* {!!s.run && !!s.fromForm.shopping
                            ? <YelpShopping 
                                {...this.props} 
                                run={s.run} 
                                search={s.fromForm.search} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        }
                        
                        {!!s.run && !!s.fromForm.music
                            ? <Music 
                                {...this.props} 
                                run={s.run} 
                                search={s.fromForm.search} 
                                startDate={s.fromForm.startDate} 
                                endDate={s.fromForm.endDate} 
                                quantity={s.fromForm.quantity} 
                                tileView={s.tileView} />
                            : null
                        } */}
                    </span>
                </span>
            </div>  
            
        )
    }
}

export default Results