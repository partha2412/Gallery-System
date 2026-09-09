# AI-Powered Semantic Image Gallery

A full-stack image gallery application that allows users to securely upload, manage, browse, and semantically search images.

The application uses **Jina-CLIP-v2** to convert both images and text queries into embeddings and **Qdrant** to perform vector similarity search. Images are stored in **Cloudinary**, while image metadata and user information are stored in **MongoDB**.

---

## Features

* User registration and login
* JWT-based authentication
* HTTP-only authentication cookies
* Google OAuth integration
* Protected gallery routes
* Upload images directly from the gallery
* Cloudinary image storage
* Automatic image embedding generation
* Jina-CLIP-v2 multimodal embeddings
* Qdrant vector database
* Semantic text-to-image search
* Search results ordered by vector similarity
* Personal image gallery
* Browse all available images
* Image preview modal
* Image deletion
* Image metadata management
* Responsive React interface
* Loading states and toast notifications
* Request validation
* Rate limiting
* Security headers with Helmet
* HTTP parameter pollution protection
* Response compression
* Structured server logging

---

## How It Works

The main functionality is based on a multimodal embedding and vector-search pipeline.

### Image Upload Flow

When a user uploads an image:

```text
User selects image
       |
       v
React Client
       |
       v
Express API
       |
       v
Multer receives image in memory
       |
       +--------------------+
       |                    |
       v                    v
Cloudinary             Jina AI
Image Storage           Jina-CLIP-v2
       |                    |
       v                    v
Image URL             Image Embedding
       |                    |
       +---------+----------+
                 |
                 v
              Qdrant
          Vector Storage
                 |
                 v
        MongoDB stores metadata
        + Qdrant vector ID
```

The backend first uploads the image to Cloudinary and stores its metadata in MongoDB. It then sends the image to the Jina embedding API using the `jina-clip-v2` model. The generated vector is stored in Qdrant together with the MongoDB image ID and user ID. Finally, the generated Qdrant vector ID is saved back into the MongoDB image document.

---

## Semantic Search Flow

The search system supports natural-language queries instead of requiring exact filenames.

For example:

```text
"people playing football"
"sunset at the beach"
"red car"
"mountains"
"dog"
```

The search pipeline works as follows:

```text
User enters text query
        |
        v
React Client
        |
        v
Express Search API
        |
        v
Jina-CLIP-v2
        |
        v
Text Embedding
        |
        v
Qdrant Similarity Search
        |
        v
Top matching image IDs
        |
        v
MongoDB
        |
        v
Image Metadata + URLs
        |
        v
Gallery Results
```

The text query is converted into an embedding using Jina-CLIP-v2. That vector is then compared against image vectors stored in Qdrant using cosine similarity.

The application retrieves the corresponding image documents from MongoDB and preserves the similarity ranking returned by Qdrant.

---

## Architecture

The backend follows a layered architecture:

```text
Client
  |
  | REST API
  v
Express.js
  |
  +---- Middleware
  |
  +---- Controllers
  |
  +---- Services
  |
  +---- Repositories
  |
  +---- MongoDB
  |
  +---- Cloudinary
  |
  +---- Jina AI
  |
  +---- Qdrant
```

### Backend Layers

```text
server/
└── src/
    ├── config/
    ├── constant/
    ├── database/
    ├── middlewares/
    ├── models/
    ├── modules/
    ├── repository/
    ├── service/
    ├── shared/
    ├── storage/
    ├── utils/
    ├── validation/
    └── vector/
```

Controllers handle HTTP requests and responses.

Services contain application/business logic.

Repositories handle MongoDB operations.

Models define MongoDB schemas.

The vector service handles Qdrant operations.

The embedding service communicates with the Jina AI embedding API.

The storage layer handles Cloudinary operations.

---

# Tech Stack

## Frontend

* React 19
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React
* React Hot Toast
* Oxlint

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Passport
* Google OAuth
* Multer
* Axios
* Zod

## AI / Vector Search

* Jina-CLIP-v2
* Jina AI Embeddings API
* Qdrant

## Cloud Storage

* Cloudinary

## Security / Middleware

* Helmet
* HPP
* CORS
* Express Rate Limit
* Compression
* Cookie Parser
* Express Validator

## Logging

* Pino
* Pino Pretty
* Morgan

---

# Project Structure

```text
partha2412-gallery-system/
│
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── src/
│       ├── api/
│       │   ├── auth.api.js
│       │   ├── axios.js
│       │   ├── gallery.api.js
│       │   ├── index.js
│       │   └── user.api.js
│       │
│       ├── components/
│       │   ├── Header.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── ThemeContext.jsx
│       │
│       ├── pages/
│       │   ├── Auth.jsx
│       │   ├── GalleryPage.jsx
│       │   ├── Home.jsx
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   └── Singup.jsx
│       │
│       ├── routes/
│       │   └── paths.js
│       │
│       └── utils/
│           └── toast.js
│
└── server/
    ├── package.json
    ├── server.js
    ├── .env.example
    │
    └── src/
        ├── app.js
        │
        ├── config/
        │   ├── env.js
        │   └── logger.js
        │
        ├── constant/
        │   └── app.constant.js
        │
        ├── database/
        │   └── db.js
        │
        ├── middlewares/
        │   ├── auth.middleware.js
        │   ├── errorHandler.middleware.js
        │   ├── googleOauth.middleware.js
        │   ├── security.middleware.js
        │   └── upload.middleware.js
        │
        ├── models/
        │   ├── auth.model.js
        │   └── gallery.model.js
        │
        ├── modules/
        │   ├── auth/
        │   │   ├── auth.controller.js
        │   │   ├── auth.route.js
        │   │   └── auth.service.js
        │   │
        │   └── gallery/
        │       ├── gallery.controller.js
        │       └── gallery.routes.js
        │
        ├── repository/
        │   ├── auth.repo.js
        │   └── gallery.repository.js
        │
        ├── service/
        │   ├── embedding.service.js
        │   ├── gallery.service.js
        │   └── vector.service.js
        │
        ├── shared/
        │   └── error/
        │       ├── ApiError.js
        │       └── globalError.js
        │
        ├── storage/
        │   └── cloudinary.storage.js
        │
        ├── utils/
        │   ├── asyncHandler.js
        │   ├── generateToken.js
        │   └── validRequest.js
        │
        ├── validation/
        │   ├── validationAccessToken.js
        │   └── validationRule.js
        │
        └── vector/
            └── qdrant.js
```

---

# Prerequisites

Before running the project, install:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database
* Cloudinary account
* Qdrant Cloud account
* Jina AI API key
* Google Cloud OAuth credentials if Google authentication is required

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/partha2412-gallery-system.git
```

Move into the project:

```bash
cd partha2412-gallery-system
```

The project contains separate frontend and backend applications.

---

# Backend Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

The backend uses ES modules and provides the following scripts:

```bash
npm start
```

Starts the backend using Node.js.

```bash
npm run dev
```

Starts the backend using Nodemon during development.

---

# Backend Environment Variables

Create a `.env` file inside the `server` directory:

```text
server/
├── .env
├── .env.example
├── package.json
└── server.js
```

Add the following variables:

```env
PORT=3000

REACT_CLIENT_URL=http://localhost:5173

MONGO_URL=mongodb://127.0.0.1:27017/gallery_system

GOOGLE_CALLBACK_URL=http://localhost:3000/api/user/google/callback
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

ACCESSTOKEN=your_access_token_secret
REFRESHTOKEN=your_refresh_token_secret

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=image_embeddings

JINA_API_KEY=your_jina_api_key
```

Never commit `.env` or expose API keys publicly.

---

# MongoDB Setup

You can use either a local MongoDB instance or MongoDB Atlas.

For local MongoDB:

```env
MONGO_URL=mongodb://127.0.0.1:27017/gallery_system
```

For MongoDB Atlas, use your Atlas connection string:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
```

The backend connects to MongoDB using Mongoose.

---

# Cloudinary Setup

Cloudinary is used to store the actual image files.

Create a Cloudinary account and obtain:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

The application uploads images into the:

```text
gallery
```

Cloudinary folder.

The database stores the Cloudinary URL and public ID rather than storing the image binary in MongoDB.

---

# Qdrant Setup

Qdrant stores the image embeddings used for semantic search.

Create a Qdrant Cloud cluster and obtain:

```env
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=image_embeddings
```

The application automatically creates the configured collection if it does not already exist.

The collection uses:

```text
Distance: Cosine
```

The vector dimension is determined automatically from the generated embedding.

Each vector contains payload information such as:

```json
{
  "imageId": "mongodb-image-id",
  "userId": "mongodb-user-id",
  "type": "image"
}
```

---

# Jina AI Setup

The project uses:

```text
jina-clip-v2
```

through the Jina AI embeddings API.

Add your API key:

```env
JINA_API_KEY=your_jina_api_key
```

The backend uses the same model for both:

```text
Image → Embedding
Text  → Embedding
```

This allows a text query to be compared directly against stored image embeddings.

---

# Frontend Setup

Open another terminal.

From the project root:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_SERVER_API=http://localhost:3000
```

The frontend Axios client uses `VITE_SERVER_API` as the backend base URL.

---

# Run the Application

You need to run both the backend and frontend.

## Terminal 1 — Backend

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

## Terminal 2 — Frontend

```bash
cd client
npm run dev
```

Vite will provide a local frontend URL, normally:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

---

# Using the Application

## 1. Create an Account

Open the application and go to:

```text
/signup
```

Create an account using the registration form.

You can then log in through:

```text
/login
```

Authentication uses JWT tokens stored in HTTP-only cookies.

---

## 2. Open the Gallery

After authentication, open:

```text
/gallery
```

The gallery is protected, so unauthenticated users are redirected to the login page.

---

## 3. Upload an Image

Click:

```text
Add photo
```

Select an image from your computer.

The backend then:

1. Receives the image using Multer.
2. Uploads the image to Cloudinary.
3. Creates the image metadata in MongoDB.
4. Generates an image embedding using Jina-CLIP-v2.
5. Stores the embedding in Qdrant.
6. Saves the Qdrant vector ID in MongoDB.

The uploaded image then appears in the gallery.

---

## 4. Search Images

Use the search field:

```text
Search your photos...
```

Enter a natural-language description.

For example:

```text
dog
```

or:

```text
a person standing near the ocean
```

or:

```text
cars on a road
```

The application converts the text into a Jina-CLIP-v2 embedding and sends it to Qdrant.

Qdrant returns the most similar image vectors.

The corresponding MongoDB records are then fetched and displayed in similarity order.

---

## 5. View an Image

Click an image in the gallery to open the image preview.

The preview provides:

* Full image view
* Image name
* File size
* Download action
* Delete action

---

## 6. Delete an Image

When an image is deleted, the application removes:

```text
Qdrant vector
      +
Cloudinary image
      +
MongoDB metadata
```

This prevents orphaned vector records and stored files.

---

# API Endpoints

## Authentication

Base URL:

```text
/api/user
```

### Register

```http
POST /api/user/register
```

### Login

```http
POST /api/user/login
```

### Get Current User

```http
GET /api/user/me
```

### Logout

```http
POST /api/user/logout
```

### Refresh Access Token

```http
POST /api/user/refresh
```

### Check Email

```http
POST /api/user/check-email
```

### Google OAuth

```http
GET /api/user/google
```

```http
GET /api/user/google/callback
```

### Forgot Password

```http
POST /api/user/forgot_password
```

### Reset Password

```http
POST /api/user/reset-password/:token
```

---

# Gallery API

Base URL:

```text
/api/v1/gallery
```

All gallery endpoints require authentication.

### Upload Image

```http
POST /api/v1/gallery
```

Form-data:

```text
image: <image-file>
```

Maximum upload size configured by Multer:

```text
10 MB
```

### Get My Images

```http
GET /api/v1/gallery
```

### Get All Images

```http
GET /api/v1/gallery/all
```

### Semantic Search

```http
POST /api/v1/gallery/search
```

Request body:

```json
{
  "query": "people playing football"
}
```

### Get Single Image

```http
GET /api/v1/gallery/:imageId
```

### Update Image

```http
PATCH /api/v1/gallery/:imageId
```

### Delete Image

```http
DELETE /api/v1/gallery/:imageId
```

---

# Health Check

The backend exposes:

```http
GET /health
```

A healthy response contains information about:

* Server status
* Database status
* Application uptime
* Timestamp

Example:

```json
{
  "status": "healthy",
  "server": "ok",
  "database": "ok",
  "uptime": 123.45,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

# Authentication

The application uses JWT-based authentication.

Access and refresh tokens are stored using HTTP-only cookies.

The authentication flow is approximately:

```text
Login
  |
  v
Validate Credentials
  |
  v
Generate JWT Tokens
  |
  v
HTTP-only Cookies
  |
  v
Protected API Requests
```

Protected routes verify the access token before allowing access to gallery resources.

---

# Security

The backend includes several security and performance middleware components:

* Helmet
* HPP
* CORS
* Express Rate Limit
* Compression
* Cookie Parser
* Request validation

The application also uses HTTP-only cookies for authentication tokens.

The upload middleware limits image uploads to 10 MB.

---

# Data Storage Architecture

The application deliberately separates image storage, metadata storage, and vector storage.

```text
                 ┌─────────────────┐
                 │    Cloudinary   │
                 │                 │
                 │ Actual Images   │
                 └────────┬────────┘
                          │
                          │ URL
                          v
┌──────────────┐    ┌──────────────┐
│    Qdrant    │    │   MongoDB    │
│              │    │              │
│ Embeddings   │    │ Metadata     │
│              │    │ User Data    │
│ Similarity   │    │ Vector ID    │
│ Search       │    │ Image URL    │
└──────────────┘    └──────────────┘
```

MongoDB stores application metadata.

Cloudinary stores image files.

Qdrant stores vector embeddings and performs similarity search.

---

# Embedding Architecture

The application uses Jina-CLIP-v2 as a multimodal embedding model.

For uploaded images:

```text
Image
  ↓
Jina-CLIP-v2
  ↓
Image Vector
  ↓
Qdrant
```

For search queries:

```text
Text Query
  ↓
Jina-CLIP-v2
  ↓
Text Vector
  ↓
Qdrant
  ↓
Similar Image Vectors
```

Because image and text embeddings are generated in the same multimodal embedding space, text-to-image semantic search is possible.

---

# Development Commands

## Client

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production frontend:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Server

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

---

# Environment Variables Summary

## Server

```env
PORT=3000
REACT_CLIENT_URL=http://localhost:5173

MONGO_URL=

GOOGLE_CALLBACK_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

ACCESSTOKEN=
REFRESHTOKEN=

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=image_embeddings

JINA_API_KEY=
```

## Client

```env
VITE_SERVER_API=http://localhost:3000
```

---

# Troubleshooting

## MongoDB connection error

Check:

```env
MONGO_URL=
```

Make sure MongoDB is running or that your MongoDB Atlas connection string is valid.

---

## Qdrant errors

Check:

```env
QDRANT_URL=
QDRANT_API_KEY=
QDRANT_COLLECTION=
```

Make sure the Qdrant API key has permission to access the cluster.

---

## Jina embedding errors

Check:

```env
JINA_API_KEY=
```

Make sure the API key is valid and that your Jina AI account has access to the required embedding API.

---

## Cloudinary upload errors

Check:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Make sure all three values belong to the same Cloudinary account.

---

## CORS errors

Make sure the frontend URL matches:

```env
REACT_CLIENT_URL=http://localhost:5173
```

Also make sure the frontend is configured with:

```env
VITE_SERVER_API=http://localhost:3000
```

---

## Authentication not working

The frontend Axios client uses:

```text
withCredentials: true
```

The backend CORS configuration also enables credentials.

For local development, make sure the frontend and backend URLs match your environment configuration.

---

# Important Notes

The current backend entry point calls:

```javascript
listen(3000)
```

directly. Therefore, changing the `PORT` environment variable currently does not change the actual listening port unless the server entry point is modified to use `env.PORT`.

The project contains Google OAuth configuration and routes, but OAuth requires valid Google Cloud credentials and a correctly configured callback URL.

Some password-reset functionality exists in the project but parts of the service logic are incomplete/commented and should be reviewed before treating the feature as production-ready.

The current project does not include a test suite; the server's `test` script is currently a placeholder.

---

# Future Improvements

Potential improvements include:

* Pagination for large galleries
* Search filters
* Better Qdrant payload filtering by user
* Background processing for embedding generation
* Image deduplication
* Batch image upload
* Image similarity search using uploaded query images
* Search result pagination
* Embedding caching
* Async job queue for image processing
* Automated tests
* CI/CD pipeline
* Better transaction/rollback handling between MongoDB, Cloudinary, and Qdrant
* Production deployment configuration
* Improved OAuth account handling

---

# License

This project is currently distributed under the license specified in the repository/package configuration.

If you modify the project for public distribution, add an explicit `LICENSE` file to the repository.

---

# Author

**Partha**

AI/ML and Full-Stack Developer

Built with React, Node.js, MongoDB, Qdrant, Cloudinary, and Jina-CLIP-v2.
