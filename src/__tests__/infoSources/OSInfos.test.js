import { getOSandVersion } from '../../infoSources/OSInfos'

const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("OsInfos", () => {
	it('should return Windows', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Windows NT 5.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.121 Safari/537.36",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual('Windows 2000')

	})

	it('should return unix', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual('Unix')

	})
	it('Mac OS', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual('Mac OS 12_3')
	})

	// it('iOS', () => {
	// 	let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/99.0.4844.59 Mobile/15E148 Safari/604.1",appCodeName: "Mozilla",appName: "Netscape"}
	// 	setNavigator(value)
	// 	expect(getOSandVersion()).toEqual('iOS 15_4')
	// })

})