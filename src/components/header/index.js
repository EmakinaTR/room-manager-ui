import React from 'react';
import './index.scss';

class Header extends React.Component {
	setBooking (state) {
		this.props.setBooking(state);
	}

	renderBookingControls () {
		return (this.props.isBooking)
			? <button
				className="cancel"
				onClick={() => this.setBooking(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.setBooking(true)}>Book a meeting</button>;
	}

    render () {
    	let current = this.props.current,
    		title = this.props.title,
    		option;

    	if (this.props.isPosting) {
    		option = <p className="contact">Saving&hellip;</p>;
    	} else if (current) {
    		option = <p className="contact">{ current.contact || title }</p>;
    	} else {
    		option = this.renderBookingControls();
    	}

		return (
			<header>
				<div className="logo" />
				<div className="logo--white" />
				<div className="option">{ option }</div>
			</header>
		);
	}
};

export default Header;