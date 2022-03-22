import axios from 'axios'

const backendInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	headers: {
		'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
	}
})

export default backendInstance