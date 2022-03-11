import backendInstance from './backendInstance'

export const backendFetcher = async(options) => {
	try{
		let responds =  await backendInstance.request({
			url: options.url,
			method: options.method,
			data: options.data
		})
		console.log(`data from baackend with request ${options.url}`, responds.data)
		return responds.data
	}catch(error){
		console.log(error)
		return {}
	}
}

export default backendFetcher


