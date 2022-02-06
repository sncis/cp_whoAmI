import apiInstance from './apiInstance'

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve,ms))
}
export const apiFetcher = async(options) => {
	console.log(options)
	try{
		// return await apiInstance.request({
		// 	url: options.url,
		// 	method: options.method,
		// 	data: options.data
		// })
		await sleep(500)
		console.log("sleepted")

		return await apiInstance.request({
			url: options.url,
			method: options.method,
			data: options.data
		})

		// return {
		// 	config:{},
		// 	data:{
		// 		as: "AS35244 Tele Columbus AG",
		// 		city: "Munich",
		// 		country: "Germany",
		// 		countryCode: "DE",
		// 		isp: "16 originated by AS35244",
		// 		lat: 48.1336,
		// 		lon: 11.5658,
		// 		org: "",
		// 		query: "46.128.226.84",
		// 		region: "BY",
		// 		regionName: "Bavaria",
		// 		status: "success",
		// 		timezone: "Europe/Berlin",
		// 		zip: "80331",
		// 	},
		// 	status:200,
		// }
	}catch(error){
		console.error(error)
		throw new Error("Problems with connecting to IP API")
	}
	
}