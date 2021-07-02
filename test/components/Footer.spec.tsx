import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Footer from '../../components/Footer'

describe('Footer', () => {
  it('Footer - renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByRole('img', { name: 'NextJS logo' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'ReactJS logo' })
    ).toBeInTheDocument()
  })
})
