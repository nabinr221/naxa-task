/\*\*

- Project Documentation
- project structure for Naxa task
  \*/

# Folder Structure Documentation

## Overview

This is a React + TypeScript application with a well-organized folder structure.

## Directory Structure

```
src/
├── api/                    # API clients and HTTP configuration
│   ├── axios-instance.ts  # Centralized HTTP client with interceptors
│   └── index.ts           # Exports
│
├── components/
|   ├──UI             # Reusable UI components
│       ├── Button/
│       ├── Modal/│
├── pages/                  # Route-level/page components
│   ├── HomePage/
│   ├── LoginPage/
│   ├── DashboardPage/
│   └── README.md          # Page guidelines
│
├── hooks/                  # Custom React hooks
│   ├── useAsync.ts        # Async state management
│   └── index.ts           # Exports
│
├── contexts/               # React Context providers for global state
│   ├── AuthContext/
│   ├── ThemeContext/
│   └── README.md          # Context guidelines
│
├── services/               # Business logic and data services
│   ├── auth.service.ts    # Authentication service
│   ├── user.service.ts    # User-related services
│   └── index.ts           # Exports
│
├── utils/                  # Utility functions
│   ├── logger.ts          # Logging utility
│   ├── error-handler.ts   # Error handling
│   ├── validators.ts      # Validation functions
│   └── index.ts           # Exports
│
├── types/                  # TypeScript type definitions
│   └── index.ts           # Centralized types
│
├── constants/              # Application constants
│   └── index.ts           # Routes, API config, messages, etc.
│
├── config/                 # Configuration files
│   ├── environment.ts     # Environment variables
│   └── index.ts           # Exports
│
├── styles/                 # Global styles
│   ├── globals.css        # Global CSS with Tailwind
│   └── README.md
│
├── lib/                    # Third-party library integrations
│   ├── analytics.ts       # Analytics integration
│   └── README.md          # Library guidelines
│
├── App.tsx                # Main App component
├── main.tsx               # Entry point
└── index.css              # Entry CSS

```

## Key Principles

### 1. **Separation of Concerns**

- Components are purely presentational
- Services contain business logic
- Utils provide helper functions
- Types are centralized

### 2. **Scalability**

- Easy to add new features without cluttering existing code
- Clear boundaries between layers
- Reusable components and services

### 3. **Maintainability**

- Consistent folder structure
- Clear naming conventions
- Centralized configuration
- Well-documented code

### 4. **Type Safety**

- Strict TypeScript configuration
- Centralized type definitions
- Type-only imports where appropriate

### 5. **Error Handling**

- Centralized error handler
- Custom error classes
- Consistent error messages

## Development Guidelines

### Creating a New Feature

1. **Create types** in `src/types/`
2. **Create service layer** in `src/services/` (if needed)
3. **Create components** in `src/components/`
4. **Create page** in `src/pages/` (if route-level)
5. **Add constants** to `src/constants/`
6. **Create custom hooks** in `src/hooks/` (if reusable)
7. **Add to contexts** in `src/contexts/` (if global state needed)

### Naming Conventions

- **Components**: PascalCase (Button.tsx, UserProfile.tsx)
- **Services**: camelCase with .service suffix (auth.service.ts)
- **Hooks**: camelCase with use prefix (useAsync.ts, useAuth.ts)
- **Utils**: camelCase with descriptive name (validators.ts, logger.ts)
- **Constants**: UPPER_SNAKE_CASE (API_CONFIG, HTTP_STATUS)
- **Types**: PascalCase (User, AuthState)

### Import Paths

Use path aliases for cleaner imports:

```typescript
// ✅ Good
import { logger } from "@utils/logger";
import { Button } from "@components/Button";
import type { User } from "@types";

// ❌ Avoid
import { logger } from "../../../utils/logger";
```

## Best Practices

### Code Organization

- Keep components small and focused (< 200 lines)
- One component per file
- Use composition over inheritance
- Separate styling from logic

### Performance

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize re-renders with hooks
- Avoid inline function definitions

### Error Handling

- Use custom error classes
- Implement global error boundary
- Log errors with context
- Provide user-friendly error messages

### Testing

- Test components in isolation
- Mock external dependencies
- Aim for >80% coverage
- Use descriptive test names

## Configuration Files

### Environment Variables

- Copy `.env.template` to `.env.local`
- Never commit `.env.local`
- Use VITE\_ prefix for Vite variables

### TypeScript

- Use strict mode enabled
- Enable type checking in IDE
- Use path aliases for cleaner imports

### ESLint

- Enforce code quality rules
- Catch common mistakes
- Run before commits

## Running the Application

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Preview
pnpm preview
```

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Architecture Notes

This structure supports:

- ✅ Large teams with clear responsibilities
- ✅ Easy onboarding of new developers
- ✅ Scalable to thousands of components
- ✅ Clear separation of concerns
- ✅ Enterprise-level code quality
- ✅ Comprehensive error handling
- ✅ Consistent coding standards
