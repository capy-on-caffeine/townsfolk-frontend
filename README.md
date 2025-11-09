# Townsfolk Frontend

Townsfolk is a Next.js application designed to bridge the gap between idea and validation. Instead of relying on intuition or guesswork, Townsfolk uses AI-powered personas to deliver instant, actionable feedback on your startup ideas, product features, or MVP links.

This repository contains the frontend client built with the Next.js App Router, Tailwind CSS v4, and Auth0 for secure authentication.

---

## 🚀 Features

### 🤖 AI Persona Feedback

Submit your idea and receive detailed feedback from multiple, distinct AI personas.

### 🔐 Secure Authentication

Integrated with Auth0 using the SPA model for safe and seamless login.

### 📂 Idea Management

View, manage, and track all your submitted ideas and feedback history via a personal dashboard.

### 💡 New Idea Submission

Submit your idea with a guided form including title, description, target audience, and optional MVP link.

### 📈 Real-Time Status Updates

Monitor the progress of feedback generation from the backend in real time.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16.0+ (App Router)
* **Styling:** Tailwind CSS v4
* **Authentication:** Auth0 React SDK
* **Package Manager:** pnpm (recommended), npm, or yarn
* **Runtime:** Node.js 20.x or later

---

## 🏁 Getting Started

Follow these instructions to run the frontend locally.

### 1. Prerequisites

* Node.js v20.x or later
* pnpm (recommended), npm, or yarn
* Running instance of the **Townsfolk Backend**
* Auth0 account (free tier supported)

### 2. Auth0 Configuration

1. Create a new **Single Page Application (SPA)** in the Auth0 dashboard.
2. In the application's **Settings**, configure the following:

   * **Allowed Callback URLs:** `http://localhost:3000`
   * **Allowed Logout URLs:** `http://localhost:3000`
   * **Allowed Web Origins:** `http://localhost:3000`
3. Go to **APIs** → Create a new API

   * Set an **Identifier** such as: `https://api.townsfolk.com`
   * Use this value as the `NEXT_PUBLIC_AUTH0_AUDIENCE` in your environment variables.

### 3. Environment Variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your own configuration:

```bash
# URL of your running backend server
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# --- Auth0 Credentials ---
# Found in your Auth0 Application settings
NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id

# The "Identifier" from your Auth0 API settings
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.townsfolk.com
```

---

## 4. Installation & Launch

### Clone the repository

```bash
git clone https://github.com/your-username/townsfolk-frontend.git
cd townsfolk-frontend
```

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser to view the application.

---

## 🖼️ Application Snapshots

* Clean and simple form interface for submitting new ideas
* Detailed persona feedback view with multiple AI-generated insights

---

## 🔗 Backend Integration

This frontend communicates with the **Townsfolk Backend**, a Node.js/Express server responsible for:

* Secure idea submission and management
* Real-time status tracking for feedback generation
* AI model interaction to generate persona-based feedback
* Serving final results to the frontend

Townsfolk Backend : https://github.com/capy-on-caffeine/townsfolk-backend

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Contributing

Contributions are welcome. Fork the repository, open issues, or submit PRs to enhance functionality.

---

## 📧 Support

For assistance or feature requests, please open an issue in this repository.
