import { backendFetcher } from './backendFetcher'
import { SET_IPINFOS} from '../constants'


const entriesTest = [
	{visited:"2022-02-03T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-10T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-11T14:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-12T11:29:12.322Z",
	fingerPrint:-1041013258},
	{visited:"2022-02-13T14:27:35.323Z",
	fingerPrint:-1041013258},	
]

//store fingerprint in backend
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

//converting date string fromlast visits in more readable date
const getLastVisits = (entries) => {
	console.log(entries)
	const lastEntrie = entries.slice(-1)[0]
	console.log(lastEntrie.visited)
	
	if(!lastEntrie){
		return undefined
	}
	const date = new Date(lastEntrie.visited)
	const day = date.toLocaleDateString()
	const time = date.toLocaleTimeString()
	return {day:day,time:time,n:entries.length}
	}


//getting fingerprint infos from bakcend (if user has already visited teh website)
export const getFingerprintInfos = async(id) => {
	let options = { url:`/fingerprint?id=${id}`, method: 'get'}
	
	try{
		let resp = await backendFetcher(options)
		// console.log("fingerPrint entries from db")
		// const lastVisited = getLastVisits(resp.data)
		const lastVisited = getLastVisits(entriesTest)

		if(!lastVisited){
			return undefined
		}

		return {
			day: lastVisited.day,
			time: lastVisited.time,
			n: lastVisited.n
		}
		// console.log("lastVisited",lastVisited.day, lastVisited.time)
		// console.log(resp)
	}catch(err){
		console.log(err)
	}
}

//delete fingerprint infos in backend
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