import React from 'react';
import { inject, observer } from 'mobx-react';
import titleize from 'titleize';
import './index.scss';

@inject('store')
@observer
class Header extends React.Component {
	constructor (props) {
		super(props);
		this.aidx = 0;
	}

	cycleAccentColours () {
		let root = document.documentElement,
			colours = ['#0099ff', '#33cc66', '#ffaa33', '#ff00ff'];

		this.aidx++;

		if (this.aidx > colours.length - 1) {
			this.aidx = 0;
		}

		root.style.setProperty('--accent-color', colours[this.aidx]);
	}

	toggleOptions (state) {
		this.props.store.toggleOptions(state);
	}

	renderBookingControls () {
		return (this.props.store.isBooking)
			? <button
				className="cancel"
				onClick={() => this.toggleOptions(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.toggleOptions(true)}>Start a meeting</button>;
	}

	render () {
		let option,
			current = this.props.store.current,
			room = this.props.store.room;

		if (current) {
			option = <p>{ current.contact || titleize(room.title) }</p>;
		} else if (this.props.store.isLoading) {
			option = <p>&nbsp;</p>;
		} else {
			option = this.renderBookingControls();
		}

		return (
			<header>
				<div className="logo"
					onClick={() => this.cycleAccentColours()} />
				<span className="connection"
					data-status={this.props.store.isConnected} />
				<div className="controls">{ option }</div>
			</header>
		);
	}
};

export default Header;