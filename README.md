# 🚀 Naxa Task -React Application

React + TypeScript + Vite application built with a scalable folder structure.

## 📋 Project Summary

This is a **React application** designed to serve as a foundation for large-scale projects. It includes:

- ✅ **Folder Structure** - Organized
- ✅ **Type Safety** - Strict TypeScript with no implicit `any`
- ✅ **Error Handling** - Centralized error management system
- ✅ **Logging System** - Structured logging utility
- ✅ **HTTP Client** - Centralized API client with interceptors
- ✅ **Reusable Components** - Button, Card with full documentation
- ✅ **Routing** - React Router with lazy loading
- ✅ **Form Validation** - Built-in validators
- ✅ **Configuration Management** - Environment-based config
- ✅ **Comprehensive Documentation** - 7 detailed guides

## 🎯 What's Included

### Architecture

- **api/** - HTTP client with interceptors
- **components/** - Reusable UI components (Button, Card)
- **pages/** - Route components (Home, Login)
- **services/** - Business logic (AuthService)
- **hooks/** - Custom React hooks (useAsync)
- **utils/** - Utility functions (logger, validators, error-handler)
- **types/** - Centralized TypeScript definitions
- **constants/** - Application constants
- **config/** - Environment configuration
- **contexts/** - React Context providers
- **styles/** - Global styles

### Documentation

- **START_HERE.md** - Quick overview
- **GETTING_STARTED.md** - Setup and basic concepts
- **ARCHITECTURE.md** - Architecture principles
- **DEVELOPMENT_GUIDELINES.md** - Coding standards
- **PROJECT_STRUCTURE.md** - Detailed file breakdown
- **QUICK_REFERENCE.md** - Copy-paste patterns
- **IMPLEMENTATION_SUMMARY.md** - What was built

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- pnpm (or npm/yarn)

### Installation & Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# Visit: http://localhost:5173
```

## 📦 Available Commands

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
```

## 🎓 How to Use This Project

### 1. **First Time Setup**

```bash
pnpm install
pnpm dev
```

Then visit `http://localhost:5174` to see the working app.

### 2. **Understand the Structure**

- Read `START_HERE.md` for an overview
- Read `ARCHITECTURE.md` to understand the structure
- Look at `src/components/Button/` for component patterns

### 3. **Learn the Patterns**

```typescript
// Component Pattern
import React from "react";
interface Props {
  label: string;
}
export const MyComponent: React.FC<Props> = ({ label }) => <div>{label}</div>;

// Service Pattern
import { httpClient } from "@api";
export class MyService {
  static async getItems() {
    return httpClient.get("/items");
  }
}

// Hook Pattern
export const useMyHook = () => {
  // Custom hook logic
};
```

### 4. **Create New Features**

Follow the established patterns:

1. Define types in `src/types/index.ts`
2. Create service in `src/services/myfeature.service.ts`
3. Create components in `src/components/MyFeature/`
4. Add pages to `src/pages/`

### 5. **Use Clean Imports**

```typescript
// ✅ Good - Use path aliases
import { Button } from "@components";
import { AuthService } from "@services";
import { logger } from "@utils";

// ❌ Avoid - Relative imports
import { Button } from "../../../components/Button";
```

## 🔧 Configuration

### Environment Variables

Copy `.env.template` to `.env.local` and configure:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_LOG_LEVEL=info
```

### TypeScript

- Strict mode is enabled
- Type-only imports are enforced
- No implicit `any` allowed

### ESLint

Enforces code quality with:

- TypeScript-aware rules
- React best practices
- Clean code patterns

## 📚 Key Features

### Type Safety

- Strict TypeScript configuration
- Type-only imports where needed
- Centralized type definitions

### Error Handling

```typescript
import { ErrorHandler } from "@utils";

try {
  const data = await MyService.fetchData();
} catch (error) {
  const appError = ErrorHandler.handle(error);
  console.error(appError.message);
}
```

### Logging

```typescript
import { logger } from "@utils";

logger.debug("Debug message", { data });
logger.info("Info message");
logger.warn("Warning message");
logger.error("Error message", error);
```

### Validation

```typescript
import { Validators } from "@utils";

if (!Validators.isValidEmail(email)) {
  // Show error
}
```

### HTTP Client

```typescript
import { httpClient } from "@api";

const response = await httpClient.get("/api/users");
const result = await httpClient.post("/api/data", {
  /* data */
});
```

## 📖 Documentation

| Document                  | Purpose                             |
| ------------------------- | ----------------------------------- |
| START_HERE.md             | Entry point - read this first       |
| GETTING_STARTED.md        | Quick setup and overview            |
| ARCHITECTURE.md           | Architecture and principles         |
| DEVELOPMENT_GUIDELINES.md | Coding standards and best practices |
| PROJECT_STRUCTURE.md      | Detailed file breakdown             |
| QUICK_REFERENCE.md        | Copy-paste code patterns            |
| IMPLEMENTATION_SUMMARY.md | Complete implementation details     |

## 💡 Best Practices Implemented

- ✅ Separation of Concerns
- ✅ Type Safety (No implicit `any`)
- ✅ Error Handling & Logging
- ✅ Centralized Configuration
- ✅ Reusable Components
- ✅ SOLID Principles
- ✅ Performance Optimization
- ✅ Security Focused

## 🚀 Deployment

```bash
# Build for production
pnpm build

# Output will be in dist/
# Deploy the dist/ folder to your hosting

# Production environment variables
VITE_API_URL=https://api.production.com
VITE_LOG_LEVEL=warn
```

## 📞 Support & Help

1. **Quick Questions?** → Check `QUICK_REFERENCE.md`
2. **How to structure code?** → See `DEVELOPMENT_GUIDELINES.md`
3. **Code examples?** → Look at `src/components/Button/` or `src/services/auth.service.ts`
4. **Architecture questions?** → Read `ARCHITECTURE.md`
