import React from 'react'

import Brunch from './results/Brunch'
import Lunch from './results/Lunch'
import Dinner from './results/Dinner'
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
        this.tileView = this.tileView.bind(this)        
    }

    componentDidMount() {
        this.setState({fromForm: this.props.fromForm})
    }

    tileView() {
        this.setState({tileView: !this.state.tileView})
        console.log(this.state.tileView)
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