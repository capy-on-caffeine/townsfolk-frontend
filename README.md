<div align="center">

Townsfolk
Get AI-powered persona feedback on your startup ideas. Instantly.

Townsfolk is a Next.js application designed to bridge the gap between idea and validation. Instead of guessing what your users think, Townsfolk uses a team of AI-powered personas to give you instant, detailed feedback on your startup ideas, product features, and MVP links.

This repository contains the frontend client built with the Next.js App Router, Tailwind v4, and Auth0.

</div>

<div align="center">

</div>

🚀 Features
🤖 AI Persona Feedback: Submit your startup idea and receive a detailed analysis from multiple, distinct AI personas.

🔐 Secure Authentication: Full integration with Auth0 for safe, simple user login, and management using the SPA model.

📂 Idea Management: A personal dashboard to view, manage, and track all your submitted ideas and their feedback status.

💡 New Idea Form: A simple, guided form to submit your idea's title, description, target audience, and an optional MVP link.
 
📈 Real-time Status: Watch as your feedback is generated with real-time status updates from the backend.




🛠️ Tech Stack
Framework: Next.js 16.0+ (App Router)

Styling: Tailwind CSS v4

Authentication: Auth0 React SDK

Package Manager: pnpm (also supports npm or yarn)

Runtime: Node.js 20.x or later

🏁 Getting Started
Follow these steps to get the frontend running locally.

1. Prerequisites
Node.js: v20.x or later.

Package Manager: pnpm (recommended), npm, or yarn.

Backend Server: You must have the Townsfolk Backend running.

Auth0 Account: A free Auth0 account is required for authentication.

2. Auth0 Configuration
Before you can run the app, you must configure Auth0.

Go to your Auth0 dashboard and create a new Application of type Single Page Application (SPA).

In the application's Settings tab, add the following URLs:

Allowed Callback URLs: http://localhost:3000

Allowed Logout URLs: http://localhost:3000

Allowed Web Origins: http://localhost:3000

Go to the APIs section in your Auth0 dashboard (left sidebar) and create a new API.

Set the Identifier (Audience) to a unique URL, for example: https://api.townsfolk.com. You will use this value in your .env.local.

3. Environment Variables
Copy the example environment file and fill in your credentials from the previous step.

Bash

cp .env.example .env.local
Your .env.local file should look like this:

Bash

# URL of your running backend server
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# --- Auth0 Credentials ---

# Found in your Auth0 Application settings
NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id

# The "Identifier" from your Auth0 API settings
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.townsfolk.com
4. Installation & Launch
Clone the repository:

Bash

git clone https://github.com/your-username/townsfolk-frontend.git
cd townsfolk-frontend
Install dependencies:

Bash

pnpm install
Run the development server:

Bash

pnpm dev
Open http://localhost:3000 in your browser to see the running application.

🖼️ Application Snapshots
The clean, simple form for submitting a new idea for analysis.

Viewing detailed feedback from multiple AI-generated personas.

🔗 API Integration
This frontend is designed to work with the Townsfolk Backend. The backend is a separate Node.js/Express server that handles:

Secure idea submission and management.

Managing the real-time status of feedback generation.

Interfacing with the AI models to generate persona feedback.

Serving the final feedback results to the client.

➡️ Find the required backend repository here: Townsfolk Backend
