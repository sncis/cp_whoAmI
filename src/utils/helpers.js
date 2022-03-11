export function filterData(dataArray) { 
	return Object.keys(dataArray).reduce((result, element) => {
		if(dataArray[element] !== undefined) {
			result[element] = dataArray[element]
		}
			return result;
		},{})
}


export const filterIPInfos = (infos) => {
	let infoKeys = ['org', "status"]
	return Object.keys(infos).filter(el => !infoKeys.includes(el)).reduce((result,key) => {
		result[key] = infos[key]
		return result
	},{})
	
}

export const filterStrings = (array) => {
	return Object.keys(array).reduce((result, element) => {
		if(!array[element].includes("undefined")){
			console.log(array[element])
			result[element] = array[element]
		}
			return result;
		},{})
}

export const wait = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}


// let dataArray = {
// 	status: 'success',
// 	country: 'Germany',
// 	countryCode: 'DE',
// 	region: 'undefined',
// 	regionName: 'Bavaria',
// 	city: 'Munich',
// 	zip: '80331',
// 	lat: 48.1336,
// 	lon: 11.5658,
// 	timezone: 'Europe/Berlin',
// 	isp: '16 originated by AS35244',
// 	org: "undefined",
// 	as: 'AS35244 Tele Columbus AG',
// 	query: '46.128.226.84'
// }
