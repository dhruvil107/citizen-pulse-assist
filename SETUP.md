# Citymitra - HTML/CSS/JS Version Setup Guide

## Project Overview
This project has been converted from React/TSX to pure HTML, CSS, and JavaScript with Node.js backend.

## Project Structure
```
citizen-pulse-assist/
├── html/                 # HTML pages
│   ├── index.html       # Homepage
│   ├── login.html       # Login page
│   ├── signup.html      # Signup page
│   └── complaint-form.html # Complaint form
├── css/                 # Stylesheets
│   ├── styles.css       # Base styles
│   └── components.css   # Component styles
├── js/                  # JavaScript files
│   ├── app.js          # Main app logic
│   ├── auth.js         # Authentication
│   ├── complaint-form.js # Form handling
│   └── signup.js       # Signup logic
├── backend/            # Node.js backend
│   ├── server.js       # Express server
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── controllers/    # Route controllers
└── src/assets/         # Images and assets
```

## Setup Instructions

### 1. Backend Setup
```bash
# Navigate to backend directory
cd citizen-pulse-assist/backend

# Install dependencies
npm install

# Create .env file with the following content:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/citymitra
# NODE_ENV=development

# Start the backend server
npm start
```

### 2. Frontend Setup
The frontend is now pure HTML/CSS/JS, so no build process is required!

### 3. Running the Application

#### Option 1: Using Node.js Backend (Recommended)
```bash
# Start backend server
cd citizen-pulse-assist/backend
npm start

# Open browser and go to:
# http://localhost:5000
```

#### Option 2: Using Live Server (Frontend Only)
```bash
# If you have Live Server extension in VS Code:
# Right-click on html/index.html and select "Open with Live Server"

# Or install live-server globally:
npm install -g live-server
cd citizen-pulse-assist/html
live-server
```

## Features Converted

### ✅ Completed
- [x] Homepage with hero section, stats, and features
- [x] Login page with user/admin selection
- [x] Signup page with form validation
- [x] Complaint form with Aadhaar verification
- [x] Responsive navigation with mobile menu
- [x] Theme toggle (light/dark mode)
- [x] Language toggle (English/Gujarati)
- [x] Form validation and error handling
- [x] File upload functionality
- [x] GPS location services
- [x] Backend API integration
- [x] MongoDB database models

### 🔄 In Progress
- [ ] Track complaint page
- [ ] Admin panel
- [ ] About and Contact pages
- [ ] Services page

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Complaints
- `POST /api/complaints` - Submit new complaint
- `GET /api/complaints/:id` - Get complaint details
- `GET /api/complaints/user/:userId` - Get user complaints
- `PUT /api/complaints/:id` - Update complaint status

### Admin
- `GET /api/admin/complaints` - Get all complaints
- `PUT /api/admin/complaints/:id/status` - Update complaint status
- `GET /api/admin/stats` - Get dashboard statistics

## Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - ES6+ features, modules
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Notes

### CSS Architecture
- Uses CSS custom properties for theming
- Component-based CSS organization
- Mobile-first responsive design
- Dark/light theme support

### JavaScript Architecture
- ES6+ classes for component management
- Event-driven programming
- Local storage for user preferences
- Fetch API for backend communication

### Form Validation
- Client-side validation with JavaScript
- Real-time feedback
- Accessibility support
- Custom error messages

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure backend server is running on port 5000
   - Check that CORS is properly configured in server.js

2. **File Upload Issues**
   - Ensure file size is under 5MB
   - Only image files are accepted

3. **Location Services**
   - Requires HTTPS in production
   - User must grant location permission

4. **Database Connection**
   - Make sure MongoDB is running
   - Check MONGO_URI in .env file

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.

