# Heinapp Frontend Service

A modern, full-featured web application for the Heina housing cooperative community, built with Next.js 16, TypeScript, and Tailwind CSS.

## 🌟 Features

### 📅 **Community Calendar**
- Interactive calendar view with event management (FullCalendar)
- Create, edit, and delete community events
- Role-based access control (members and admins)
- Multiple calendar views (month, week, day, list)
- Real-time event synchronization

### 🚴 **RADhaus - Workshop Booking System**
- Browse available workshop time slots
- Book and manage workshop sessions
- View your current bookings
- Cancel reservations
- Real-time slot availability

### 👤 **User Management**
- Secure authentication with NextAuth.js
- User registration and email activation
- Profile management (update name, email)
- Password reset functionality
- Account deletion option
- Role-based authorization (visitor, member, admin)

### 🏘️ **Community Sections**
- **Hero Section**: Welcome page with call-to-action
- **BikeHouse Section**: Information about the RADhaus bicycle workshop
- **Community Section**: Details about the housing cooperative
- **Sustainability Section**: Eco-friendly initiatives
- **Contact Section**: Integrated contact form

### 🎨 **Modern UI/UX**
- Responsive design for mobile, tablet, and desktop
- Dark theme optimized for readability
- Smooth animations with Framer Motion
- Accessible components with Radix UI
- shadcn/ui component library

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### **Styling**
- **Tailwind CSS 4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **Framer Motion** - Animation library

### **UI Components**
- **shadcn/ui** - Reusable component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### **Forms & Validation**
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **Authentication**
- **NextAuth.js** - Authentication solution
- JWT-based session management
- Backend API integration

### **Calendar**
- **FullCalendar** - Interactive calendar component
- Multiple view support (day, week, month, list)
- Event interaction and management

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **pnpm** - Package manager

## 📦 Installation

### Prerequisites

- Node.js 20+ 
- pnpm 10+

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heinapp-frontend-service
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this
   
   # Environment
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev:turbo        # Start development server with Turbopack

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm ts-lint          # Type-check in watch mode
pnpm ts:ci            # Type-check for CI/CD
```

## 🐳 Docker Deployment

The application is containerized and ready for production deployment.

### Build Docker Image

```bash
docker build -t heinapp-frontend:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Deployment Environments

The project includes automated deployment scripts for:

- **Staging**: `./deployment/deploy-staging.sh`
- **Production**: `./deployment/deploy-production.sh`

Both scripts:
- Build optimized Docker images
- Deploy containers with environment-specific configs
- Configure Caddy reverse proxy for HTTPS
- Enable automatic SSL certificates

See [deployment/DEPLOYMENT.md](deployment/DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
heinapp-frontend-service/
├── app/                      # Next.js App Router pages
│   ├── (auth)               # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── password-reset/
│   │   └── activate/
│   ├── calendar/            # Calendar feature
│   │   ├── components/
│   │   └── hooks/
│   ├── workshop/            # Workshop booking feature
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── profile/             # User profile management
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── calendar/
│   │   ├── contact/
│   │   └── workshop/
│   ├── components/          # Shared components
│   │   ├── sections/
│   │   ├── icons/
│   │   ├── navbar/
│   │   └── ui/
│   └── layout.tsx           # Root layout
├── components/ui/           # shadcn/ui components
├── lib/                     # Utility functions
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
├── deployment/              # Deployment scripts & configs
└── docker-compose.yml       # Docker Compose configuration
```

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.heina.org` |
| `NEXTAUTH_URL` | Frontend URL | `https://heina.org` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Random 32+ character string |
| `NODE_ENV` | Environment | `development` / `production` |

### Environment Files

- `.env.local` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## 🔒 Authentication Flow

1. User submits credentials via login form
2. NextAuth sends credentials to backend API
3. Backend validates and returns access token
4. Access token stored in encrypted JWT session
5. Subsequent API requests include access token
6. Sessions expire after ~24 hours

## 🌐 API Integration

The frontend communicates with a Django backend API:

- **Authentication**: `/api/auth/login/`, `/api/auth/register/`
- **Calendar**: `/api/calendar/events/`
- **Workshop**: `/api/workshop/slots/`, `/api/workshop/book/`
- **Profile**: `/api/profile/update/`, `/api/profile/delete/`
- **Contact**: `/api/contact/`

API requests are proxied through Next.js API routes for security.

## 🎨 Styling & Theme

- **Primary Colors**: Lime green (#84cc16), Green (#22c55e)
- **Background**: Zinc gray (#fafafa, #18181b)
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Dark Theme**: Optimized for low-light environments

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)

## 🧪 Code Quality

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for consistent formatting
- Strict mode enabled
- No unused variables policy

## 🚧 Development Guidelines

### Adding New Components

1. Place reusable UI components in `components/ui/`
2. Place feature-specific components in their respective feature folders
3. Use TypeScript for type safety
4. Follow existing naming conventions

### Styling Guidelines

- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS variables for theme values
- Avoid inline styles when possible

### API Route Guidelines

- Validate request bodies with Zod schemas
- Handle errors gracefully
- Return consistent response formats
- Include proper TypeScript types

