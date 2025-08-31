# Unique Skills Lab - Professional Website

A modern, responsive website for Unique Skills Lab, a professional IT and media training institute. Built with Next.js, React, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with teal and blue color scheme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Course Management**: Dynamic course listings with filtering and search
- **Admin Panel**: Protected admin interface for managing courses and instructors
- **Contact Forms**: Interactive contact forms with validation
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Google Maps Integration**: Location display with embedded maps
- **Social Media Integration**: Links to all social media platforms
- **Logo Integration**: Custom logo with fallback image handling

## 📋 Pages

- **Home**: Hero section, course overview, why choose us, fee promo
- **Courses**: Course listings with filtering and instructor information
- **About**: Company information, taglines, and detailed why choose us
- **Admin Panel**: Protected interface for managing content
- **Login**: Admin authentication page

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Authentication**: Local storage-based (demo)
- **Data Management**: In-memory JavaScript objects
- **Testing**: Jest (configured)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unique-skills-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Google Maps API Key (optional - for production)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Google Maps Integration
The website includes Google Maps embeds. For production:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add it to your environment variables
3. Update the iframe src URLs in the components

## 👤 Admin Access

### Demo Credentials
- **Username**: `admin`


### Access Admin Panel
1. Navigate to `/login`
2. Use the demo credentials above
3. Access the admin panel at `/admin`

## 📁 Project Structure

```
unique-skills-lab/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Footer with contact info
│   └── AdminForm.js    # Admin form component
├── lib/                # Utility functions and data
│   └── data.js         # In-memory data store
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── courses.js      # Courses page
│   ├── about.js        # About page
│   ├── admin.js        # Admin panel
│   └── login.js        # Login page
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS and custom styles
├── public/             # Static assets
│   └── assets/         # Images and media files
│       ├── usl_logo.png           # Main logo
│       ├── placeholder-image.jpg  # Fallback image
│       └── README.md              # Assets documentation
└── package.json        # Dependencies and scripts
```

## 🎨 Customization

### Colors
The website uses a custom color scheme defined in `tailwind.config.js`:

- **Primary**: Teal (#0D9488)
- **Accent**: Blue (#1D4ED8)
- **Background**: White and gray variations

### Content
Update content in the following files:
- `lib/data.js` - Courses and instructors data
- `pages/index.js` - Home page content
- `pages/about.js` - About page content
- `components/Footer.js` - Contact information

## 🧪 Testing

Run tests with Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📱 Responsive Design

The website is built with a mobile-first approach:
- **Mobile**: Stacked layouts, touch-friendly buttons
- **Tablet**: Grid layouts, optimized spacing
- **Desktop**: Full-width layouts, hover effects

## 🔒 Security Notes

### Demo Implementation
This is a demo implementation with:
- Hardcoded admin credentials
- In-memory data storage
- Basic authentication

### Production Recommendations
For production deployment:
- Implement proper authentication (NextAuth.js, Auth0, etc.)
- Use a real database (PostgreSQL, MongoDB, etc.)
- Add proper API routes for data management
- Implement proper security measures
- Use environment variables for sensitive data

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Heroku

## 📞 Contact Information

**Unique Skills Lab**
- **Address**: Madina Town Multan Road, Phoolnagar
- **Phone**: 0317-6100190
- **WhatsApp**: 0329-6219415
- **Email**: uniqueskillslab@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for Unique Skills Lab**
"# unique-skills-lab" 
