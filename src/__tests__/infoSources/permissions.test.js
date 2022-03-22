import { getPermissions } from '../../infoSources/permissions'

describe("Permissions", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should get permissions', async() => {
		global.navigator.permissions = {
			query: jest.fn().mockImplementation(() => Promise.resolve({ state: 'granted' })),
		}
		const permissions = [
			'geolocation', 'notifications','accelerometer','accessibility-events','ambient-light-sensor', 'background-sync',
			'camera','clipboard-read','clipboard-write','gyroscope', 'magnetometer','microphone','midi','payment-handler','persistent-storage']
		
		const result = await getPermissions()
		console.log(result)
		expect(result).toEqual(permissions)

	})

	it('should not have permissions and return undefined', async() => {
		global.navigator.permissions = {
			query: jest.fn().mockImplementation(() => Promise.resolve({ state: 'denied' })),
		}
	
		const result = await getPermissions()
		console.log(result)
		expect(result).toEqual(undefined)

	})
})