import { getLanguage, getLanguages } from '../../infoSources/languages'

const setNavigator= (value) => {
	return Object.defineProperty(global, 'navigator', {value: value, writable: true});
}

describe("Language", () => {

	it("shoudl return Engiich as language", () =>{
		let value = {language:'en'}
		setNavigator(value)

		expect(getLanguage()).toEqual('English')


	})

	it("shoudl return English, German as language", () =>{
		let value = {language:'en', languages: ['en-US', 'de', 'en']}
		setNavigator(value)

		expect(getLanguages()).toEqual(["English", "German"])

	})
})