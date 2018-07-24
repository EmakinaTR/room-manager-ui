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
        	schedule: null,
            current: null,
            next: null,
            isBooking: false,
            isLoading: true
        };
    }

    componentWillUnmount () {
        clearInterval(this.timer);
    }

    componentDidMount () {
    	let room = this.props.room,
            schedule = this.props.services.schedule,
            getCurrentEvent = () => schedule.getCurrentEvent(room).then((event) => {
                this.setState({
                    current: event,
                    isBooking: (event) ? false : this.state.isBooking
                });
            }),
            getNextEvent = () => schedule.getNextEvent(room).then((event) => {
                this.setState({ next: event });
            });

        // Fetch schedule
        schedule.getEvents(room).then((events) => {
            this.setState({ schedule: events });
            getCurrentEvent();
            getNextEvent();
            setTimeout(() => this.setLoading(false), 999);
        });

        // Refresh at an interval
        this.timer = setInterval(() => {
            // TODO: if new day, get schedule
            getCurrentEvent();
        }, this.props.refresh);
	}

    setBooking (state) {
        this.setState({ isBooking: state });

        if (state === true) {
            this.timeout = setTimeout(() =>
                this.setState({ isBooking: false }), this.props.timeout);
        } else if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    setLoading (state) {
        this.setState({ isLoading: state });
    }

    sendRequest (mins) {
        let room = this.props.room,
            schedule = this.props.services.schedule;

        this.setLoading(true);

        schedule.sendBookingRequest(room, mins).then((success) => {
            if (success) {
                schedule.getEvents(room).then((events) => {
                    this.setState({ schedule: events });
                    schedule.getCurrentEvent(room).then((event) => {
                        this.setState({ current: event });
                    });
                });
            }

            this.setBooking(false);
            this.setLoading(false);
        });
    }

    render () {
    	return (!this.state.schedule) ? null : (
			<main className={(this.state.current ? 'busy' : '')}>
				<Header
                    title={this.props.title}
                    current={this.state.current}
                    isBooking={this.state.isBooking}
                    isLoading={this.state.isLoading}
                    setBooking={this.setBooking.bind(this)} />
				<Status
                    title={this.props.title}
                    next={this.state.next}
                    current={this.state.current}
                    isBooking={this.state.isBooking}
                    isLoading={this.state.isLoading}
                    setBooking={this.setBooking.bind(this)}
                    sendRequest={this.sendRequest.bind(this)} />
				<Timeline schedule={this.state.schedule} />
			</main>
		);
	}
};

export default injectServices(App);