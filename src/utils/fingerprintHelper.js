export const getLastVisit = (entries) => {
	const lastEntrie = entries.slice(-1)[0]	
	if(!lastEntrie){
		return undefined
	}
	const date = new Date(lastEntrie.visited)
	const day = date.toLocaleDateString()
	const time = date.toLocaleTimeString()
	return {day:day,time:time,n:entries.length}
	}

