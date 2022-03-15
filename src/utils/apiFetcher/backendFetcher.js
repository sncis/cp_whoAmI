import backendInstance from './backendInstance'

export const backendFetcher = async(options) => {
	try{
		let responds =  await backendInstance.request({
			url: options.url,
			method: options.method,
			data: options.data
		})
		console.log(`data from backend with request ${options.url}`, responds.data)
		return responds.data
	}catch(error){
		console.log(error)
		// console.log(error.message)
		throw new Error(error)

		// return {}
		// throw new Error("Error in storing fingerPrint")
	}
}

export default backendFetcher


