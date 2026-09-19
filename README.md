![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)

# 🚨 Silent SOS

Silent SOS is a full-stack emergency web application designed for situations where a person may not be able to make a phone call or communicate verbally.

With a single SOS action, the application captures the user's current location and provides emergency communication options for trusted contacts.

> **Project Status:** ✅ Live & Deployed

---

## 🔗 Live Project

### 🌐 Frontend (Vercel)

https://silent-sos-rho.vercel.app/

### ⚙️ Backend (Render)

https://silent-sos-bj15.onrender.com/

---

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📌 Project Overview

Silent SOS focuses on providing a quick and discreet way to communicate an emergency when making a traditional phone call may not be possible.

The application allows users to:

- Create an account
- Securely log in
- Add trusted emergency contacts
- Manage saved contacts
- Trigger an SOS alert
- Capture the user's current location
- Generate a Google Maps location link
- Open WhatsApp with an emergency message
- Open an SMS composer
- View previous SOS alerts

The application follows a full-stack architecture where:

- React.js powers the frontend
- Node.js & Express.js provide REST APIs
- MongoDB Atlas stores application data
- JWT handles authentication
- Vercel hosts the frontend
- Render hosts the backend

---

## ✨ Features

### 🚨 Emergency SOS

- One-action SOS system
- 3-second SOS countdown
- Current location detection
- Latitude and longitude capture
- Google Maps location link
- Emergency message generation
- SOS alert stored in MongoDB
- Emergency alert history

### 👤 User Authentication

- User registration
- Secure login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Protected frontend pages
- User session handling

### 👥 Trusted Contacts

- Add trusted emergency contacts
- View saved contacts
- Delete contacts
- Phone contact picker support on compatible devices
- Contacts linked to the authenticated user

### 📍 Location Sharing

The application uses the browser's Geolocation API to obtain the user's current location.

The generated emergency location can be opened using Google Maps.

Example:

```text
https://www.google.com/maps?q=LATITUDE,LONGITUDE
```

> Location permission must be allowed by the browser/device for the SOS location feature to work.

### 📱 Emergency Communication

Silent SOS provides quick access to:

- WhatsApp emergency messages
- SMS composer
- Google Maps location

The browser opens the respective communication application or composer rather than silently sending messages without user interaction.

### 📜 Emergency History

Authenticated users can view their previous SOS alerts including:

- Emergency ID
- Location
- Trusted contacts
- Alert status
- Date and time

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- JavaScript
- HTML5
- CSS3
- Vite
- Browser Geolocation API

### Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- CORS
- dotenv

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

### Tools

- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    │   Mobile / Desktop  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       Vercel        │
                    └──────────┬──────────┘
                               │
                         REST API + JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │      Database       │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
Silent-SOS/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── EmergencyAlert/
│   │   ├── EmergencyCTA/
│   │   ├── Hero/
│   │   ├── HowItWorks/
│   │   ├── Navbar/
│   │   ├── SafetyFeatures/
│   │   └── TrustedContacts/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── EmergencyHistory/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── Databack/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Emergency.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── sosRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
├── .gitignore
├── vercel.json
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔐 Authentication Flow

Silent SOS uses JWT-based authentication.

```text
User Registration
       ↓
Password hashed using bcrypt
       ↓
User stored in MongoDB
       ↓
User Login
       ↓
Credentials verified
       ↓
JWT token generated
       ↓
Token stored on frontend
       ↓
Protected API requests
```

Protected backend routes verify the JWT before allowing access to user-specific data.

---

## 🚨 SOS Flow

```text
User presses SOS
        ↓
3-second countdown
        ↓
Browser requests location
        ↓
Latitude + Longitude obtained
        ↓
Trusted contacts loaded
        ↓
SOS alert sent to backend
        ↓
Alert stored in MongoDB
        ↓
Emergency communication options
        ↓
WhatsApp / SMS / Google Maps
```

---

## 🌐 API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

Creates a new user account.

#### Login

```http
POST /api/auth/login
```

Authenticates the user and returns a JWT token.

---

### Trusted Contacts

#### Get Contacts

```http
GET /api/contacts/:userId
```

Returns the authenticated user's trusted contacts.

#### Add Contact

```http
POST /api/contacts/:userId
```

Adds a trusted emergency contact.

#### Delete Contact

```http
DELETE /api/contacts/:userId/:contactId
```

Deletes a trusted contact.

---

### SOS

#### Create SOS Alert

```http
POST /api/sos
```

Creates and stores an emergency alert with the user's location and trusted contacts.

#### Emergency History

```http
GET /api/sos/history/:userId
```

Returns the authenticated user's previous SOS alerts.

---

### Health Check

```http
GET /
```

Checks whether the backend server is running.

---

## 🗄️ Database

MongoDB Atlas is used as the application's cloud database.

The application stores:

### Users

- Name
- Email
- Hashed Password
- Trusted Contacts
- Account timestamps

### Emergency Alerts

- User ID
- Latitude
- Longitude
- Emergency contacts
- Alert status
- Created timestamp

---

## 🔒 Security

The project implements several basic security practices:

- Password hashing using bcryptjs
- JWT authentication
- Protected backend routes
- User-specific database queries
- Environment variables for sensitive configuration
- `.env` excluded from Git
- CORS configuration
- Authentication middleware for protected resources

> API secrets and MongoDB credentials are not included in the public repository.

---

## 📱 Responsive Design

Silent SOS is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

The emergency interface is designed with quick access and minimal interaction in mind.

---

## 📸 Screenshots

Screenshots can be added here:

- 🏠 Home Page
- 🔐 Login Page
- 📝 Register Page
- 👥 Trusted Contacts
- 🚨 SOS Alert
- 📍 Location Sharing
- 📜 Emergency History
- 📱 Mobile View

---

## 📚 Learning Outcomes

Through this project I learned:

- Full Stack Web Development
- React.js Components and Hooks
- React Router DOM
- REST API Development
- Express.js Backend Development
- MongoDB Atlas Integration
- Mongoose
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Browser Geolocation API
- API Integration using Fetch
- CRUD Operations
- Responsive Web Design
- Git & GitHub
- Vercel Deployment
- Render Deployment
- Production Frontend-Backend Integration

---

## 🚀 Future Enhancements

Possible future improvements include:

- 📱 Native mobile application
- 📞 Direct emergency calling integration
- 💬 Automated SMS API integration
- 📲 WhatsApp Business API integration
- 👮 Emergency services integration
- 🗺️ Real-time responder tracking
- 👥 Nearby volunteer/responder network
- 🔔 Push notifications
- 🔐 Advanced authentication
- 🧑‍💼 Emergency response dashboard
- 📊 Emergency analytics
- 🌐 Progressive Web App (PWA) support

---

## 👨‍💻 Author

**HEM SHUKLA**

MCA Student | Full Stack Developer

- GitHub: https://github.com/codewithhem
- LinkedIn: https://www.linkedin.com/in/hem-shukla

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you'd like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Submit a Pull Request.

---

## 📄 License

This project is developed for **internship, learning, portfolio, and educational purposes**.

© 2026 Silent SOS. All Rights Reserved.

⭐ If you found this project useful, consider giving this project a **Star** on GitHub.