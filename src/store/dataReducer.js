export const dataReducer= (state, {type, payload}) => {
	switch(type){
	
	case 'SET_DISPLAYINFOS':
		return {
			...state,
			displayInfos: payload
		}	
	case 'SET_LOADING':
		return {
			...state,
			loading: payload
		}
	case "SET_ERROR":
		console.log("error dispatched")
		return{
			...state,
			error: payload
		}
	default: 
		return {
			loading:false
		}
	}
}