# PinBoard - Pinterest Clone

## Overview
A Pinterest-style image sharing application where users can share and browse images in a beautiful masonry grid layout.

## Features
- **GitHub Authentication**: Login with GitHub via Replit Auth (supports Google, GitHub, X, Apple, email)
- **Image Pinning**: Authenticated users can add images by URL
- **Image Deletion**: Users can delete their own images
- **Masonry Grid**: Pinterest-style responsive image layout using Masonry.js
- **User Walls**: Browse other users' image collections
- **Broken Image Handling**: Automatically shows placeholder for broken images

## Tech Stack
- **Backend**: Express 5 with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Frontend**: Vanilla JavaScript with Masonry.js

## Project Structure
```
/
├── server/
│   ├── index.ts      # Express server entry point
│   ├── auth.ts       # Authentication middleware and routes
│   ├── routes.ts     # API routes for images
│   └── db.ts         # Database connection
├── shared/
│   └── schema.ts     # Drizzle database schema
├── public/
│   └── index.html    # Frontend application
├── package.json
├── tsconfig.json
└── drizzle.config.ts
```

## API Endpoints
- `GET /api/auth/user` - Get current authenticated user
- `GET /api/login` - Start login flow
- `GET /api/logout` - Logout user
- `GET /api/images` - Get all images
- `GET /api/images/user/:userId` - Get user's images
- `GET /api/my-images` - Get authenticated user's images (protected)
- `POST /api/images` - Add new image (protected)
- `DELETE /api/images/:id` - Delete image (protected)

## Database Schema
- **users**: id, email, firstName, lastName, profileImageUrl, createdAt
- **sessions**: sid, sess, expire
- **images**: id, userId, url, title, createdAt

## Development
- Run `npm run dev` to start development server on port 5000
- Run `npm run db:push` to sync database schema
