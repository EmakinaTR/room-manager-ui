import React from 'react';
import Header from '../header';
import Status from '../status';
import Timeline from '../timeline';
import injectServices from '../../services/inject';
import './index.scss';

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			events: [],
			current: null,
			next: null,
			isOptsVisible: false,
			isLoading: true,
			isConnected: true,
			hasError: false
		};
	}

	componentWillUnmount () {
		clearInterval(this.timer);
	}

	componentDidMount () {
		this.getSchedule(() => this.setState({ isLoading: false }));
		this.timer = setInterval(() => this.getSchedule(), this.props.refresh);
	}

	getSchedule (callback) {
		let id = this.props.id,
			schedule = this.props.services.schedule;

		schedule.getToday(id).then((events) => {
			let current = schedule.getCurrentEvent(),
				next = schedule.getNextEvent();

			// Hide options
			if (current && this.state.isOptsVisible) {
				this.toggleOptions(false);
			}

			// Update stuff
			this.setState({
				next: next,
				current: current,
				events: (events) ? events : this.state.events,
				isConnected: Boolean(events)
			});

			if (callback instanceof Function) {
				callback();
			}
		});
	}

	toggleOptions (state) {
		this.setState({ isOptsVisible: state });

		// Hide options on a timeout
		if (state === true) {
			this.timeout = setTimeout(() => this.setState({
				isOptsVisible: false,
				hasError: false
			}), this.props.timeout);
		} else if (this.timeout) {
			clearTimeout(this.timeout);
			this.setState({ hasError: false });
		}
	}

	sendBookingRequest (mins) {
		let id = this.props.id,
			schedule = this.props.services.schedule;

		this.setState({ isLoading: true });

		schedule.sendBookingRequest(id, mins).then((data) => {
			if (data) {
				this.setState({
					isLoading: false,
					current: schedule.addNewEvent(data)
				});
				this.toggleOptions(false);
			} else {
				this.setState({
					isLoading: false,
					hasError: 'Room unavailable'
				});
			}
		}).catch((err) => {
			this.setState({
				isLoading: false,
				hasError: 'Network unreachable'
			});
		});
	}

	render () {
		return (
			<main className={(this.state.current ? 'occupied' : '')}>
				<Header
					current={this.state.current}
					title={this.props.title}
					isOptsVisible={this.state.isOptsVisible}
					isLoading={this.state.isLoading}
					isConnected={this.state.isConnected}
					toggleOptions={this.toggleOptions.bind(this)} />
				<Status
					next={this.state.next}
					current={this.state.current}
					title={this.props.title}
					isOptsVisible={this.state.isOptsVisible}
					isLoading={this.state.isLoading}
					hasError={this.state.hasError}
					sendBookingRequest={this.sendBookingRequest.bind(this)} />
				<Timeline events={this.state.events} />
			</main>
		);
	}
};

export default injectServices(App);