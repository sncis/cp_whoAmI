import * as actions from '../../infoSources/navigatorInfos'
// import * as browserActions from '../../infoSources/browserInfos'


const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("navigatorInfos", () => {

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should return vendor", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape", vendor:"Google"}
		setNavigator(value)

		expect(actions.getVendor()).toBe("Google")
	})

	it("should return Mozilla when vendor is empty string", () => {
		let value = {userAgent:"",appCodeName: "Mozilla",appName: "Netscape", vendor:""}
		setNavigator(value)

		expect(actions.getVendor()).toBe("Mozilla Firefox")
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