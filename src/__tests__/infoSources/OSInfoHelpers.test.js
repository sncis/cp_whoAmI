import {getOS, getOSVersion } from '../../infoSources/OSInfoHelpers'

const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}


describe('OSHelpers', ()=> {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('shoudl return Windows as OS', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOS()).toBe('Windows')
	})

	it('shoudl return Mac as os', () => {
		let value = {userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOS()).toBe('MacOS')
	
	})

	it('shoudl return Linux as os', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOS()).toBe('Linux')
	
	})
	it('shoudl return Unix as os', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOS()).toBe('Unix')
	
	})

	it('shoudl return right OS version', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOSVersion()).toBe('x86_64')
	
	})

	// it('shoudl return right OS version on Firefox', () => {
	// 	let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 12.2; rv:98.0) Gecko/20100101 Firefox/98.0",appCodeName: "Mozilla",appName: "Netscape"}
	// 	setNavigator(value)

	// 	expect(getOSVersion()).toBe('x86_64')
	
	// })

})