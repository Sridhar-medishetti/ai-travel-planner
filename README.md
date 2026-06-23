# 🌍 AI Travel Planner

An AI-powered full-stack travel planning application that helps users generate personalized travel itineraries, budget estimates, hotel recommendations, and travel tips using Google Gemini AI. Users can create, manage, customize, and regenerate trip plans through an intuitive dashboard.

---

## 🚀 Live Demo

### Frontend

https://ai-travel-planner-psi-gilt.vercel.app/

### Backend API

https://ai-travel-planner-j9mo.onrender.com/

---

## 📌 Features

### 🔐 Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Protected Routes
* Secure User-Specific Trip Access

### ✈️ AI Trip Planning

* Generate Personalized Travel Itineraries
* Destination-Based Planning
* Budget-Aware Recommendations
* Interest-Based Activity Suggestions
* AI-Powered Travel Tips

### 🗺️ Trip Management

* Create New Trips
* View Trip Details
* Delete Trips
* Regenerate Specific Day Itineraries
* Add Activities to Existing Days
* Remove Activities from Itinerary

### 💰 Budget Planning

* Flight Cost Estimation
* Accommodation Cost Estimation
* Food Budget Suggestions
* Activity Budget Planning
* Total Trip Cost Calculation

### 🏨 Hotel Recommendations

* Budget Hotels
* Mid-Range Hotels
* Luxury Hotels
* AI-Generated Hotel Suggestions

### 📊 Dashboard

* View All Created Trips
* Trip Cards with Quick Overview
* One-Click Trip Access
* Responsive UI Design

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### AI Integration

* Google Gemini API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```text
ai-travel-planner
│
├── client
│   ├── app
│   │   ├── login
│   │   ├── register
│   │   ├── dashboard
│   │   ├── create-trip
│   │   └── trips/[id]
│   │
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Sridhar-medishetti/ai-travel-planner.git

cd ai-travel-planner
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend:

```bash
http://localhost:3000
```

Backend:

```bash
http://localhost:5000
```

---

## 🔑 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Trips

```http
POST   /api/trips
GET    /api/trips
GET    /api/trips/:id
DELETE /api/trips/:id
```

### Itinerary Management

```http
PUT /api/trips/:id/add-activity
PUT /api/trips/:id/remove-activity
PUT /api/trips/:id/regenerate-day
```

---

## 🧠 AI Workflow

1. User enters destination, budget, trip duration, and interests.
2. Backend sends prompt to Gemini AI.
3. Gemini generates:

   * Day-wise itinerary
   * Hotel recommendations
   * Budget estimates
   * Travel tips
4. Data is stored in MongoDB Atlas.
5. Users can modify, customize, and regenerate itinerary days anytime.

---

## 🎯 Key Highlights

* Full Stack Application Development
* RESTful API Design
* JWT Authentication & Authorization
* MongoDB Database Integration
* AI-Powered Content Generation
* Responsive UI with Tailwind CSS
* Dynamic Routing in Next.js
* Cloud Deployment with Render & Vercel

---

## 📈 Future Enhancements

* Export Itinerary as PDF
* Weather Forecast Integration
* Interactive Maps
* Flight Search Integration
* Trip Sharing
* Collaborative Trip Planning
* Expense Tracking
* Email Notifications

---

## 👨‍💻 Author

### Sridhar Medishetti

* GitHub: https://github.com/Sridhar-medishetti
* LinkedIn: https://www.linkedin.com/in/sridhar-medishetti/

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
