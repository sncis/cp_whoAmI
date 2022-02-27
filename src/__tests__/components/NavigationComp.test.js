import React from 'react'
import { render, screen }from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavigationComp from '../../components/NavigationComp'


describe("NavigationComp", ()=> {
	it('should render home and more information link', () => {
		render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
				<NavigationComp />
			</MemoryRouter>
		)
		expect(screen.getByText(/home/)).toBeInTheDocument()
		expect(screen.getByText(/more information/)).toBeInTheDocument()
	})


	it('should render only home when at about page', () => {		
		render(
      <MemoryRouter initialEntries={[{ pathname: '/about' }]}>
				<NavigationComp />
			</MemoryRouter>
		)

		expect(screen.getByText(/home/)).toBeInTheDocument()
		expect(screen.queryByText(/more information/)).toBeNull()
	})

})