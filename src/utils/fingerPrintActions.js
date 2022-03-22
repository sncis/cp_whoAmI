/* finger print action interacting with Backend API*/

import { backendFetcher } from './apiFetcher/backendFetcher'
import { getLastVisit } from './fingerprintHelper'


export const storeFingerprint = async(fingerPrint) => {
	const time = new Date()
	let options = { url:'/fingerprint', method: 'post', data:{visited: time, ...fingerPrint}}
	try{
		await backendFetcher(options)
	}catch(error){
		console.log("Coud not store fingerprint data in backend. Error: ")
		console.log(error)
	}
}


export const getFingerprintInfos = async(id) => {
	let options = { url:`/fingerprint?id=${id}`, method: 'get'}
	let lastVisited = undefined
	
	try{
		let resp = await backendFetcher(options)
		if(resp.data.length > 1){
			lastVisited = getLastVisit(resp.data)
		}else{
			return lastVisited
		}
		return {
			day: lastVisited.day,
			time: lastVisited.time,
			n: lastVisited.n
		}
	}catch(error){
		console.log('Error in getting last visits from backend. Error: ')
		console.log(error)

	}
}

export const deletData = async(id) => {
	const options = {url:`/fingerprint?id=${id}`, method: 'delete'}
	try{
		let deletion = await backendFetcher(options)
		let count = deletion.count
		return count
	}catch(error){
		console.log('Error in deleting Data. Error: ')
		console.log(error)
	}
}


export const getAllFingerPrints = async() => {
	const options = {url:`/fingerprint/all`, method: 'get'}
	try{
		let all = await backendFetcher(options)
		return all.data	
	}catch(error){
		console.log('Error in deleting Data. Error: ')
		console.log(error)
	}
}
