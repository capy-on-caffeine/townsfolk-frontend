# Townsfolk Frontend

A Next.js application for getting AI-generated persona feedback on startup ideas.

## Features

- Next.js 16.0+ with App Router
- Tailwind CSS v4 for styling
- Auth0 integration for authentication
- Dynamic idea submission and feedback viewing
- Real-time status updates for AI feedback generation

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm, npm, or yarn

### Environment Variables

Copy `.env.local` and fill in your Auth0 credentials:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH0_AUDIENCE=https://api.townsfolk.com
```

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Auth0 Configuration

1. Create a new Auth0 application (Single Page Application)
2. Set up the following:
   - Allowed Callback URLs: `http://localhost:3000`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
3. Copy your Auth0 domain and client ID to `.env.local`
4. Set up an API in Auth0 and copy the audience URL to `.env.local`

## Features

- **Landing Page**: Clean, dark theme with red accents introducing the product
- **Dashboard**: View and manage your submitted ideas
- **New Idea Form**: Submit ideas with title, description, target audience, and optional MVP link
- **Idea Details**: View detailed AI-generated feedback from multiple personas

## API Integration

The frontend integrates with a Node.js/Express backend (see townsfolk-backend repository) providing:

- Idea submission and management
- Real-time status updates for feedback generation
- Secure authentication via Auth0
- Feedback generation with multiple AI personas

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Auth0 React SDK](https://auth0.com/docs/libraries/auth0-react)
