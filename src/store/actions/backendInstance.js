import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

const backendInstance = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json;charset=UTF-8',
	}
})

export default backendInstance