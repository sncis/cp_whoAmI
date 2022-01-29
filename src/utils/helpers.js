export function filterData(dataArray) { 
	return Object.keys(dataArray).reduce((result, element) => {
		if(dataArray[element] !== undefined) {
			result[element] = dataArray[element]
		}
			return result;
		},{})
}