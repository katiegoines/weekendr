import React from 'react'
import photo1 from '../images/1.jpg'
import photo2 from '../images/2.jpg'
import photo3 from '../images/3.jpg'
import photo4 from '../images/4.jpg'
import photo5 from '../images/5.jpg'
import photo6 from '../images/6.jpg'
import photo7 from '../images/7.jpg'
import photo8 from '../images/8.jpg'
import photo9 from '../images/9.jpg'

var i = 0

class Home extends React.Component {
	state = {
		slides: [
			photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9
			
		],
		currentPhoto: ''
	}

	componentDidMount() {
		this.getImage(0)
		this.interval = setInterval(() => {
			this.changeIndex()
		}, 5000)
	}

	changeIndex() {
		if(i < this.state.slides.length - 1) {
			++i
		} else {
			i = 0
		}
		this.getImage(i)
	}

	getImage(i) {
		this.setState({currentPhoto: this.state.slides[i]})
	}

	search() {
		this.props.history.push(`/search`)
	}

	signUp() {
		this.props.history.push(`/signup`)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div className='Home'>
				{/* <h1> Move It! </h1> */}
				<div className="home-background-box">
					<img className="home-background .object-fit_cover" src={this.state.currentPhoto} alt="" />
					<div className="home-title-box">
						<div><h2 className="home-title">move it!</h2></div>
						{/* <div className="home-title"><img src={require('../images/logo-bg.png')} /></div> */}
						<div className="home-body">
							<p>Thinking about starting fresh in a brand new city? Before you pack your boxes, set your sights on the right fit. <strong>Let's explore!</strong></p>
							<ol>
								<li><em><strong>Search</strong></em> for cities that pique your interest and checkout an overview of what you might find when you get there.</li>
								<li><em><strong>Sign Up</strong></em> for an account so you can save your searches to revisit later.</li>
							</ol>
							<div className="home-buttons">
								<button onClick={this.search.bind(this)}className="button button-outline">Search</button>
								<button onClick={this.signUp.bind(this)}className="button button-outline">Sign Up</button>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}



// const Home = (props) => {
// 	return (
// 		<div className='Home'>
// 			<h1>Move It</h1>
// 		</div>
// 	)
// }


export default Home