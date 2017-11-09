import React from 'react'
// import { Slide } from 'react-slideshow-image'

var i = 0

class Home extends React.Component {
	state = {
		slides: ["http://cdn.pcwallart.com/images/city-street-wallpaper-4.jpg", "https://az616578.vo.msecnd.net/files/2017/04/29/6362909284683122491909360232_gif%201111.jpg", "https://assets3.thrillist.com/v1/image/2639468/size/tl-full_width_tall_mobile.jpg" ],
		currentPhoto: ''
	}

	componentDidMount() {
		this.getImage(0)
		this.interval = setInterval(() => {
			this.changeIndex()
		}, 5000)
	}

	changeIndex() {
		if(i < this.state.slides.length -1) {
			++i
		} else {
			i = 0
		}
		this.getImage(i)
	}

	getImage(i) {
		this.setState({currentPhoto: this.state.slides[i]})
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div className='Home'>
				<h1> Move It! </h1>
				<div className="home-background-box">
					{<img className="home-background" src={this.state.currentPhoto} alt="" />}
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