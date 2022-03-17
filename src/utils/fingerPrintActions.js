import { backendFetcher } from './apiFetcher/backendFetcher'
import { getLastVisit } from './fingerprintHelper'

// const entriesTest = [
// 	{visited:"2022-02-03T14:29:12.322Z",
// 	fingerPrint:-1041013258},
// 	{visited:"2022-02-10T14:29:12.322Z",
// 	fingerPrint:-1041013258},
// 	{visited:"2022-02-11T14:29:12.322Z",
// 	fingerPrint:-1041013258},
// 	{visited:"2022-02-12T11:29:12.322Z",
// 	fingerPrint:-1041013258},
// 	{visited:"2022-02-13T14:27:35.323Z",
// 	fingerPrint:-1041013258},	
// ]

//store fingerprint in backend
export const storeFingerprint = async(fingerPrint) => {
	const time = new Date()
	// console.log(time)

	// let options = { url:'/fingerprint', method: 'post', data:{ visited: time, fingerPrint: fingerPrint}}
	let options = { url:'/fingerprint', method: 'post', data:{ visited: time, ...fingerPrint}}
	// let options = { url:'/test', method: 'post', data:{ visited: time, ...fingerPrint}}


	try{
		await backendFetcher(options)
	}catch(error){
		console.log(error.message)
		console.log(error.errors)

		// console.log("Error when storing fingerprint data")
	}
}




//getting fingerprint infos from bakcend (if user has already visited teh website)
export const getFingerprintInfos = async(id) => {
	let options = { url:`/fingerprint?id=${id}`, method: 'get'}
	// let options = { url:`/fingerprint?id=-1041013258`, method: 'get'}
	let lastVisited = undefined
	
	try{
		let resp = await backendFetcher(options)
		// console.log("fingerPrint entries from db")
		// console.log(resp)
		if(resp.data.length > 1){
			lastVisited = getLastVisit(resp.data)
		}else{
			return lastVisited
		}
		
		// const lastVisited = getLastVisit(entriesTest)
		return {
			day: lastVisited.day,
			time: lastVisited.time,
			n: lastVisited.n
		}
		// console.log("lastVisited",lastVisited.day, lastVisited.time)
		// console.log(resp)
	}catch(err){
		console.log('error in getting last visits for fingerprint')
		// console.log(err)
		// console.log("Error in getting fingerprint infos")
	}
}

//delete fingerprint infos in backend
export const deletData = async(id) => {
	// console.log('deletion of data called')
	const options = {url:`/fingerprint?id=${id}`, method: 'delete'}
	try{
		let deletion = await backendFetcher(options)
		// console.log('deleted arrayys')
		let count = deletion.count
		// console.log(deletion)
		return count
	}catch(err){
		console.log('errror from deletion', err)
	}
}


export const getAllFingerPrints = async() => {
	const options = {url:`/fingerprint/all`, method: 'get'}
	try{
		let all = await backendFetcher(options)
		return all.data	
	}catch(error){
		console.log(error)
	}

}
