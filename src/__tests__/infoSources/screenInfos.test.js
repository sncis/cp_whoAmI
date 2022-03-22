import { isTouchScreen, getScreenResolution } from '../../infoSources/screenInfos'



const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

const setWindow= (value) => {
	return Object.defineProperty(global, 'window', {value: value, writable: true});
}


describe("ScreenInfos", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should return true if its touchScreen", () => {
		let value = {maxTouchPoints:12, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)
		expect(isTouchScreen()).toBe(true)
	})


	it("should return false if its touchScreen", () => {
		let value = {maxTouchPoints:0, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setNavigator(value)

		expect(isTouchScreen()).toBe(false)
	})

	it("should return screenResolution if its touchScreen", () => {
		let value = {screen:{width:23, height:45,  colorDepth:5}, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setWindow(value)

		expect(getScreenResolution()).toEqual({width:23, height:45,  depth:5})
	})
	it("should return screenResolution as string if its touchScreen", () => {
		let value = {screen:{width:23, height:45,  colorDepth:5}, userAgent:"",appCodeName: "Mozilla",appName: "Netscape"}
		setWindow(value)

		expect(getScreenResolution(true)).toEqual("23, 45, 5")
	})

})