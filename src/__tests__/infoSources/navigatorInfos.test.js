import * as actions from '../../infoSources/navigatorInfos'
import * as browserActions from '../../infoSources/browserInfos'

const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("navigatorInfos", () => {

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should return true if its touchScreen", () => {
		let value = {maxTouchPoints:12, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(actions.isTouchScreen()).toBe(true)
	})


	it("should return false if its touchScreen", () => {
		let value = {maxTouchPoints:0, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(actions.isTouchScreen()).toBe(false)
	})


	it("should return connection", () => {
		let value = {connection:{effectiveType: "4g", rtt:50, downlink:10}, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(actions.getConnectionType()).toBe("4g")
	})

	it("should return undefined if no connection", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(actions.getConnectionType()).toBe(undefined)
	})

	it("should return vendor", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape", vendor:"Google"}
		setNavigator(value)

		expect(actions.getVendor()).toBe("Google")
	})

	it("should return Firefox when vendor is empty string", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape", vendor:""}
		setNavigator(value)

		expect(actions.getVendor()).toBe("Firefox")
	})

	it("should return ipad as platform", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel"}
		setNavigator(value)

		let isTouchSpy = jest.spyOn(actions, "isTouchScreen").mockReturnValueOnce(true)


		expect(actions.getPlatform()).toBe("iPad")
		expect(isTouchSpy).toHaveBeenCalled()

	})

	it("should return macOs and 96 if its chrome browser as platform", async() => {
		let value = {userAgentData:{getHighEntropyValues:async() => {return {brands:{}, platform:"macOs", platformVersion:96}}},appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel"}
		setNavigator(value)

		let isChromeSpy = jest.spyOn(browserActions, "isChrome").mockReturnValueOnce(true)

		let resp = await actions.getPlatform()
		expect(resp).toEqual({platform: 'macOs', version:96})
		expect(isChromeSpy).toHaveBeenCalled()

	})

	it("should return macIntel  as platform", () => {
		let value = {appCodeName: "Mozilla",appName: "Netscape", platform:"MacIntel"}
		setNavigator(value)

		expect(actions.getPlatform()).toEqual('MacIntel')

	})

	it("should return undefined as platform", () => {
		let value = {appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(actions.getPlatform()).toEqual(undefined)

	})

	it('should return en as language', () => {
		let value = {language:'en', appName:"", userAgent:''}
		setNavigator(value)

		expect(actions.getLanguage()).toEqual('en')
	})

	it('should return [en, de, fr] as language', () => {
		let value = {language:'en', appName:"", userAgent:'', languages:['en', 'de', "fr"]}
		setNavigator(value)

		expect(actions.getLanguages()).toEqual(['en', 'de', "fr"])
	})

	it('should return 4 as cpu', () => {
		let value = {language:'en', appName:"", userAgent:'', hardwareConcurrency:4 }
		setNavigator(value)

		expect(actions.getCPU()).toEqual(4)
	})

	it('should return undefined as cpu', () => {
		let value = {language:'en', appName:"", userAgent:''}
		setNavigator(value)

		expect(actions.getCPU()).toEqual(undefined)
	})


	it('should return undefined as device memeory', () => {
		let value = {language:'en', appName:"", userAgent:''}
		setNavigator(value)

		expect(actions.getDeviceMemeory()).toEqual(undefined)
	})

	it('should return 4 as device memeory', () => {
		let value = {language:'en', appName:"", userAgent:'', deviceMemory:4}
		setNavigator(value)

		expect(actions.getDeviceMemeory()).toEqual(4)
	})

	it('should return true if Pdf Viewer is enabled', () => {
		let value = {language:'en', appName:"", userAgent:'', pdfViewerEnabled:true}
		setNavigator(value)

		expect(actions.getPdfViewerEnabled()).toEqual(true)
	})

	it('should return false if pdf viwer is not enabled', () => {
		let value = {language:'en', appName:"", userAgent:'', pdfViewerEnabled:false}
		setNavigator(value)

		expect(actions.getPdfViewerEnabled()).toEqual(false)
	})


	it("should return array of plugins", () => {
		let value = {plugins: [{name:'some plugin', length:2, filename:'some name'},{name:'some plugin2', length:4, filename:'some name2'}],language:'en', appName:"", userAgent:'', pdfViewerEnabled:false}
	
		setNavigator(value)
		expect(actions.getPlugins()).toEqual(['some plugin','some plugin2'])

	})

	it("should return undefined for plugins", () => {
		let value = {language:'en', appName:"", userAgent:'', pdfViewerEnabled:false}
	
		setNavigator(value)
		expect(actions.getPlugins()).toEqual(undefined)

	})

	




})