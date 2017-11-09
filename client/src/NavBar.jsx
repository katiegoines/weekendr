import React from 'react'
import { Link } from 'react-router-dom'

// import logo from './images/moveitlogo.png'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<span className="standard">
				<span><Link to="/"><img className='logo' src={require('./images/logo.png')} /></Link></span>
				<Link to="/search">Search</Link>
			</span>
			
			{props.currentUser
				? (
					<span>
						<span className="account">
							<Link to="/profile">My Searches</Link>
							<Link to="/profile/edit">Account Settings</Link>
							<Link to="/logout">Log Out</Link>
						</span>
						
					</span>
				)
				: (
					<span>
						<span className="account">
							<Link to="/login">Log In</Link>
							<Link to="/signup">Sign Up</Link>
						</span>
					</span>
				)
			}
		</div>
	)
}

export default NavBar