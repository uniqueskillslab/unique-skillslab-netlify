import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Header Component', () => {
  const mockSetIsAuthenticated = jest.fn()

  beforeEach(() => {
    mockSetIsAuthenticated.mockClear()
  })

  it('renders logo and navigation links', () => {
    render(<Header isAuthenticated={false} setIsAuthenticated={mockSetIsAuthenticated} />)
    
    expect(screen.getByText('Unique Skills Lab')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Courses')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows admin link when authenticated', () => {
    render(<Header isAuthenticated={true} setIsAuthenticated={mockSetIsAuthenticated} />)
    
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('hides admin link when not authenticated', () => {
    render(<Header isAuthenticated={false} setIsAuthenticated={mockSetIsAuthenticated} />)
    
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header isAuthenticated={false} setIsAuthenticated={mockSetIsAuthenticated} />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    
    // Mobile menu should be visible
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('handles logout correctly', () => {
    const mockRouter = {
      push: jest.fn()
    }
    
    // Mock useRouter
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(mockRouter)
    
    render(<Header isAuthenticated={true} setIsAuthenticated={mockSetIsAuthenticated} />)
    
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(false)
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
})
