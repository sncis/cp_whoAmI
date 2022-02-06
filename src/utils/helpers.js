export function filterData(dataArray) { 
	return Object.keys(dataArray).reduce((result, element) => {
		if(dataArray[element] !== undefined) {
			result[element] = dataArray[element]
		}
			return result;
		},{})
}

export const filterIPInfos = (infos) => {
	let infoKeys = ['as', "city","regionName","timezone","vendor","zip"]

	return Object.keys(infos).filter(el => infoKeys.includes(el)).reduce((result,key) => {
		result[key] = infos[key]
		return result
	},{})
	
}
