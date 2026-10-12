# Crefto Website

A modern full-stack web application structure with React/Vite/TypeScript frontend and Node.js/Express/TypeScript backend.

## Project Structure

```
crefto-website/
│
├── frontend/             # Frontend application (React + Vite + TypeScript)
│   ├── public/
│   │   ├── images/
│   │   └── logo/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── Button/
│   │   │   ├── SectionTitle/
│   │   │   └── Loading/
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Services/
│   │   │   ├── Projects/
│   │   │   └── Contact/
│   │   ├── pages/
│   │   │   └── Home/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   ├── service.types.ts
│   │   │   ├── project.types.ts
│   │   │   └── contact.types.ts
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
│
├── backend/              # Backend application (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── models/
│   │   │   ├── Contact.ts
│   │   │   ├── Project.ts
│   │   │   └── Service.ts
│   │   ├── controllers/
│   │   │   ├── contact.controller.ts
│   │   │   ├── project.controller.ts
│   │   │   └── service.controller.ts
│   │   ├── services/
│   │   │   ├── contact.service.ts
│   │   │   ├── project.service.ts
│   │   │   └── service.service.ts
│   │   ├── repositories/
│   │   │   ├── contact.repository.ts
│   │   │   ├── project.repository.ts
│   │   │   └── service.repository.ts
│   │   ├── routes/
│   │   │   ├── contact.routes.ts
│   │   │   ├── project.routes.ts
│   │   │   └── service.routes.ts
│   │   ├── middlewares/
│   │   │   ├── error.middleware.ts
│   │   │   └── auth.middleware.ts
│   │   ├── utils/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn or pnpm

### Installation

```bash
# Install root dependencies
npm install

# Run frontend
cd frontend
npm install
npm run dev

# Run backend
cd ../backend
npm install
npm run dev
```
