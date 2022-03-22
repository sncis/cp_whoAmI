import { backendFetcher } from './apiFetcher/backendFetcher'

export const fetchIpInfos = async() => {
	let options = { url:'/ip', method:'get'}
	try{
		return await backendFetcher(options)
	}catch(error){
		console.log(error)
		return {}
	}

}