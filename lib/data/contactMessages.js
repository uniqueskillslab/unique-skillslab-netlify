// Contact messages data - this will persist across deployments
export const contactMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+92 300 1234567",
    message: "I'm interested in the Digital Marketing course. Can you provide more details about the schedule?",
    status: "pending",
    createdAt: new Date('2024-01-15T10:30:00').toISOString(),
    respondedAt: null,
    response: ""
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+92 301 9876543",
    message: "Great courses! I'd like to enroll in the Mobile App Development program.",
    status: "responded",
    createdAt: new Date('2024-01-14T14:20:00').toISOString(),
    respondedAt: new Date('2024-01-15T09:15:00').toISOString(),
    response: "Thank you for your interest! We'll contact you soon with enrollment details."
  }
];
