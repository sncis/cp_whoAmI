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
	case "SET_CANVASHASH":
		console.log("canvashash," , payload)
		return{
			...state,
			canvasHash: payload
		}
	case "SET_FINGERPRINTDATA":
		console.log('fingerprint data set')
		return{
			...state,
			fingerPrintData: payload
		}
		case "SET_IPINFOS": 
		console.log("set ip infos dispatched")
		return{
			...state,
			ipInfos: payload
		}
		case "SET_FINGERPRINT":
			return{ 
				...state,
				fingerprint: payload
			}
		case "SET_LASTVISITSTEXT":
			return{
				...state,
				lastVisitText: payload
			}
		case 'RESET_STORE':
			return {
				loading:false
			}
	default: 
		return {
			loading:false
		}
	}
}