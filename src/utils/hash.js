
export const hashFunction = (string) => {
	let hash
	for(let index in string){
		let char = string.charCodeAt(index)
		hash = ((hash<<5)-hash)+char
		hash = hash & hash
		
	}
	return hash
}