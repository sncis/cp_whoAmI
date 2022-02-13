import { backendFetcher } from './backendFetcher'
import { SET_IPINFOS} from '../constants'

export const storeFingerprint = async(fingerPrint) => {
	const time = new Date()
	console.log(time)

	let options = { url:'/fingerprint', method: 'post', data:{ visited: time, fingerPrint: fingerPrint}}
	try{
		await backendFetcher(options)
	}catch(error){
		console.log(error)
	}
}

const getLastVisits = (entries) => {
	const lastEntrie = entries.pop()
	const date = new Date(lastEntrie.visited)
	const day = date.toLocaleDateString()
	const time = date.toLocaleTimeString()
	return {day,time}
	}

export const getFingerprintInfos = async(id) => {
	let options = { url:`/fingerprint?id=${id}`, method: 'get'}
	try{
		let resp = await backendFetcher(options)
		console.log("fingerPrint entries from db")
		const lastVisited = getLastVisits(resp.data)
		console.log("lastVisited",lastVisited.day, lastVisited.time)
		console.log(resp)
	}catch(err){
		console.log(err)
	}
}

export const deletData = async(id) => {
	console.log('deletion of data called')
	const options = {url:`/fingerprint?id=${id}`, method: 'delete'}
	try{
		let deletion = await backendFetcher(options)
		console.log('deleted arrayys')
		console.log(deletion)
	}catch(err){
		console.log('errror from deletion', err)
	}


}

//store actions 
export const storeIPInfos = (data) => {
	console.log("data from ip infos")
	console.log(data)
	return {
		type: SET_IPINFOS,
		payload: data
	}
}