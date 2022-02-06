import axios from 'axios'


// // const BACKEND_URL = 'https://localhost:5443/'
// const BACKEND_URL = 'http://localhost:5000'

// export const backendInstance = axios.create({
// 	baseURL: BACKEND_URL,
// 	headers: {
// 		'Accept': 'application/json, text/plain',
//     'Content-Type': 'application/json;charset=UTF-8',
// 	}
// })


const apiInstance = axios.create({
	headers: {
		'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
	}
})

export default apiInstance