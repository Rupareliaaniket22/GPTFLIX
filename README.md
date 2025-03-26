

# GPTFLIX

GPTFLIX is a Netflix-inspired movie web application that allows users to search for movies, watch trailers, and read descriptions. It features an AI-powered recommendation system utilizing the OpenRouter and Qwen APIs to suggest movies. Built with React, Tailwind CSS, and JavaScript, GPTFLIX offers a sleek, fast, and interactive movie discovery experience.

## Features

- **Movie Search**: Find movies by title and view detailed information.  
- **Trailers**: Watch movie trailers directly within the app.  
- **AI-Powered Recommendations**: Receive personalized movie suggestions using OpenRouter and Qwen APIs.  
- **Responsive Design**: Optimized for various devices with a sleek interface.  

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run GPTFLIX locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Rupareliaaniket22/GPTFLIX.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd GPTFLIX
   ```

3. **Install Dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_QWEN_KEY=your_qwen_api_key
   VITE_TMDB_KEY=your_tmdb_api_key
   VITE_FIREBASE_KEY=your_firebase_api_key
   ```

   Replace `your_qwen_api_key`, `your_tmdb_api_key`, and `your_firebase_api_key` with your actual API keys.

5. **Configure Firebase**:

   Create a `src/utils/firebase.js` file and add your Firebase configuration:

   ```javascript
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: process.env.VITE_FIREBASE_KEY,
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };

   const app = initializeApp(firebaseConfig);

   export default app;
   ```

   Replace `your-project-id`, `your-messaging-sender-id`, and `your-app-id` with your actual Firebase configuration values.

6. **Start the Development Server**:

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   The application will be running at `http://localhost:3000` by default.

## Building for Production

To create a production build:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

The optimized files will be in the `dist` directory.

## Deployment

GPTFLIX can be deployed using various platforms that support static sites, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Firebase Hosting](https://firebase.google.com/docs/hosting). Ensure that your environment variables are correctly set up in your deployment platform.



## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
- [OpenRouter API](https://openrouter.ai/)
- [Qwen API](https://qwen.ai/)
- [Firebase](https://firebase.google.com/)

---
