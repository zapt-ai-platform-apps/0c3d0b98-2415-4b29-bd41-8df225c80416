# Multi-Party Platform

A comprehensive platform connecting clients, merchants, investors, transport stations, and service providers.

## Features

- Full authentication system with Supabase
- Role-based access control (RBAC)
- Personalized dashboards for each user type
- Responsive design for all devices
- Multi-language support (Arabic)
- Profile management

## User Types

1. **Client**: Regular users looking for products or services
2. **Merchant**: Business owners offering products
3. **Investor**: Users looking for investment opportunities
4. **Transport Station**: Transportation and logistics services
5. **Service Provider**: Specialized service providers

## Technologies Used

- React 18
- Tailwind CSS
- Supabase Auth
- CockroachDB
- Drizzle ORM
- React Router
- i18next
- Sentry for error tracking

## Project Structure

The project uses a modular architecture with clean separation of concerns:

```
src/
├── modules/           # Feature-based modules
│   ├── core/          # Core utilities and shared logic
│   ├── auth/          # Authentication module
│   ├── profile/       # User profile management
│   ├── dashboard/     # Dashboard components and layouts
│   ├── landing/       # Landing page components
│   └── common/        # Shared UI components
├── app/               # Application configuration
│   └── routes.jsx     # Routing configuration
├── assets/            # Static assets
├── supabaseClient.js  # Supabase client initialization
├── App.jsx            # Main App component
└── index.jsx          # Application entry point
```

## Development

To run the project locally:

```bash
npm install
npm run dev
```

## Deployment

This project is configured for deployment on Vercel.