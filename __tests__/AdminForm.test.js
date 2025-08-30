import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminForm from '../components/AdminForm'

describe('AdminForm Component', () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()
  const mockInstructors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]
  const mockCourses = [
    { id: 1, title: 'Course 1' },
    { id: 2, title: 'Course 2' }
  ]

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockOnCancel.mockClear()
  })

  describe('Course Form', () => {
    it('renders course form fields correctly', () => {
      render(
        <AdminForm
          type="course"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      expect(screen.getByText('Add New Course')).toBeInTheDocument()
      expect(screen.getByLabelText('Course Title *')).toBeInTheDocument()
      expect(screen.getByLabelText('Category *')).toBeInTheDocument()
      expect(screen.getByLabelText('Description *')).toBeInTheDocument()
      expect(screen.getByLabelText('Duration *')).toBeInTheDocument()
      expect(screen.getByLabelText('Price *')).toBeInTheDocument()
      expect(screen.getByLabelText('Instructor *')).toBeInTheDocument()
    })

    it('shows validation errors for required fields', async () => {
      render(
        <AdminForm
          type="course"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      const submitButton = screen.getByText('Add Course')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument()
        expect(screen.getByText('Description is required')).toBeInTheDocument()
        expect(screen.getByText('Category is required')).toBeInTheDocument()
        expect(screen.getByText('Duration is required')).toBeInTheDocument()
        expect(screen.getByText('Price is required')).toBeInTheDocument()
        expect(screen.getByText('Instructor is required')).toBeInTheDocument()
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('submits form with valid data', async () => {
      render(
        <AdminForm
          type="course"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Course Title *'), {
        target: { value: 'Test Course' }
      })
      fireEvent.change(screen.getByLabelText('Category *'), {
        target: { value: 'Media' }
      })
      fireEvent.change(screen.getByLabelText('Description *'), {
        target: { value: 'Test description' }
      })
      fireEvent.change(screen.getByLabelText('Duration *'), {
        target: { value: '3 months' }
      })
      fireEvent.change(screen.getByLabelText('Price *'), {
        target: { value: '25,000 PKR' }
      })
      fireEvent.change(screen.getByLabelText('Instructor *'), {
        target: { value: '1' }
      })

      const submitButton = screen.getByText('Add Course')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Course',
          category: 'Media',
          description: 'Test description',
          duration: '3 months',
          price: '25,000 PKR',
          instructorId: '1',
          image: '',
          name: '',
          biography: '',
          photoUrl: '',
          specialization: '',
          courses: []
        })
      })
    })
  })

  describe('Instructor Form', () => {
    it('renders instructor form fields correctly', () => {
      render(
        <AdminForm
          type="instructor"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      expect(screen.getByText('Add New Instructor')).toBeInTheDocument()
      expect(screen.getByLabelText('Name *')).toBeInTheDocument()
      expect(screen.getByLabelText('Specialization *')).toBeInTheDocument()
      expect(screen.getByLabelText('Biography *')).toBeInTheDocument()
      expect(screen.getByLabelText('Photo URL')).toBeInTheDocument()
      expect(screen.getByLabelText('Associated Courses')).toBeInTheDocument()
    })

    it('shows validation errors for required fields', async () => {
      render(
        <AdminForm
          type="instructor"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      const submitButton = screen.getByText('Add Instructor')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument()
        expect(screen.getByText('Biography is required')).toBeInTheDocument()
        expect(screen.getByText('Specialization is required')).toBeInTheDocument()
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('submits instructor form with valid data', async () => {
      render(
        <AdminForm
          type="instructor"
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          instructors={mockInstructors}
          courses={mockCourses}
        />
      )

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Name *'), {
        target: { value: 'John Doe' }
      })
      fireEvent.change(screen.getByLabelText('Specialization *'), {
        target: { value: 'Digital Marketing' }
      })
      fireEvent.change(screen.getByLabelText('Biography *'), {
        target: { value: 'Experienced instructor' }
      })

      const submitButton = screen.getByText('Add Instructor')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: '',
          description: '',
          category: '',
          duration: '',
          price: '',
          instructorId: '',
          image: '',
          name: 'John Doe',
          biography: 'Experienced instructor',
          photoUrl: '',
          specialization: 'Digital Marketing',
          courses: []
        })
      })
    })
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <AdminForm
        type="course"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        instructors={mockInstructors}
        courses={mockCourses}
      />
    )

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('populates form with existing data when editing', () => {
    const existingCourse = {
      id: 1,
      title: 'Existing Course',
      description: 'Existing description',
      category: 'Media',
      duration: '3 months',
      price: '25,000 PKR',
      instructorId: 1
    }

    render(
      <AdminForm
        type="course"
        data={existingCourse}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        instructors={mockInstructors}
        courses={mockCourses}
      />
    )

    expect(screen.getByText('Edit Course')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing Course')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Media')).toBeInTheDocument()
    expect(screen.getByDisplayValue('3 months')).toBeInTheDocument()
    expect(screen.getByDisplayValue('25,000 PKR')).toBeInTheDocument()
  })
})
