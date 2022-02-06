import { apiFetcher } from '../store/actions/apiFetcher'
import apiInstance from '../store/actions/apiInstance'

jest.mock("../store/actions/apiInstance", ()=> {
	return {
		baseURL: "some url",
		request:jest.fn()
	}
})

describe("apiFetcher", () => {
	beforeEach(()=>{
    jest.clearAllMocks()
  })
	const options = {url:`http://ip-api.com/json/12345`, method:'get'}


	it("should fetch ip infos", async() => {

		apiInstance.request.mockImplementationOnce(() => {
			return Promise.resolve({data:'some data', status:200})
		})

		try{ 
			const resp = await apiFetcher(options)
			expect(resp.data).toBe('some data')
			expect(resp.status).toBe(200)
		}catch(error){
			console.log(error)
		}

	})

	it("should catch error", async() => {
		
		apiInstance.request.mockImplementationOnce(() => Promise.reject(new Error("some error")))

		await expect(apiFetcher(options)).rejects.toThrowError("Problems with connecting to IP API")
					
	})
})