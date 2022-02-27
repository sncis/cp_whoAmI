import { backendFetcher } from '../../utils/apiHelpers/backendFetcher'


export const fetchIpInfos = async() => {
	let options = { url:'/test/ip', method:'get'}
	
	try{
		return await backendFetcher(options)
	}catch(error){
		console.log(error)
		return {}
	}

}