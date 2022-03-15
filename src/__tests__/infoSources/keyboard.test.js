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

	it('should return Colemak', async() => {
		let result = returnLayout('q','j', 'y')
		expect(result).toBe("Colemak")
	})

	it('should return QZERTY', async() => {
		let result = returnLayout('q','i', 'z')
		expect(result).toBe("QZERTY")
	})

	it('should return AZERTY', async() => {
		let result = returnLayout('a','f', 'z')
		expect(result).toBe("AZERTY")
	})
})