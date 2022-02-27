import backendInstance from './backendInstance'

export const backendFetcher = async(options) => {
	// console.log(options)
	try{
		return await backendInstance.request({
			url: options.url,
			method: options.method,
			data: options.data
		})

		// return {data:{ip:123456}}

	}catch(error){
		console.log(error)
		// return undefined
		// throw new Error("Problems with backend connection")
	}
}

export default backendFetcher


