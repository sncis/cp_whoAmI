import { getPlatform, getCPU,getDeviceMemeory } from '../../infoSources/deviceInfos'
import * as browserActions from '../../infoSources/browserInfos'
import * as screenActions from '../../infoSources/screenInfos'

const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("DeviceInfos", () => {

	it("should return ipad as platform", async() => {
		let value = {appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel", userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15'}
		setNavigator(value)

		let isTouchSpy = jest.spyOn(screenActions, "isTouchScreen").mockReturnValueOnce(true)

		expect(await getPlatform()).toEqual({platform: 'iOS', version:'12_2_1'})

		expect(isTouchSpy).toHaveBeenCalled()

	})

	it("should return macOs and 96 if its chrome browser as platform", async() => {
		let value = {userAgentData:{getHighEntropyValues:async() => {return {brands:{}, platform:"macOs", platformVersion:96}}},appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel"}
		setNavigator(value)

		let isChromeSpy = jest.spyOn(browserActions, "isChrome").mockReturnValueOnce(true)

		let resp = await getPlatform()
		expect(resp).toEqual({platform: 'macOs', version:96})
		expect(isChromeSpy).toHaveBeenCalled()

	})

	it("should return Mac OS as platform", async() => {
		let value = {appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel", userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15'}
		setNavigator(value)

		expect(await getPlatform()).toEqual({platform: 'Mac OS', version:'12_2_1'})


	})

	it("should return undefined as platform", async() => {
		let value = {userAgent:'',appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(await getPlatform()).toEqual({platform: undefined, version:''})

	})

	it('should return 4 as cpu', () => {
		let value = {language:'en', appName:"", userAgent:'', hardwareConcurrency:4 }
		setNavigator(value)

		expect(getCPU()).toEqual(4)
	})

	it('should return undefined as cpu', () => {
		let value = {language:'en', appName:"", userAgent:''}
		setNavigator(value)

		expect(getCPU()).toEqual(undefined)
	})

	it('should return undefined as device memeory', () => {
		let value = {language:'en', appName:"", userAgent:''}
		setNavigator(value)

		expect(getDeviceMemeory()).toEqual(undefined)
	})

	it('should return 4 as device memeory', () => {
		let value = {language:'en', appName:"", userAgent:'', deviceMemory:4}
		setNavigator(value)

		expect(getDeviceMemeory()).toEqual(4)
	})

})