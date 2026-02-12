# Academix LMS - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Tech Stack](#tech-stack)
5. [Installation & Setup](#installation--setup)
6. [Backend Documentation](#backend-documentation)
7. [Frontend Documentation](#frontend-documentation)
8. [Database Schema](#database-schema)
9. [Authentication Flow](#authentication-flow)
10. [Payment Integration](#payment-integration)
11. [AI Features](#ai-features)
12. [Deployment](#deployment)

---

## Project Overview

**Academix LMS** is a full-stack Learning Management System (LMS) powered by AI. It provides a comprehensive platform for instructors to create and manage courses, and for students to discover, enroll in, and learn from these courses. The platform features AI-powered course search, secure authentication, payment processing via Stripe, and real-time course management.

### Key Highlights
- **Role-Based Access Control**: Separate dashboards and features for Students and Instructors
- **AI-Powered Search**: Natural language course search using Google Gemini AI
- **Secure Payment**: Stripe integration for course purchases
- **Cloud Storage**: Cloudinary integration for media uploads
- **Real-time Updates**: Redux state management with localStorage persistence
- **Responsive Design**: Mobile-first design using Tailwind CSS

---

## Features

### For Students
- **User Authentication**: Register, login, password reset with OTP verification
- **Course Discovery**: Browse all published courses with filtering options
- **AI-Powered Search**: Search courses using natural language queries
- **Course Enrollment**: Purchase courses securely via Stripe
- **My Courses**: Access all enrolled courses
- **Course Reviews**: Rate and review completed courses
- **Profile Management**: Edit profile and upload profile pictures
- **Lecture Viewing**: Watch course videos and track progress

### For Instructors
- **Instructor Dashboard**: Analytics and course management overview
- **Course Creation**: Create comprehensive courses with details
- **Lecture Management**: Add, edit, and delete lectures with video uploads
- **Course Publishing**: Publish/unpublish courses for public visibility
- **Student Analytics**: View enrolled students and course performance
- **Revenue Tracking**: Monitor course sales and earnings
- **Course Editing**: Update course content, pricing, and metadata

### System Features
- **Google OAuth**: Sign in with Google authentication
- **Email Notifications**: OTP-based password reset via email
- **Media Management**: Cloud-based storage for videos and images
- **Responsive UI**: Works seamlessly on desktop, tablet, and mobile
- **State Persistence**: Redux state saved to localStorage
- **Protected Routes**: Role-based access control for different user types

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  (React 19 + Redux Toolkit + React Router + Tailwind CSS)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                           │
│    (Express.js + Node.js + JWT Authentication)              │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
┌────────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│   MongoDB       │  │   Cloudinary   │  │  Stripe API    │
│  (Database)     │  │  (Media CDN)   │  │  (Payments)    │
└─────────────────┘  └────────────────┘  └────────────────┘
         │
         │
┌────────▼────────┐  ┌────────────────┐  ┌────────────────┐
│ Google Gemini   │  │  Firebase      │  │   Nodemailer   │
│   AI (Search)   │  │  (Auth/OAuth)  │  │  (Email/OTP)   │
└─────────────────┘  └────────────────┘  └────────────────┘
```

### Frontend Architecture

```
Frontend/
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component with routing
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── RoleRoute.jsx
│   │   └── ...
│   ├── pages/                   # Page components
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Instructor/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateCourses.jsx
│   │   │   ├── EditCourse.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── redux/                   # State management
│   │   ├── store.js
│   │   ├── userSlice.js
│   │   ├── courseSlice.js
│   │   ├── lectureSlice.js
│   │   └── reviewSlice.js
│   ├── customHooks/             # Custom React hooks
│   │   ├── getCurrentUser.js
│   │   └── ...
│   └── utils/                   # Utility functions
│       └── firebase.js
└── ...
```

### Backend Architecture

```
Backend/
├── index.js                     # Server entry point
├── Config/                      # Configuration files
│   ├── connectDB.js            # MongoDB connection
│   ├── token.js                # JWT token generation
│   ├── cloudinary.js           # Cloudinary setup
│   └── sendMail.js             # Email configuration
├── Controllers/                 # Business logic
│   ├── authController.js       # Authentication logic
│   ├── userController.js       # User management
│   ├── courseController.js     # Course operations
│   └── searchController.js     # AI search logic
├── Models/                      # Database schemas
│   ├── userModel.js
│   ├── courseModel.js
│   ├── lectureModel.js
│   └── reviewModel.js
├── Router/                      # API routes
│   ├── authRoute.js
│   ├── userRoute.js
│   └── courseRoute.js
├── middleware/                  # Middleware functions
│   ├── is_authenticated.js     # JWT verification
│   └── multer.js               # File upload handling
└── public/                      # Static files
```

---

## Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI library for building user interfaces |
| **React Router DOM** | 7.9.5 | Client-side routing and navigation |
| **Redux Toolkit** | 2.9.2 | State management with simplified Redux logic |
| **React Redux** | 9.2.0 | React bindings for Redux |
| **Axios** | 1.13.1 | HTTP client for API requests |
| **Tailwind CSS** | 4.1.16 | Utility-first CSS framework |
| **Firebase** | 12.6.0 | Google OAuth authentication |
| **React Icons** | 5.5.0 | Icon library |
| **React Toastify** | 11.0.5 | Toast notifications |
| **React Spinners** | 0.17.0 | Loading spinners |
| **Recharts** | 3.7.0 | Chart library for analytics |
| **Vite** | 7.1.7 | Build tool and dev server |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | 8.19.2 | MongoDB ODM |
| **JWT** | 9.0.2 | JSON Web Token authentication |
| **bcryptjs** | 3.0.2 | Password hashing |
| **Cloudinary** | 2.8.0 | Cloud media storage |
| **Stripe** | 20.3.1 | Payment processing |
| **Google GenAI** | 1.40.0 | AI-powered search |
| **Nodemailer** | 7.0.10 | Email service for OTP |
| **Multer** | 2.0.2 | File upload middleware |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Cookie Parser** | 1.4.7 | Cookie parsing middleware |
| **Validator** | 13.15.20 | Data validation |
| **Nodemon** | 3.1.10 | Development auto-restart |

---

## Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**
- **Git**

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend/` directory:

```env
# Server
PORT=5000

# Database
MONGODB_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Gmail SMTP)
USER_EMAIL=your_gmail_address
USER_PASSWORD=your_gmail_app_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Gemini AI
GOOGLE_API_KEY=your_google_gemini_api_key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
Create a `.env` file in the `Frontend/` directory:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS.git
cd Academix-LMS-An-AI-powered-LMS
```

#### 2. Backend Setup
```bash
cd Backend
npm install
# Create .env file with the required variables
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd ../Frontend
npm install
# Create .env file with the required variables
npm run dev
```

The frontend will start on `http://localhost:5173`

### Development Workflow
1. Start MongoDB (if running locally)
2. Start the backend server: `cd Backend && npm run dev`
3. Start the frontend dev server: `cd Frontend && npm run dev`
4. Access the application at `http://localhost:5173`

### Production Build

#### Backend
```bash
cd Backend
npm start
```

#### Frontend
```bash
cd Frontend
npm run build
npm run preview
```

---

## Backend Documentation

### API Endpoints

#### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/logout` | Logout user | Yes |
| POST | `/sendotp` | Send OTP for password reset | No |
| POST | `/verifyotp` | Verify OTP | No |
| POST | `/resetpassword` | Reset password after OTP verification | No |
| POST | `/google` | Google OAuth callback | No |

#### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/getcurrentuser` | Get current authenticated user | Yes |
| POST | `/uploadprofile` | Update profile and upload photo | Yes |

#### Course Routes (`/api/course`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new course | Yes (Instructor) |
| GET | `/getpublished` | Get all published courses | No |
| GET | `/getcreator` | Get instructor's courses | Yes (Instructor) |
| POST | `/editcourse/:courseId` | Edit course details | Yes (Instructor) |
| GET | `/getcourse/:courseId` | Get single course details | Yes |
| DELETE | `/delete/:courseId` | Delete course | Yes (Instructor) |
| POST | `/createlecture/:courseId` | Create lecture in course | Yes (Instructor) |
| POST | `/editlecture/:lectureId` | Edit lecture | Yes (Instructor) |
| DELETE | `/removelecture/:courseId/:lectureId` | Delete lecture | Yes (Instructor) |
| GET | `/getlecture/:courseId` | Get all lectures in course | Yes |
| POST | `/review/:courseId` | Add review to course | Yes (Student) |
| POST | `/create-checkout-session` | Create Stripe checkout session | Yes |
| POST | `/verify-session` | Verify payment session | Yes |
| POST | `/search` | AI-powered course search | Yes |

### Controllers

#### 1. authController.js
Handles all authentication and authorization operations.

**Key Functions:**
- `register`: Creates new user account with hashed password
- `login`: Authenticates user and generates JWT token
- `logout`: Clears authentication cookie
- `sendOtp`: Sends 6-digit OTP to user's email for password reset
- `verifyOtp`: Validates OTP and marks it as verified
- `resetPassword`: Updates password after OTP verification
- `googleAuthCallback`: Handles Google OAuth authentication

**Security Features:**
- Password hashing with bcrypt (10 salt rounds)
- JWT token with 7-day expiration
- OTP expiration (10 minutes)
- Email validation
- Cookie-based session management

#### 2. userController.js
Manages user profile operations.

**Key Functions:**
- `getCurrentUser`: Retrieves authenticated user data with enrolled courses
- `uploadProfile`: Updates user profile (name, description) and uploads profile photo to Cloudinary

**Features:**
- Cloudinary integration for profile pictures
- Profile data validation
- Populates enrolled courses with course details

#### 3. courseController.js
Handles all course-related operations including payments.

**Key Functions:**
- `createCourse`: Creates new course (Instructor only)
- `getPublishedCourse`: Retrieves all published courses for browsing
- `getCreatorCourses`: Gets all courses created by instructor
- `editCourse`: Updates course details and thumbnail
- `getCourse`: Gets single course with lectures and reviews
- `deleteCourse`: Removes course and associated data
- `createLecture`: Adds lecture with video upload to Cloudinary
- `editLecture`: Updates lecture details and video
- `removeLecture`: Deletes lecture from course
- `getLecture`: Retrieves all lectures for a course
- `addReview`: Allows students to review courses (one review per user)
- `createCheckoutSession`: Initiates Stripe payment for course
- `verifySession`: Verifies payment and enrolls student
- `stripeWebhookHandler`: Processes Stripe webhooks for payment confirmation

**Payment Integration:**
- Stripe Checkout session creation
- Webhook handling for payment events
- Automatic enrollment upon successful payment
- Error handling for payment failures

#### 4. searchController.js
Implements AI-powered course search.

**Key Function:**
- `searchUsingAi`: Uses Google Gemini AI to understand natural language queries and find relevant courses

**AI Features:**
- Natural language processing
- Semantic course matching
- Smart course recommendations

### Models (Database Schemas)

#### User Model (`userModel.js`)

```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, minlength: 6),
  role: String (enum: ["Student", "Instructor"], default: "Student"),
  photoUrl: String (default: ""),
  description: String (default: ""),
  enrolledCourses: [ObjectId] (ref: 'Course'),
  resetOtp: Number,
  otpExpires: Date,
  isOtpVerified: Boolean (default: false),
  timestamps: true
}
```

#### Course Model (`courseModel.js`)

```javascript
{
  title: String (required),
  subtitle: String,
  description: String,
  category: String (required),
  level: String (enum: ["Beginner", "Intermediate", "Advanced"]),
  price: Number (required),
  thumbnailUrl: String,
  creator: ObjectId (ref: 'User', required),
  lectures: [Lecture Schema],
  enrolledStudents: [ObjectId] (ref: 'User'),
  isPublished: Boolean (default: false),
  reviews: [Review Schema],
  timestamps: true
}
```

#### Lecture Schema (Embedded in Course)

```javascript
{
  lectureTitle: String (required),
  lectureDescription: String,
  videoUrl: String (required),
  isPreviewFree: Boolean (default: false)
}
```

#### Review Schema (Embedded in Course)

```javascript
{
  rating: Number (required, min: 1, max: 5),
  text: String,
  user: ObjectId (ref: 'User', required),
  timestamps: true
}
```

**Note**: Each user can only submit one review per course.

### Middleware

#### is_authenticated.js
JWT-based authentication middleware.

**Functionality:**
- Extracts JWT token from cookies
- Verifies token authenticity
- Attaches userId to request object
- Handles token expiration and invalid tokens

**Error Handling:**
- Returns 401 for missing token
- Returns 403 for invalid/expired token

#### multer.js
File upload configuration.

**Configuration:**
- Storage: Disk storage in `./public` directory
- Filename: `timestamp_originalname`
- Used for: Profile pictures and course videos

### Configuration Files

#### connectDB.js
MongoDB connection setup using Mongoose.

**Features:**
- Connection string from environment variable
- Error handling for connection failures
- Success logging

#### token.js
JWT token generation utility.

**Configuration:**
- Algorithm: HS256
- Expiration: 7 days
- Secret: From environment variable
- Payload: userId

#### cloudinary.js
Cloudinary cloud storage configuration.

**Setup:**
- Cloud name from environment
- API key and secret from environment
- Used for: Images (profile, thumbnails) and videos (lectures)

#### sendMail.js
Nodemailer configuration for sending emails.

**Setup:**
- Service: Gmail SMTP
- Authentication: Gmail credentials from environment
- Used for: OTP emails for password reset

**Email Template:**
- Subject: "Reset Your Password"
- Content: 6-digit OTP with expiration notice

---

## Frontend Documentation

### Application Structure

#### main.jsx
Application entry point.

**Setup:**
- BrowserRouter for routing
- Redux Provider for state management
- Axios configuration with credentials enabled
- Renders App component

#### App.jsx
Root component with routing logic.

**Route Types:**
1. **Public Routes**: Accessible without authentication
2. **Protected Routes**: Require authentication
3. **Instructor Routes**: Require Instructor role

**Key Features:**
- ToastContainer for notifications
- ScrollToTop component
- Route guards (PublicRoute, ProtectedRoute, RoleRoute)

### Pages

#### Public Pages

**Landing.jsx**
- Homepage with hero section
- Course exploration
- About section
- Call-to-action buttons

**Login.jsx**
- Email/password login form
- Google OAuth button
- "Forgot Password" link
- Redirects to home after login

**Register.jsx**
- User registration form
- Role selection (Student/Instructor)
- Google OAuth option
- Form validation

**ForgetPassword.jsx**
- Email input for OTP
- OTP verification
- New password form
- Multi-step password reset flow

#### Student Pages

**Home.jsx**
- Dashboard after login
- Featured courses
- Navigation to course sections

**AllCourses.jsx**
- Browse all published courses
- Course filtering
- Course cards with details
- Enrollment options

**MyEnrolledCourses.jsx**
- Display user's enrolled courses
- Continue learning functionality
- Course progress tracking

**Profile.jsx**
- View user profile
- Display enrolled courses
- Edit profile button

**EditProfile.jsx**
- Update name and description
- Upload profile picture
- Form with image preview

**SearchWithAi.jsx**
- AI-powered course search
- Natural language query input
- Intelligent course recommendations
- Search results display

**PaymentSuccess.jsx**
- Payment confirmation page
- Course enrollment confirmation
- Link to enrolled courses

**PaymentFailure.jsx**
- Payment error page
- Retry payment option

#### Instructor Pages

**Dashboard.jsx**
- Instructor analytics
- Course statistics
- Student enrollment data
- Revenue tracking
- Charts using Recharts

**courses.jsx**
- List of instructor's courses
- Create new course button
- Edit/delete course options
- Course status indicators

**CreateCourses.jsx**
- Multi-step course creation form
- Course details input
- Category and level selection
- Thumbnail upload
- Pricing configuration

**EditCourse.jsx**
- Edit existing course details
- Update thumbnail
- Modify pricing
- Publish/unpublish course

**CreateLecture.jsx**
- Add lectures to course
- Video upload
- Lecture details form
- Preview free option

**EditLecture.jsx**
- Modify lecture details
- Update video
- Change preview settings

**ViewCourse.jsx**
- Complete course overview
- Lectures list
- Enrolled students
- Course reviews
- Edit course button

**ViewLecture.jsx**
- Video player for lecture
- Lecture details
- Navigation between lectures
- Course sidebar

### Components

#### Navbar.jsx
Main navigation component.

**Features:**
- Logo and branding
- Navigation links (Home, Courses, Search, Profile)
- Role-based menu items (Dashboard for Instructors)
- Responsive mobile menu
- Logout functionality

#### Footer.jsx
Application footer.

**Sections:**
- About information
- Quick links
- Contact information
- Social media links
- Copyright notice

#### Card.jsx
Reusable course card component.

**Props:**
- Course data (title, description, price, thumbnail)
- Creator information
- Enrollment count

**Features:**
- Course thumbnail display
- Price formatting
- Click to view course details

#### RoleRoute.jsx
Role-based access control wrapper.

**Functionality:**
- Checks user role from Redux store
- Redirects non-instructors to home
- Protects instructor-only routes

#### ScrollToTop.jsx
Automatic scroll behavior.

**Functionality:**
- Scrolls to top on route change
- Improves user experience

#### ExploreCourses.jsx
Course exploration section.

**Features:**
- Featured courses display
- Browse all button
- Responsive grid layout

#### About.jsx
About section component.

**Content:**
- Platform description
- Mission statement
- Key features

#### Logos.jsx
Brand/partner logos display.

**Features:**
- Responsive logo grid
- Partner/technology logos

### Redux State Management

#### store.js
Central Redux store configuration.

**Setup:**
- Combines all slices
- Middleware configuration
- DevTools integration

#### userSlice.js
User state management.

**State:**
```javascript
{
  userData: null | {
    id, name, email, role, photoUrl, 
    description, enrolledCourses
  }
}
```

**Actions:**
- `setUser`: Set user data
- `clearUser`: Clear user on logout

**Persistence:**
- Saves to localStorage
- Loads on app initialization

#### courseSlice.js
Course state management.

**State:**
```javascript
{
  creatorCourseData: [],  // Instructor's courses
  courseData: [],         // All published courses
  selectedCourse: null    // Currently viewed course
}
```

**Actions:**
- `setCreatorCourses`: Set instructor's courses
- `setCourses`: Set all courses
- `setSelectedCourse`: Set current course
- `clearCourses`: Clear course data

#### lectureSlice.js
Lecture state management.

**State:**
```javascript
{
  lectureData: []  // Lectures for current course
}
```

**Actions:**
- `setLectures`: Set lectures array
- `addLecture`: Add new lecture
- `updateLecture`: Update existing lecture
- `deleteLecture`: Remove lecture

#### reviewSlice.js
Review state management.

**State:**
```javascript
{
  reviews: {},      // Reviews keyed by courseId
  loading: false,
  error: null
}
```

**Actions:**
- `setReviews`: Set reviews for a course
- `addReview`: Add new review
- `setLoading`: Set loading state
- `setError`: Set error state

### Custom Hooks

#### getCurrentUser.js
Fetches current user from backend.

**Functionality:**
- Called on app initialization
- Makes API call to `/api/user/getcurrentuser`
- Updates Redux store with user data
- Falls back to localStorage if offline

**Returns:**
- User data object
- Loading state
- Error state

#### useGetCreatorCourse.js
Fetches instructor's courses.

**Functionality:**
- Called for instructor users
- Makes API call to `/api/course/getcreator`
- Updates Redux courseSlice
- Caches in localStorage

#### getPublishedCourse.js
Fetches all published courses.

**Functionality:**
- Called on public course pages
- Makes API call to `/api/course/getpublished`
- Updates Redux courseSlice
- Available for all users

### Utils

#### firebase.js
Firebase configuration for Google OAuth.

**Setup:**
- Firebase app initialization
- Auth configuration
- Google Auth provider
- Analytics (optional)

**Environment Variables:**
- All Firebase config from `.env`
- API key, project ID, etc.

### Styling

#### Tailwind CSS Configuration
- Utility-first CSS framework
- Custom fonts: Outfit, Montserrat
- Responsive breakpoints
- Custom animations

#### Custom Animations (index.css)
- `dropdownSlide` / `dropdownSlideOut`: Dropdown animations
- `mobileSlide` / `mobileSlideOut`: Mobile menu transitions

**Approach:**
- Component-scoped Tailwind classes
- Consistent color scheme
- Responsive design patterns
- Accessible UI components

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────────┐         ┌──────────────────┐
│      User        │         │     Course       │
├──────────────────┤         ├──────────────────┤
│ _id (PK)         │    ┌────│ _id (PK)         │
│ name             │    │    │ title            │
│ email (unique)   │    │    │ subtitle         │
│ password         │    │    │ description      │
│ role             │    │    │ category         │
│ photoUrl         │    │    │ level            │
│ description      │    │    │ price            │
│ enrolledCourses[]│────┘    │ thumbnailUrl     │
│ resetOtp         │         │ creator (FK)     │────┐
│ otpExpires       │         │ lectures[]       │    │
│ isOtpVerified    │         │ enrolledStudents[]──┘│
└──────────────────┘         │ isPublished      │    │
                             │ reviews[]        │    │
                             └──────────────────┘    │
                                      │              │
                                      │              │
                            ┌─────────┴────────┐     │
                            │                  │     │
                  ┌─────────▼──────┐  ┌────────▼─────┐
                  │    Lecture     │  │    Review     │
                  ├────────────────┤  ├───────────────┤
                  │ _id            │  │ _id           │
                  │ lectureTitle   │  │ rating (1-5)  │
                  │ lectureDesc    │  │ text          │
                  │ videoUrl       │  │ user (FK)     │───┐
                  │ isPreviewFree  │  │ course (FK)   │   │
                  └────────────────┘  └───────────────┘   │
                                                           │
                                                           └──User
```

### Relationships

1. **User → Course (Creator)**
   - Type: One-to-Many
   - An instructor can create multiple courses
   - Field: `course.creator` references `user._id`

2. **User → Course (Enrollment)**
   - Type: Many-to-Many
   - Users can enroll in multiple courses
   - Courses can have multiple enrolled students
   - Fields: `user.enrolledCourses[]` and `course.enrolledStudents[]`

3. **Course → Lecture**
   - Type: One-to-Many (Embedded)
   - A course contains multiple lectures
   - Lectures are embedded documents in course
   - Field: `course.lectures[]`

4. **Course → Review**
   - Type: One-to-Many (Embedded)
   - A course can have multiple reviews
   - Reviews are embedded documents in course
   - Field: `course.reviews[]`
   - Constraint: One review per user per course

5. **User → Review**
   - Type: One-to-Many
   - A user can write multiple reviews
   - Field: `review.user` references `user._id`

### Indexes

**User Model:**
- `email`: Unique index for login
- `_id`: Primary key (automatic)

**Course Model:**
- `_id`: Primary key (automatic)
- `creator`: Index for instructor queries
- `isPublished`: Index for filtering published courses

### Data Validation

**User:**
- Email: Must be valid email format
- Password: Minimum 6 characters
- Role: Must be "Student" or "Instructor"

**Course:**
- Title: Required
- Category: Required
- Price: Required, must be number
- Level: Must be "Beginner", "Intermediate", or "Advanced"

**Lecture:**
- lectureTitle: Required
- videoUrl: Required

**Review:**
- Rating: Required, between 1-5
- User: Required reference
- Course: Required reference

---

## Authentication Flow

### Registration Process

```
User -> Frontend -> Backend -> Database
  │         │          │          │
  └─ Form   │          │          │
    Input   │          │          │
          │          │          │
          └─ POST    │          │
            /register│          │
                   │          │
                   └─ Validate│
                     Input    │
                            │
                            └─ Hash
                              Password
                              (bcrypt)
                                │
                                └─ Create
                                  User
                                  Record
                                    │
                                    └─ Generate
                                      JWT
                                      Token
                                        │
                                        └─ Set
                                          Cookie
                                            │
                                            └─ Return
                                              User Data
```

**Steps:**
1. User fills registration form (name, email, password, role)
2. Frontend sends POST request to `/api/auth/register`
3. Backend validates input (email format, password length)
4. Password hashed with bcrypt (10 salt rounds)
5. User document created in MongoDB
6. JWT token generated (7-day expiration)
7. Token set as httpOnly cookie
8. User data returned to frontend
9. Redux store updated with user data
10. User redirected to home page

### Login Process

```
User -> Frontend -> Backend -> Database
  │         │          │          │
  └─ Login  │          │          │
    Form    │          │          │
          │          │          │
          └─ POST    │          │
            /login   │          │
                   │          │
                   └─ Find    │
                     User     │
                            │
                            └─ Compare
                              Password
                              (bcrypt)
                                │
                                └─ Generate
                                  JWT
                                    │
                                    └─ Set
                                      Cookie
                                        │
                                        └─ Return
                                          User Data
```

**Steps:**
1. User enters email and password
2. Frontend sends POST to `/api/auth/login`
3. Backend finds user by email
4. Password compared with hashed password (bcrypt.compare)
5. If valid, JWT token generated
6. Token set as httpOnly cookie
7. User data returned (excluding password)
8. Redux store updated
9. Redirect to home/dashboard

### Google OAuth Flow

```
User -> Firebase -> Backend -> Database
  │         │          │          │
  └─ Click  │          │          │
    Google  │          │          │
    Button  │          │          │
          │          │          │
          └─ OAuth   │          │
            Flow     │          │
                   │          │
                   └─ ID Token│
                            │
                            └─ Verify
                              Token
                                │
                                └─ Create/Find
                                  User
                                    │
                                    └─ Generate
                                      JWT
                                        │
                                        └─ Return
                                          User Data
```

**Steps:**
1. User clicks "Sign in with Google"
2. Firebase initiates OAuth flow
3. User authenticates with Google
4. Firebase returns ID token
5. Frontend sends token to backend
6. Backend verifies token with Firebase
7. User created or found in database
8. JWT token generated and set
9. User logged in

### Password Reset Flow

```
Forgot Password -> Send OTP -> Verify OTP -> Reset Password
       │              │            │              │
       └─ POST        │            │              │
         /sendotp     │            │              │
                    │            │              │
                    └─ Generate  │              │
                      6-digit    │              │
                      OTP        │              │
                               │              │
                               └─ Email OTP   │
                                 (Nodemailer) │
                                            │
                                            └─ POST
                                              /verifyotp
                                                 │
                                                 └─ Validate
                                                   OTP
                                                     │
                                                     └─ POST
                                                       /resetpassword
                                                          │
                                                          └─ Update
                                                            Password
```

**Steps:**
1. User clicks "Forgot Password"
2. Enters email address
3. Backend generates 6-digit random OTP
4. OTP stored in user document with 10-minute expiration
5. Email sent via Nodemailer (Gmail SMTP)
6. User enters OTP on verification page
7. Backend validates OTP and expiration
8. If valid, marks `isOtpVerified = true`
9. User enters new password
10. Backend hashes new password
11. Password updated in database
12. OTP fields cleared
13. User can log in with new password

### Protected Route Access

```
Request -> Middleware -> Route Handler
   │           │              │
   └─ Cookie   │              │
     (JWT)     │              │
             │              │
             └─ Verify      │
               Token        │
                          │
                          └─ Extract
                            userId
                              │
                              └─ Attach to
                                request
                                  │
                                  └─ Continue to
                                    route handler
```

**Steps:**
1. User makes request to protected route
2. `isAuthenticated` middleware intercepts
3. JWT extracted from cookie
4. Token verified with secret key
5. If valid, userId extracted from payload
6. userId attached to request object
7. Request proceeds to route handler
8. If invalid, 401/403 error returned

### Session Management

- **Token Type**: JWT (JSON Web Token)
- **Storage**: httpOnly cookie (secure, not accessible via JavaScript)
- **Expiration**: 7 days
- **Refresh**: No automatic refresh (re-login required after expiration)
- **Logout**: Cookie cleared on client and server

---

## Payment Integration

### Stripe Integration Architecture

```
Frontend -> Backend -> Stripe API -> Webhook -> Backend
   │           │            │           │          │
   └─ Enroll   │            │           │          │
     Button    │            │           │          │
             │            │           │          │
             └─ Create    │           │          │
               Checkout   │           │          │
               Session    │           │          │
                        │           │          │
                        └─ Session  │          │
                          Created   │          │
                                  │          │
                                  └─ User    │
                                    Pays     │
                                           │
                                           └─ Payment
                                             Success
                                             Event
                                               │
                                               └─ Enroll
                                                 Student
```

### Payment Flow

#### Step 1: Create Checkout Session

**Frontend Action:**
```javascript
// User clicks "Enroll" button
const response = await axios.post('/api/course/create-checkout-session', {
  courseId: selectedCourse._id
});
// Redirect to Stripe Checkout
window.location.href = response.data.url;
```

**Backend Handler:**
```javascript
createCheckoutSession(courseId, userId) {
  1. Fetch course details from database
  2. Create Stripe checkout session:
     - Payment amount: course.price * 100 (cents)
     - Currency: USD
     - Success URL: /payment/success?session_id={CHECKOUT_SESSION_ID}
     - Cancel URL: /payment/failure
     - Metadata: { courseId, userId }
  3. Return session URL
}
```

#### Step 2: User Payment

1. User redirected to Stripe Checkout page
2. User enters payment details (card, billing info)
3. Stripe processes payment securely
4. On success, redirects to success URL
5. On failure, redirects to cancel URL

#### Step 3: Verify Payment (Frontend-Triggered)

**Frontend Action:**
```javascript
// On success page, extract session_id from URL
const sessionId = new URLSearchParams(window.location.search).get('session_id');
const response = await axios.post('/api/course/verify-session', { sessionId });
// Display enrollment confirmation
```

**Backend Handler:**
```javascript
verifySession(sessionId) {
  1. Retrieve session from Stripe
  2. Check payment_status === 'paid'
  3. Extract metadata (courseId, userId)
  4. Enroll student:
     - Add course to user.enrolledCourses
     - Add user to course.enrolledStudents
  5. Return success response
}
```

#### Step 4: Webhook Processing (Async)

**Stripe Configuration:**
- Webhook endpoint: `https://your-backend.com/webhook`
- Events: `checkout.session.completed`

**Backend Handler:**
```javascript
stripeWebhookHandler(event) {
  1. Verify webhook signature (STRIPE_WEBHOOK_SECRET)
  2. Extract event type
  3. If 'checkout.session.completed':
     - Extract session data
     - Get courseId and userId from metadata
     - Double-check enrollment (idempotent operation)
     - Enroll student if not already enrolled
  4. Return 200 OK to Stripe
}
```

### Payment Error Handling

**Scenarios:**
1. **Payment Declined**: User redirected to failure page
2. **Network Error**: Retry mechanism in frontend
3. **Session Expired**: Create new session
4. **Webhook Failure**: Stripe retries automatically
5. **Duplicate Payment**: Idempotent checks prevent duplicate enrollments

### Stripe Configuration

**Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Webhook Setup:**
1. Register webhook URL in Stripe Dashboard
2. Select events: `checkout.session.completed`
3. Copy webhook signing secret
4. Add to environment variables

### Payment Security

1. **Server-side Processing**: All payment logic on backend
2. **Webhook Signatures**: Verified using Stripe secret
3. **HTTPS Only**: All communications over HTTPS
4. **No Card Data**: Never touches your servers (handled by Stripe)
5. **Idempotent Operations**: Prevent duplicate enrollments
6. **Error Logging**: All failures logged for review

### Testing Stripe Integration

**Test Mode:**
- Use Stripe test keys
- Test card numbers:
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - Authentication: `4000 0025 0000 3155`

**Webhook Testing:**
- Use Stripe CLI for local testing
- Forward webhooks to localhost:
  ```bash
  stripe listen --forward-to localhost:5000/webhook
  ```

---

## AI Features

### AI-Powered Course Search

Academix LMS integrates **Google Gemini AI** to provide intelligent, natural language course search capabilities.

### Architecture

```
User Query -> Frontend -> Backend -> Google Gemini API -> Backend -> Frontend
     │           │           │              │               │          │
     └─ Natural  │           │              │               │          │
       Language  │           │              │               │          │
       Input     │           │              │               │          │
               │           │              │               │          │
               └─ POST     │              │               │          │
                 /search   │              │               │          │
                         │              │               │          │
                         └─ Process     │               │          │
                           Query        │               │          │
                                      │               │          │
                                      └─ Generate     │          │
                                        AI Prompt     │          │
                                                    │          │
                                                    └─ Course  │
                                                      IDs      │
                                                             │
                                                             └─ Fetch &
                                                               Return
                                                               Courses
```

### How It Works

#### 1. User Input
User enters natural language queries like:
- "I want to learn web development"
- "Show me courses on machine learning for beginners"
- "Advanced JavaScript courses under $50"
- "Python courses with video lectures"

#### 2. Backend Processing

**searchController.js:**
```javascript
async searchUsingAi(query) {
  // Step 1: Get all published courses from database
  const courses = await Course.find({ isPublished: true });
  
  // Step 2: Format courses for AI
  const courseData = courses.map(course => ({
    _id: course._id,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    category: course.category,
    level: course.level,
    price: course.price
  }));
  
  // Step 3: Create AI prompt
  const prompt = `
    Based on this user query: "${query}"
    Find the most relevant courses from this list:
    ${JSON.stringify(courseData)}
    
    Return only the course IDs as a JSON array.
    Consider title, description, category, level, and price.
  `;
  
  // Step 4: Call Google Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  
  // Step 5: Parse AI response
  const courseIds = JSON.parse(result.response.text());
  
  // Step 6: Fetch full course details
  const matchedCourses = await Course.find({
    _id: { $in: courseIds }
  }).populate('creator');
  
  return matchedCourses;
}
```

#### 3. AI Processing

**Google Gemini AI:**
- Analyzes user query semantically
- Understands intent (learn, explore, find, etc.)
- Matches against course metadata
- Considers:
  - Keywords in title/description
  - Course category
  - Difficulty level
  - Price range
  - Relevance score

#### 4. Results Returned

**Response:**
```javascript
{
  success: true,
  courses: [
    {
      _id: "...",
      title: "Complete Web Development Bootcamp",
      subtitle: "HTML, CSS, JavaScript, React",
      description: "...",
      category: "Web Development",
      level: "Beginner",
      price: 49.99,
      creator: { name: "John Doe", ... },
      thumbnailUrl: "...",
      ...
    },
    // ... more relevant courses
  ]
}
```

### Frontend Integration

**SearchWithAi.jsx:**
```javascript
const handleSearch = async (query) => {
  setLoading(true);
  try {
    const response = await axios.post('/api/course/search', { query });
    setSearchResults(response.data.courses);
  } catch (error) {
    toast.error("Search failed");
  } finally {
    setLoading(false);
  }
};
```

### AI Capabilities

1. **Natural Language Understanding**
   - Understands various phrasings
   - Interprets user intent
   - Handles typos and variations

2. **Semantic Matching**
   - Goes beyond keyword matching
   - Understands course content meaning
   - Finds conceptually similar courses

3. **Context Awareness**
   - Considers user preferences
   - Respects filters (level, price)
   - Prioritizes relevance

4. **Smart Ranking**
   - Ranks results by relevance
   - Considers multiple factors
   - Returns best matches first

### Example Queries

| User Query | AI Understanding | Matched Courses |
|------------|------------------|-----------------|
| "beginner python" | User wants Python courses for beginners | Python courses with level="Beginner" |
| "advanced react under $100" | User wants advanced React courses with price filter | React courses, level="Advanced", price < 100 |
| "learn to build websites" | User wants web development courses | Web Development, HTML/CSS, JavaScript courses |
| "data science with AI" | User wants data science courses involving AI | Data Science, Machine Learning courses |

### Configuration

**Environment Variable:**
```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

**Getting API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy to `.env` file

### Benefits

1. **Better User Experience**: Users can search naturally
2. **Higher Discovery**: Finds relevant courses that keyword search might miss
3. **Time Saving**: No need to browse through all courses
4. **Intelligent Recommendations**: AI understands context and intent
5. **Flexible Search**: Works with various query styles

### Limitations

1. **API Rate Limits**: Subject to Google AI quotas
2. **Response Time**: Slightly slower than keyword search
3. **Accuracy**: Depends on course metadata quality
4. **Cost**: API calls may incur costs in production

---

## Deployment

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Production Setup                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Render/Vercel/Netlify)                           │
│  ├─ React build (npm run build)                             │
│  ├─ Static files served                                      │
│  └─ Environment variables configured                         │
│                                                               │
│  Backend (Render/Heroku/Railway)                             │
│  ├─ Node.js server running                                   │
│  ├─ Environment variables set                                │
│  └─ Connected to MongoDB Atlas                               │
│                                                               │
│  MongoDB Atlas (Cloud Database)                              │
│  ├─ Cluster configured                                       │
│  ├─ IP whitelist set (0.0.0.0/0 for all)                    │
│  └─ Connection string in backend .env                        │
│                                                               │
│  Cloudinary (Media CDN)                                      │
│  ├─ Account created                                          │
│  ├─ Upload preset configured                                 │
│  └─ Credentials in backend .env                              │
│                                                               │
│  Stripe (Payment Processing)                                 │
│  ├─ Live mode enabled                                        │
│  ├─ Webhook endpoint registered                              │
│  └─ Keys in backend .env                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Backend Deployment (Render)

**Current Deployment:**
- URL: `https://academix-lms-an-ai-powered-lms.onrender.com`
- Platform: Render.com

**Steps:**
1. **Create Render Account**: Sign up at render.com
2. **New Web Service**: Create new web service
3. **Connect Repository**: Link GitHub repository
4. **Configure Build**:
   - Build Command: `npm install`
   - Start Command: `npm start` or `node index.js`
   - Root Directory: `Backend`
5. **Environment Variables**: Add all from `.env`:
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `USER_EMAIL`, `USER_PASSWORD`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `GOOGLE_API_KEY`
   - `FRONTEND_URL`
6. **Deploy**: Click "Create Web Service"

### Frontend Deployment (Render)

**Current Deployment:**
- URL: `https://academix-lms-an-ai-powered-lms-1.onrender.com`
- Platform: Render.com

**Steps:**
1. **New Static Site**: Create static site on Render
2. **Connect Repository**: Link GitHub repository
3. **Configure Build**:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Root Directory: `Frontend`
4. **Environment Variables**: Add all Firebase and API variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - `VITE_BACKEND_URL` (set to backend URL)
5. **Deploy**: Click "Create Static Site"

### Alternative Deployment Options

#### Backend Alternatives

**Heroku:**
```bash
# Install Heroku CLI
heroku login
heroku create academix-backend
git subtree push --prefix Backend heroku main
heroku config:set KEY=value  # Add all env variables
```

**Railway:**
1. Connect GitHub repository
2. Select Backend directory
3. Add environment variables
4. Deploy automatically

#### Frontend Alternatives

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel
cd Frontend
vercel
# Follow prompts, add environment variables
```

**Netlify:**
1. Connect GitHub repository
2. Build settings:
   - Base directory: `Frontend`
   - Build command: `npm run build`
   - Publish directory: `Frontend/dist`
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

**Steps:**
1. Create account at mongodb.com/cloud/atlas
2. Create new cluster (free tier available)
3. Database Access:
   - Create database user
   - Set username and password
4. Network Access:
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add specific deployment IPs
5. Connect:
   - Get connection string
   - Replace `<password>` with actual password
   - Add to backend `.env` as `MONGODB_URL`

### Cloudinary Setup

**Steps:**
1. Create account at cloudinary.com
2. Dashboard shows:
   - Cloud name
   - API key
   - API secret
3. Add to backend `.env`
4. Configure upload preset (optional)

### Stripe Production Setup

**Steps:**
1. Switch to Live mode in Stripe Dashboard
2. Get live API keys:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)
3. Configure webhook:
   - URL: `https://your-backend.com/webhook`
   - Events: `checkout.session.completed`
   - Get signing secret (starts with `whsec_`)
4. Update backend `.env` with live keys
5. Test with real card (small amount)

### Firebase Production Setup

**Steps:**
1. Firebase Console → Project Settings
2. Add web app
3. Copy configuration
4. Add domain to authorized domains:
   - Firebase Console → Authentication → Settings
   - Add your production domain
5. Update frontend `.env` with production config

### Environment Variables Checklist

#### Backend
```
✓ PORT
✓ MONGODB_URL (MongoDB Atlas)
✓ JWT_SECRET (strong secret)
✓ CLOUDINARY_NAME
✓ CLOUDINARY_API_KEY
✓ CLOUDINARY_API_SECRET
✓ USER_EMAIL (Gmail)
✓ USER_PASSWORD (Gmail App Password)
✓ STRIPE_SECRET_KEY (live key)
✓ STRIPE_WEBHOOK_SECRET
✓ GOOGLE_API_KEY (Gemini)
✓ FRONTEND_URL (production URL)
```

#### Frontend
```
✓ VITE_FIREBASE_API_KEY
✓ VITE_FIREBASE_AUTH_DOMAIN
✓ VITE_FIREBASE_PROJECT_ID
✓ VITE_FIREBASE_STORAGE_BUCKET
✓ VITE_FIREBASE_MESSAGING_SENDER_ID
✓ VITE_FIREBASE_APP_ID
✓ VITE_FIREBASE_MEASUREMENT_ID
✓ VITE_BACKEND_URL (production backend URL)
```

### Post-Deployment Testing

**Checklist:**
1. ✓ Homepage loads correctly
2. ✓ User registration works
3. ✓ Login/logout functions
4. ✓ Password reset email received
5. ✓ Google OAuth works
6. ✓ Course creation (Instructor)
7. ✓ Lecture upload
8. ✓ Course browsing (Student)
9. ✓ AI search returns results
10. ✓ Stripe payment completes
11. ✓ Course enrollment successful
12. ✓ Video playback works
13. ✓ Profile picture upload
14. ✓ Course reviews submit

### Monitoring & Maintenance

**Recommended Tools:**
- **Error Tracking**: Sentry for error monitoring
- **Logging**: Winston or Morgan for server logs
- **Analytics**: Google Analytics for user behavior
- **Uptime**: UptimeRobot for server monitoring

**Regular Tasks:**
- Monitor server logs for errors
- Check database storage usage
- Review Cloudinary bandwidth
- Monitor Stripe transactions
- Update dependencies monthly
- Backup database regularly

### Performance Optimization

**Backend:**
- Enable MongoDB indexes
- Implement Redis caching (optional)
- Compress responses (gzip)
- Optimize database queries
- Use CDN for static assets

**Frontend:**
- Code splitting
- Lazy loading components
- Image optimization
- Service worker (PWA)
- Minimize bundle size

### Security Best Practices

1. **Environment Variables**: Never commit to Git
2. **HTTPS Only**: Force HTTPS in production
3. **CORS**: Restrict to specific domains
4. **Rate Limiting**: Implement API rate limits
5. **Input Validation**: Validate all user inputs
6. **SQL Injection**: Use parameterized queries (Mongoose protects)
7. **XSS Protection**: Sanitize user content
8. **Dependencies**: Regularly update packages
9. **Secrets Rotation**: Rotate JWT secret periodically
10. **Logging**: Don't log sensitive data

---

## Conclusion

Academix LMS is a modern, full-stack Learning Management System that leverages cutting-edge technologies to provide a seamless learning experience. With features like AI-powered search, secure payments, and role-based access control, it offers a comprehensive solution for online education.

### Key Takeaways

- **Full-Stack**: Complete MERN stack application
- **AI-Powered**: Google Gemini integration for intelligent search
- **Secure**: JWT authentication, bcrypt hashing, HTTPS
- **Payment Ready**: Stripe integration for monetization
- **Scalable**: Cloud-based architecture (MongoDB Atlas, Cloudinary)
- **Modern UI**: React 19, Tailwind CSS, responsive design
- **Role-Based**: Separate experiences for students and instructors

### Project Structure Summary

- **61+ Code Files**: Comprehensive codebase
- **4 Database Models**: User, Course, Lecture, Review
- **20+ API Endpoints**: RESTful API design
- **20 Pages**: Complete user journey covered
- **9 Components**: Reusable React components
- **4 Redux Slices**: Organized state management

### Tech Highlights

- **React 19**: Latest React features
- **Express 5**: Modern Express version
- **Mongoose 8**: Latest MongoDB ODM
- **Stripe 20**: Latest payment integration
- **Tailwind 4**: Latest Tailwind CSS

### Future Enhancements

**Potential Features:**
- Live video lectures with WebRTC
- Real-time chat between students and instructors
- Course completion certificates (PDF generation)
- Discussion forums per course
- Quiz and assessment system
- Mobile app (React Native)
- Instructor earnings dashboard
- Affiliate marketing program
- Course bundles and discounts
- Email notifications for course updates
- Progress tracking dashboard
- Wishlist functionality
- Gift course feature
- Social media integration
- Gamification (badges, leaderboards)

### Contributing

For contributions, please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Support

For issues or questions:
- GitHub Issues: [Repository Issues](https://github.com/XainMuhammadKhan/Academix-LMS-An-AI-powered-LMS/issues)
- Email: support@academix.com (if available)

---

**Documentation Version**: 1.0  
**Last Updated**: February 2026  
**Project**: Academix LMS  
**Author**: Xain Muhammad Khan  
**License**: ISC

---

This documentation covers the complete Academix LMS project. For specific code examples or detailed implementation guidance, refer to the source code in the repository.
