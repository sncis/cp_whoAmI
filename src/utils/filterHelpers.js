export function filterData(dataArray) { 
	return Object.keys(dataArray).reduce((result, element) => {
		if(dataArray[element] !== undefined) {
			result[element] = dataArray[element]
		}
			return result;
		},{})
}


export const filterIPInfos = (infos) => {
	let infoKeys = ['org', "status", 'countryCode','region']
	return Object.keys(infos).filter(el => !infoKeys.includes(el)).reduce((result,key) => {
		result[key] = infos[key]
		return result
	},{})
	
}


export const filterStrings = (array) => {
	return Object.keys(array).reduce((result, element) => {
		if(!array[element].includes("undefined")){
			result[element] = array[element]
		}
			return result;
		},{})
}


export const wait = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}
