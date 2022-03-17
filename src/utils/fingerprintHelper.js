//converting date string fromlast visits in more readable date
export const getLastVisit = (entries) => {
	// console.log(entries)
	const lastEntrie = entries.slice(-1)[0]
	// console.log(entries.slice(-1))
	
	if(!lastEntrie){
		return undefined
	}
	const date = new Date(lastEntrie.visited)
	const day = date.toLocaleDateString()
	const time = date.toLocaleTimeString()
	return {day:day,time:time,n:entries.length}
	}

