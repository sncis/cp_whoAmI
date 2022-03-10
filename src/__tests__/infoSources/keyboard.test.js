import { returnLayout } from '../../infoSources/keyboard'

describe('keyboard', () => {
	beforeEach(() => [
		jest.clearAllMocks()
	])

	it('should return QWERTY', async() => {
		let result = returnLayout('q','y','w')
		expect(result).toBe("QWERTY")
	})

	it('should return QWERTZ', async() => {
		let result = returnLayout('q','z')
		expect(result).toBe("QWERTZ")
	})
})