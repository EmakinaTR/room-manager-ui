import DeviceService from '../src/services/device';
import RoomEntity from '../src/entities/room';

export default class DeviceServiceMockup extends DeviceService {
	getRoomDetails (mac) {
		return Promise.resolve(new RoomEntity({
			id: Infinity,
			title: 'Jupiter'
		}));
	}
}