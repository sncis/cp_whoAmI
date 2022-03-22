import { getOSandVersion } from '../../infoSources/OSInfos'
import * as browserInfos from '../../infoSources/browserInfos'
const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("OsInfos", () => {
	it('should return Windows', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Windows NT 5.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.121 Safari/537.36",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual({platform:'Windows', version: '2000'})

	})

	it('should return unix', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (X11; U; Unix; en-US) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15 Surf/0.6",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual({platform:'Unix', version: ''})

	})
	it('should return Mac OS', () => {
		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(getOSandVersion()).toEqual({platform:'Mac OS', version: '12_3'})
	
	
	})

	it('shoudl call is Firefox and return Mac os 10.15', () => {
		let firefoxSpy = jest.spyOn(browserInfos, 'isFirefox').mockReturnValueOnce(true)

		let value = {maxTouchPoints:12, userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(getOSandVersion()).toEqual({platform:'Mac OS', version: '10.15'})
		expect(firefoxSpy).toHaveBeenCalled()

	})

})