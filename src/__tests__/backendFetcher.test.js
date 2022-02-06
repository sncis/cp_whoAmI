import backendFetcher from '../store/actions/backendFetcher'
import backendInstance from '../store/actions/backendInstance'

jest.mock("../store/actions/backendInstance", () => {
	return {
		baseURL: "some/backendURL",
		request: jest.fn()
	}
})

describe("backendFetcher", () => {
	const options = {url: "/123456", method:'get'}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should fetch ip infos", async() => {

		backendInstance.request.mockImplementationOnce(() => Promise.resolve({data:{as:"some isp", city:"some city"}, status:200}))

	
		let resp = await backendFetcher(options)
		expect(resp.data).toEqual({as:"some isp", city:"some city"})
		expect(resp.status).toBe(200)

	})

	it("should throw error", async() => {
		backendInstance.request.mockImplementationOnce(() => Promise.reject(("some error")))

		const consoleSpy = jest.spyOn(console, 'log');

		await expect(backendFetcher(options)).rejects.toThrowError("Problems with backend connection")

		expect(consoleSpy).toHaveBeenCalledWith("some error")
	})
})
