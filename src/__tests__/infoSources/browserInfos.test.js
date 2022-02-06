import * as actions from '../../infoSources/browserInfos'

import * as touch from '../../infoSources/navigatorInfos'


let windowGetter
let navigatorGetter


describe("browserInfo", () => {
	beforeEach(() => {
		windowGetter = jest.spyOn(global, "window", 'get')
		navigatorGetter = jest.spyOn(global, "navigator", "get")
	})

	it('should be safariDesktop', () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, navigator , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgent:""})

		expect(actions.isSafariDesktop()).toBe(true)
	})

	it('should not be safariDesktop', () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, navigator:{}, safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:""})

		expect(actions.isSafariDesktop()).toBe(false)
	})

	it("should be firefox", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgent:"",appCodeName: "Mozilla",appName: "Netscape"})

		expect(actions.isFirefox()).toBe(true)
	})

	it("should not be firefox", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:"",userAgent:"", appCodeName: "Mozilla",appName: "Netscape"})

		expect(actions.isFirefox()).toBe(false)
	})


	it("should be Chrome browser", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}, webkitMediaStream:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:"",userAgent:"", appCodeName: "Mozilla",appName: "Netscape"})

		expect(actions.isChrome()).toBe(true)

	})

	it("should not be Chrome", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:"",userAgent:"", appCodeName: "Mozilla",appName: "Netscape"})
		
		expect(actions.isChrome()).toBe(false)

	})

	it("should be safarieMobile", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:"",userAgent:"", vendor: "some Apple stuf",appName: "Netscape"})
		
		let isTouchSpy = jest.spyOn(touch, "isTouchScreen").mockReturnValue(true)

		expect(actions.isSafariMobile()).toBe(true)
		expect(isTouchSpy).toHaveBeenCalled()


	})
	it("should not be safarieMobile", () => {
		windowGetter.mockReturnValueOnce({onselect:()=>{}, open:() => {}, mozInnerScreenY: 123 , safari:() => {}})
		navigatorGetter.mockReturnValueOnce({userAgentData:"",userAgent:"", vendor: "some Apple stuf",appName: "Netscape"})
		
		let isTouchSpy = jest.spyOn(touch, "isTouchScreen").mockReturnValueOnce(false)

		expect(actions.isSafariMobile()).toBe(false)
		expect(isTouchSpy).toHaveBeenCalled()

	})

	it("should detect browser version", () => {
		let value = {userAgentData:"", userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 12.2; rv:96.0) Gecko/20100101 Firefox/96.0", vendor: "some Apple stuf",appName: "Netscape"}
		Object.defineProperty(global, 'navigator', {value: value, writable: true});
		
		let chromeSpy = jest.spyOn(actions, "isChrome").mockReturnValueOnce(false)
		
		expect(actions.getBrowserVersion()).toBe("96")
		expect(chromeSpy).toHaveBeenCalled()

	})

})
