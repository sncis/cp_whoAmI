import { filterData, filterIPInfos, filterStrings } from '../utils/filterHelpers'

describe("helperfunction", () => {
	it("should filter data array", () => {
		const data = {
			connectionType: undefined,
			vendor: "Google",
			language: "en-US",
			paltform: "macOs",
			deviceMemory: undefined,
			cpu : 4,
			fonts : 26,
			plugins: undefined,
			getPDFViewer :undefined, 
			keyLayout: "QWERTY"
		}

		const expectedData = {
			vendor: "Google",
			language: "en-US",
			paltform: "macOs",
			cpu : 4,
			fonts : 26, 
			keyLayout: "QWERTY"
		}

		expect(filterData(data)).toEqual(expectedData)
	})


	it('should filter ipInfos',() => {
		const infos = {	as: "AS35244 Tele Columbus AG",city: "Munich",country: "Germany",countryCode: "DE",
			isp: "16 originated by AS35244",lat: 48.1336,lon: 11.5658,org: "",query: "46.128.226.84",
			region: "BY",regionName: "Bavaria",status: "success",timezone: "Europe/Berlin", zip: "80331"}

		const filteredInfos = {	as: "AS35244 Tele Columbus AG",city: "Munich",country: "Germany",
			isp: "16 originated by AS35244",lat: 48.1336,lon: 11.5658,query: "46.128.226.84",
			regionName: "Bavaria",timezone: "Europe/Berlin", zip: "80331"}

		expect(filterIPInfos(infos)).toEqual(filteredInfos)
	})


	it('should filter strings',() => {
		const infos = {as: "AS35244 Tele Columbus undefined",city: "undefined", country: "Germany",
			isp: "16 originated by AS35244",lat: '48.1336',lon: '11.5658',query: "46.128.226.84",
			region: "BY undefined",regionName: "Bavaria", zip: "80331"}

		const filteredInfos = {country: "Germany",
		isp: "16 originated by AS35244",lat: '48.1336',lon: '11.5658', query: "46.128.226.84",
		regionName: "Bavaria", zip: "80331"}

		expect(filterStrings(infos)).toEqual(filteredInfos)
	})
})
