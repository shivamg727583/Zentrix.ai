# 🚀 AI SaaS Backend

A scalable AI-powered SaaS backend built with **Node.js, Express, and modern AI APIs**.
This backend provides multiple AI utilities like content generation, image processing, and resume analysis.

---

## 🔥 Features

* ✍️ **Article Generator**
* 📰 **Blog Title Generator**
* 🎨 **AI Image Generation (Text → Image)**
* 🖼️ **Background Removal (Cloudinary AI)**
* 🧹 **Object Removal from Images**
* 📄 **Resume Review (PDF Analysis)**
* ❤️ **Like & Publish System**
* 🔐 **Authentication (Clerk)**
* 📊 **Usage Limiting (Free vs Premium)**

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (Neon Serverless)

### Authentication

* Clerk

### AI & APIs

* Gemini API (via OpenAI SDK)
* ClipDrop API (Image Generation)
* Cloudinary (Image Processing)

### File Handling

* Multer

---

## 📁 Project Structure

```bash
src/
 ├── configs/
 │     ├── db.js
 │     ├── multer.js
 │     ├── cloudinary.js
 │     ├── openai.js
 │
 ├── controllers/
 │     ├── ai.controller.js
 │     ├── user.controller.js
 │
 ├── services/
 │     ├── ai.service.js
 │     ├── image.service.js
 │     ├── user.service.js
 │
 ├── utils/
 │     ├── promptBuilder.js
 │     ├── responseHandler.js
 │
 ├── middlewares/
 │     ├── auth.js
 │     ├── usageLimiter.js
 │
 ├── routes/
 │     ├── aiRoutes.js
 │     ├── userRoutes.js
 │     ├── webhook.js
 │
 ├── server.js
```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```env
PORT=3000

DATABASE_URL=your_neon_database_url

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
```

---

## 🚀 Installation & Setup

```bash
# Clone repo
git clone <your-repo-url>

# Install dependencies
npm install

# Run server
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### 🧠 AI Routes

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| POST   | `/api/ai/generate-article`        | Generate article     |
| POST   | `/api/ai/generate-blog-title`     | Generate blog titles |
| POST   | `/api/ai/generate-images`         | Generate AI image    |
| POST   | `/api/ai/remove-image-background` | Remove background    |
| POST   | `/api/ai/remove-image-object`     | Remove object        |
| POST   | `/api/ai/resume-review`           | Review resume        |

---

### 👤 User Routes

| Method | Endpoint                            | Description  |
| ------ | ----------------------------------- | ------------ |
| GET    | `/api/user/get-user-creations`      | User history |
| GET    | `/api/user/get-published-creations` | Public feed  |
| GET    | `/api/user/toggle-like/:id`         | Like/unlike  |

---

## 🧠 AI System Design

* Uses **Gemini via OpenAI-compatible SDK**
* Structured prompts for:

  * Article writing
  * Title generation
  * Resume analysis
* Optimized for:

  * Better output quality
  * Lower token usage
  * Faster response time

---

## ⚡ Performance Optimizations

* ✅ Modular architecture (services + controllers)
* ✅ Reduced code duplication (DRY)
* ✅ Centralized error handling
* ✅ Optimized image upload pipeline
* ✅ Usage limiting middleware
* ✅ Clean prompt engineering

---

## 🔐 Authentication & Plans

Handled via **Clerk**

* Free users → limited usage
* Premium users → unlimited access

---

## 🧾 Database Schema

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📦 Deployment

You can deploy on:

* Vercel
* Render
* Railway

---

## 🧠 Future Improvements

* Redis caching
* Queue system (BullMQ for AI jobs)
* Rate limiting
* Logging system (Winston)
* Retry system for API failures
* Streaming responses

---

## 👨‍💻 Author

**Shivam Gupta**

---

## ⭐ Final Note

This project is designed with **scalability, clean architecture, and real-world SaaS practices** in mind.
It can be extended into a full production-grade AI platform.

---
