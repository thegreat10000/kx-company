# KX Location - Premium Car Rental Platform

## Overview

KX Location is a premium car rental web application for Strasbourg, France. The platform showcases a fleet of luxury vehicles (Mercedes AMG models) with a modern, responsive design. Users can browse the car catalogue, view detailed vehicle specifications, and contact the business via WhatsApp or Snapchat for reservations.

## User Preferences

Preferred communication style: Simple, everyday language.
Do NOT proactively suggest publishing/deploying. The user will do it when they are ready.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Development**: Vite middleware for HMR during development
- **Production**: Static file serving with SPA fallback

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's pgTable
- **Validation**: Zod schemas generated via drizzle-zod
- **Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components (shadcn + custom)
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Route components
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API endpoint definitions
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Database schema and types
│   └── routes.ts     # API route definitions with Zod
└── migrations/       # Database migrations
```

### Design Decisions
- **Monorepo Structure**: Client, server, and shared code in single repository for type safety across stack
- **Type-Safe API**: Route definitions with Zod schemas ensure type consistency between frontend and backend
- **Component Library**: shadcn/ui provides accessible, customizable components without heavy dependencies
- **CSS Variables**: Theme colors defined as CSS variables enable easy theming and dark mode support
- **Storage Abstraction**: `IStorage` interface in storage.ts allows swapping storage implementations

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` Pool with Drizzle ORM wrapper

### Third-Party Services (Contact Methods)
- **WhatsApp**: Direct messaging via `wa.me` links
- **Snapchat**: User profile links for contact

### Key npm Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migration tooling
- `@tanstack/react-query`: Async state management
- `framer-motion`: Animation library
- `react-icons`: Social media icons (WhatsApp, Snapchat)
- `wouter`: Lightweight router
- `zod`: Schema validation
- Radix UI primitives: Accessible component foundations

### Fonts
- Google Fonts: Outfit (display), Plus Jakarta Sans (body)