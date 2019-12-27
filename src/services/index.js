import DeviceService from './device';
import ScheduleService from './schedule';
import MockupServices from '../../data'

let api = process.env.REACT_APP_API;

export default (process.env.mockup) ? MockupServices : {
	device: new DeviceService(api),
	schedule: new ScheduleService(api)
};