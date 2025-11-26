# Project Structure Summary - Enterprise Grade Production Application

## Overview

This project has been restructured as a **senior-level, production-grade React + TypeScript application** following enterprise best practices. The folder structure is designed to scale to thousands of components and support large teams.

## 📁 Complete Project Structure

```
naxa-task/
├── src/
│   ├── api/                           # HTTP client and API configuration
│   │   ├── axios-instance.ts          # Centralized HTTP client with interceptors
│   │   └── index.ts                   # Exports
│   │
│   ├── components/                    # Reusable UI components
│   │     ├──UI
          |  ├──  Button/
│   │     | ├── Button.tsx             # Button component with variants
│   │     | └── index.ts
│   │     ├── Card/
│   │     │   ├── Card.tsx               # Card container component
│   │     │   └── index.ts
│   │     ├── README.md                  # Component development guidelines
│   │   
│   │
│   ├── pages/                         # Route-level page components
│   │   ├── HomePage.tsx               # Home page with features showcase
│   │  
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAsync.ts                # Async state management hook
│   │   └── index.ts                   # Exports
│   │
│   ├── contexts/                      # React Context providers
│   │   └── README.md                  # Context guidelines
│   │
│   ├── services/                      # Business logic & data services
│   │   ├── auth.service.ts            # Authentication service
│   │   └── index.ts                   # Exports
│   │
│   ├── utils/                         # Utility functions
│   │   ├── logger.ts                  # Centralized logging utility
│   │   ├── error-handler.ts           # Error handling utility
│   │   ├── validators.ts              # Validation functions
│   │   └── index.ts                   # Exports
│   │
│   ├── types/                         # TypeScript type definitions
│   │   └── index.ts                   # Centralized types & interfaces
│   │
│   ├── constants/                     # Application constants
│   │   └── index.ts                   # Routes, API config, messages, etc.
│   │
│   ├── config/                        # Configuration files
│   │   ├── environment.ts             # Environment variables
│   │   └── index.ts                   # Exports
│   │
│   ├── styles/                        # Global styles
│   │   ├── globals.css                # Global Tailwind + custom CSS
│   │   └── README.md
│   │
│   ├── lib/                           # Third-party integrations
│   │   └── README.md                  # Library guidelines
│   │
│   ├── App.tsx                        # Main App component with routing
│   ├── main.tsx                       # React entry point
│   └── index.css                      # Entry styles
│
├── public/                            # Static assets
├── .env.template                      # Environment variables template
├── ARCHITECTURE.md                    # Architecture documentation
├── DEVELOPMENT_GUIDELINES.md          # Development best practices
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.app.json                  # TypeScript app config
├── tsconfig.node.json                 # TypeScript node config
├── tsconfig.enterprise.json           # Enhanced TypeScript config
├── vite.config.ts                     # Vite configuration
├── eslint.config.js                   # ESLint configuration
├── package.json                       # Dependencies
└── README.md                          # Project README
```

## 🎯 Key Features

### 1. **Separation of Concerns**

- **Components**: Pure presentational layer
- **Pages**: Route-level component orchestration
- **Services**: Business logic and API calls
- **Utils**: Helper functions
- **Types**: Centralized type definitions

### 2. **Type Safety**

- Strict TypeScript configuration
- Type-only imports where appropriate
- Centralized type definitions
- Complete type coverage

### 3. **Error Handling**

- Centralized error handler
- Custom error classes
- Consistent error logging
- User-friendly error messages

### 4. **Logging & Debugging**

- Structured logging utility
- Development vs production awareness
- Context-aware logging
- Stack trace capture

### 5. **Configuration Management**

- Environment-based configuration
- Feature flags
- Constants management
- Path aliases for clean imports

### 6. **API Integration**

- Centralized HTTP client
- Request/response interceptors
- Authentication token management
- Automatic token refresh

### 7. **Custom Hooks**

- `useAsync`: Handle async operations with state
- `useAuth`: Authentication state management
- Reusable logic patterns

### 8. **Validation**

- Centralized validators
- Email, password, URL validation
- Type guards
- Custom validation rules

## 🚀 Getting Started

### Installation

```bash
cd /media/nabin/Confidential\ Data/projects/interview\ task/naxa-task

# Install dependencies
pnpm install

# Copy environment template
cp .env.template .env.local

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm lint      # Run ESLint
pnpm preview   # Preview production build
```

## 📚 Documentation Files

### 1. **ARCHITECTURE.md**

Comprehensive architecture documentation including:

- Directory structure explanation
- Key principles and patterns
- Development guidelines
- Best practices
- Configuration files overview

### 2. **DEVELOPMENT_GUIDELINES.md**

Detailed development guidelines:

- Code style and naming conventions
- Component development patterns
- Service layer design
- State management
- Error handling strategies
- Testing approaches
- Performance optimization
- Security best practices

## 💡 Code Examples

### Creating a Component

```typescript
// src/components/UserProfile/UserProfile.tsx
import React from "react";
import type { User } from "@types";

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};
```

### Creating a Service

```typescript
// src/services/user.service.ts
import { httpClient } from "@api";
import { logger } from "@utils";
import type { User } from "@types";

export class UserService {
  private static readonly ENDPOINT = "/users";

  static async getUsers(): Promise<User[]> {
    try {
      const response = await httpClient.get(this.ENDPOINT);
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch users", error as Error);
      throw error;
    }
  }
}
```

### Using a Service in a Component

```typescript
// src/pages/UsersPage.tsx
import React from "react";
import { useAsync } from "@hooks";
import { UserService } from "@services";
import { UserProfile } from "@components";

export const UsersPage: React.FC = () => {
  const {
    data: users,
    loading,
    error,
  } = useAsync(() => UserService.getUsers());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map((user) => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  );
};
```

## 🔧 Import Paths

The project uses path aliases for clean imports:

```typescript
// ✅ Clean imports using aliases
import { Button } from "@components";
import { AuthService } from "@services";
import { logger } from "@utils";
import type { User } from "@types";
import { API_CONFIG } from "@constants";
import { env } from "@config";

// ❌ Avoid relative imports
import { Button } from "../../../components/Button";
```

## 📦 Installed Dependencies

### Core

- `react@19.2.0` - UI library
- `react-dom@19.2.0` - DOM rendering
- `react-router@7.9.6` - Routing

### Styling

- `tailwindcss@4.1.17` - Utility-first CSS
- `@tailwindcss/vite@4.1.17` - Vite integration

### Dev Tools

- `typescript@5.9.3` - Type checking
- `vite@7.2.4` - Build tool
- `eslint@9.39.1` - Code linting
- `@vitejs/plugin-react@5.1.1` - React support

## 🎓 Best Practices Implemented

✅ **Component Architecture**

- Single Responsibility Principle
- Reusable component patterns
- Proper prop typing
- Composition over inheritance

✅ **TypeScript**

- Strict mode enabled
- Type-only imports
- No implicit any
- Explicit return types

✅ **Error Handling**

- Try-catch blocks
- Custom error classes
- Centralized error handling
- Error logging

✅ **Code Organization**

- Clear separation of concerns
- Consistent naming conventions
- Centralized configuration
- Proper barrel exports

✅ **Scalability**

- Easy to add features
- Large team support
- Thousands of components support
- Modular architecture

✅ **Maintainability**

- Clear folder structure
- Comprehensive documentation
- Self-documenting code
- Type safety

## 🚀 Next Steps

1. **Configure Environment Variables**

   ```bash
   cp .env.template .env.local
   # Edit .env.local with your API configuration
   ```

2. **Add More Services**

   - Create new service files in `src/services/`
   - Implement API calls using `httpClient`
   - Export through `src/services/index.ts`

3. **Create More Components**

   - Follow the structure in `src/components/Button/`
   - Create reusable components
   - Use Tailwind CSS for styling

4. **Implement Contexts**

   - Create context providers in `src/contexts/`
   - Use for global state management
   - Hook into components with custom hooks

5. **Add Tests**

   - Create `.test.tsx` files next to components
   - Test services and utilities
   - Aim for >80% coverage

6. **Deploy**
   - Run `pnpm build`
   - Deploy the `dist/` folder
   - Configure environment variables in production

## 📞 Support

For questions about the architecture or development guidelines, refer to:

- `ARCHITECTURE.md` - Architecture documentation
- `DEVELOPMENT_GUIDELINES.md` - Development best practices
- Individual `README.md` files in each directory

---

**Built with Senior-Level Best Practices** ✨

This structure supports enterprise-grade applications with:

- ✅ Clear responsibilities
- ✅ Type safety
- ✅ Error handling
- ✅ Scalability
- ✅ Maintainability
- ✅ Team collaboration
