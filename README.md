# Academix LMS - An AI-Powered Learning Management System

<div align="center">

![Academix LMS](https://img.shields.io/badge/Academix-LMS-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)

**A modern, full-stack Learning Management System powered by AI**

[Live Demo](https://academix-lms-an-ai-powered-lms-1.onrender.com) | [Documentation](./DOCUMENTATION.md) | [Report Bug](https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS/issues)

</div>

---

## 🚀 Overview

Academix LMS is a comprehensive Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js) that revolutionizes online learning with AI-powered features. Whether you're an instructor creating courses or a student looking to learn, Academix provides an intuitive and powerful platform.

### ✨ Key Features

- 🤖 **AI-Powered Search** - Natural language course search using Google Gemini AI
- 💳 **Secure Payments** - Stripe integration for seamless course purchases
- 👥 **Role-Based Access** - Separate dashboards for Students and Instructors
- 🎬 **Rich Media** - Cloud-based video and image storage via Cloudinary
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth support
- 📧 **Email Integration** - OTP-based password reset
- ⭐ **Course Reviews** - Rate and review courses
- 📊 **Analytics Dashboard** - Track course performance and student enrollment
- 📱 **Responsive Design** - Beautiful UI with Tailwind CSS

---

## 📚 Complete Documentation

For comprehensive documentation covering every aspect of the project, please see:

### **[📖 DOCUMENTATION.md](./DOCUMENTATION.md)**

The documentation includes:
- Complete project architecture
- Tech stack details
- Installation and setup guide
- API endpoint documentation
- Frontend and backend component details
- Database schema
- Authentication flows
- Payment integration guide
- AI features explanation
- Deployment instructions
- And much more!

---

## 🎯 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS.git
   cd Academix-LMS-An-AI-powered-LMS
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   # Create .env file (see documentation for details)
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   # Create .env file (see documentation for details)
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

For detailed setup instructions, environment variables, and configuration, see the [complete documentation](./DOCUMENTATION.md#installation--setup).

---

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Firebase** - Google OAuth
- **Recharts** - Analytics charts

### Backend
- **Node.js** - Runtime
- **Express.js v5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payments
- **Cloudinary** - Media storage
- **Google Gemini AI** - AI search
- **Nodemailer** - Email service

---

## 🎓 Features by Role

### For Students
- Browse and search courses (AI-powered)
- Enroll in courses via secure payment
- Watch lecture videos
- Track learning progress
- Rate and review courses
- Manage profile

### For Instructors
- Create and manage courses
- Upload lectures with videos
- Publish/unpublish courses
- View analytics and earnings
- Manage enrolled students
- Track course performance

---

## 📂 Project Structure

```
Academix-LMS/
├── Backend/
│   ├── Config/          # Configuration files
│   ├── Controllers/     # Business logic
│   ├── Models/          # Database schemas
│   ├── Router/          # API routes
│   ├── middleware/      # Middleware functions
│   └── index.js         # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   ├── customHooks/ # Custom React hooks
│   │   └── utils/       # Utility functions
│   └── ...
└── DOCUMENTATION.md     # Complete documentation
```

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- httpOnly cookies
- CORS protection
- Input validation
- OTP-based password reset
- Secure payment processing via Stripe
- Protected routes and role-based access

---

## 🌐 Live Deployment

- **Frontend**: [https://academix-lms-an-ai-powered-lms-1.onrender.com](https://academix-lms-an-ai-powered-lms-1.onrender.com)
- **Backend**: [https://academix-lms-an-ai-powered-lms.onrender.com](https://academix-lms-an-ai-powered-lms.onrender.com)

---

## 📸 Screenshots

### Student Dashboard
Browse courses, enroll, and track your learning progress.

### Instructor Dashboard
Create courses, upload content, and track performance with analytics.

### AI-Powered Search
Search for courses using natural language queries.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Environment Variables

This project requires several environment variables. See the [documentation](./DOCUMENTATION.md#environment-variables) for the complete list and setup instructions.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Xain Muhammad Khan**

- GitHub: [@XainMuhammadKhan](https://github.com/XainMuhammadKhan)

---

## 🙏 Acknowledgments

- Google Gemini AI for intelligent search capabilities
- Stripe for secure payment processing
- Cloudinary for media storage
- MongoDB Atlas for cloud database
- All open-source libraries and tools used in this project

---

## 📞 Support

For detailed documentation, troubleshooting, and support:
- 📖 Read the [Complete Documentation](./DOCUMENTATION.md)
- 🐛 [Report Issues](https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS/issues)
- 💬 [Discussions](https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS/discussions)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Xain Muhammad Khan](https://github.com/XainMuhammadKhan)

</div>
