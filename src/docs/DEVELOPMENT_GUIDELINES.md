# Development Guidelines

## Table of Contents

1. [Code Style](#code-style)
2. [Component Development](#component-development)
3. [Service Layer](#service-layer)
4. [State Management](#state-management)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Performance](#performance)
8. [Security](#security)

## Code Style

### General Rules

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons at the end of statements
- Use arrow functions for callbacks
- Use const by default, let when needed, avoid var

### TypeScript Rules

- Always define explicit return types for functions
- Use interfaces for object shapes
- Use `type` for union types and primitives
- Use `interface` for objects and classes
- Avoid `any` - use `unknown` instead if necessary

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name: string;
}

function getUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

// ❌ Avoid
function getUser(id) {
  return fetch(`/api/users/${id}`).then((res) => res.json());
}
```

### Naming Conventions

- **Variables/Constants**: camelCase for values, UPPER_SNAKE_CASE for constants
- **Functions**: camelCase (describe what it does)
- **Classes**: PascalCase
- **Interfaces/Types**: PascalCase
- **Files**: Match export name (Button.tsx for Button component)
- **Private members**: prefix with underscore (\_privateMethod)

```typescript
// ✅ Good naming
const maxRetries = 3;
const API_BASE_URL = "https://api.example.com";
interface UserProfile {
  /* ... */
}
class AuthService {
  /* ... */
}
function calculateTotalPrice() {
  /* ... */
}
const _internalHelper = () => {};

// ❌ Avoid
const max_retries = 3;
const apiBaseUrl = "https://api.example.com";
interface userProfile {
  /* ... */
}
class authService {
  /* ... */
}
function calcTotalPrice() {
  /* ... */
}
```

## Component Development

### Component Structure

```typescript
// 1. Imports
import React, { useState } from "react";
import { useCustomHook } from "@hooks";
import { utility } from "@utils";
import type { Props } from "./Component.types";

// 2. Type definitions (if complex)
interface ComponentState {
  // state shape
}

// 3. Component implementation
export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks first
  const [state, setState] = useState();
  const custom = useCustomHook();

  // Event handlers
  const handleClick = () => {
    // handler logic
  };

  // JSX
  return <div>{/* JSX */}</div>;
};

// 4. Display name for debugging
Component.displayName = "Component";

// 5. Export
export default Component;
```

### Component Best Practices

- Keep components focused and small (<200 lines)
- Use composition instead of inheritance
- Lift state up when needed
- Use React.memo for expensive components
- Implement proper error boundaries
- Use proper TypeScript types for props

```typescript
// ✅ Good - Small, focused component
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
}) => {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
};

// ❌ Avoid - Too many responsibilities
const MegaComponent = () => {
  // 500+ lines of code
  // Multiple responsibilities
  // Complex state management
};
```

### Props Design

- Use object destructuring
- Provide default values
- Use specific types, not `any`
- Document complex props with JSDoc

```typescript
interface FormProps {
  /** Form submission handler */
  onSubmit: (data: FormData) => Promise<void>;
  /** Loading state */
  isLoading?: boolean;
  /** Available countries for selection */
  countries?: Country[];
  /** Form validation schema */
  validationSchema: ValidationSchema;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  isLoading = false,
  countries = [],
  validationSchema,
}) => {
  // Component implementation
};
```

## Service Layer

### Service Pattern

Services encapsulate business logic and API calls:

```typescript
/**
 * UserService
 * Handles all user-related operations and API calls
 */
export class UserService {
  private static readonly ENDPOINT = "/users";

  /**
   * Fetch all users
   */
  static async getUsers(page = 1): Promise<User[]> {
    try {
      const response = await httpClient.get(`${this.ENDPOINT}?page=${page}`);
      return response.data;
    } catch (error) {
      logger.error("Failed to fetch users", error);
      throw error;
    }
  }

  /**
   * Fetch single user by ID
   */
  static async getUser(id: string): Promise<User> {
    return httpClient.get(`${this.ENDPOINT}/${id}`);
  }

  /**
   * Create new user
   */
  static async createUser(user: UserInput): Promise<User> {
    return httpClient.post(this.ENDPOINT, user);
  }

  /**
   * Update user
   */
  static async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return httpClient.put(`${this.ENDPOINT}/${id}`, updates);
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<void> {
    return httpClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
```

### Service Usage in Components

```typescript
export const UserList: React.FC = () => {
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
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

## State Management

### Local State vs Global State

- **Local State**: useState for component-specific state
- **Global State**: useContext for app-wide state (auth, theme, etc.)
- **Complex State**: Consider Redux for large apps

```typescript
// ✅ Local state - doesn't need to be global
export const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  // ...
};

// ✅ Global state - shared across app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({...});
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Error Handling

### Error Handling Pattern

```typescript
// 1. In services
export class DataService {
  static async fetchData(): Promise<Data[]> {
    try {
      const response = await httpClient.get("/data");
      return response.data;
    } catch (error) {
      logger.error("Data fetch failed", error);
      throw ErrorHandler.handle(error);
    }
  }
}

// 2. In components
export const DataComponent: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      const data = await DataService.fetchData();
      // process data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  if (error) return <ErrorBoundary error={error} />;
};
```

### Custom Error Class

```typescript
export class ApplicationError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}
```

## Testing

### Component Testing

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@components/Button";

describe("Button Component", () => {
  it("renders button with label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Service Testing

```typescript
describe("UserService", () => {
  it("fetches users successfully", async () => {
    const users = await UserService.getUsers();
    expect(users).toHaveLength(greaterThan(0));
    expect(users[0]).toHaveProperty("id");
  });
});
```

## Performance

### Performance Best Practices

1. **Lazy Load Components**

   ```typescript
   const HeavyComponent = React.lazy(() => import("./HeavyComponent"));
   ```

2. **Memoize Expensive Components**

   ```typescript
   export const ExpensiveComponent = React.memo(({ data }: Props) => {
     return <div>{/* complex render */}</div>;
   });
   ```

3. **Use useCallback for Event Handlers**

   ```typescript
   const handleSubmit = useCallback(() => {
     // handler logic
   }, [dependencies]);
   ```

4. **Optimize Re-renders**
   ```typescript
   // Use key prop correctly
   {
     items.map((item) => <Item key={item.id} item={item} />);
   }
   ```

## Security

### Security Best Practices

1. **Sanitize User Input**

   ```typescript
   import DOMPurify from "dompurify";
   const clean = DOMPurify.sanitize(userInput);
   ```

2. **Store Sensitive Data Securely**

   ```typescript
   // Use httpOnly cookies or secure storage
   localStorage.setItem("non-sensitive", value);
   // Never store tokens in localStorage (use httpOnly cookies)
   ```

3. **Validate on Frontend and Backend**

   ```typescript
   if (!Validators.isValidEmail(email)) {
     // Show error
   }
   // Always validate on server too
   ```

4. **Use HTTPS in Production**

   ```typescript
   const apiUrl = import.meta.env.PROD
     ? "https://api.example.com"
     : "http://localhost:3000";
   ```

5. **CORS Configuration**
   - Configure CORS headers properly on server
   - Only allow trusted origins

---

## Quick Reference

### File Structure for New Feature

```
src/
├── types/
│   └── index.ts          # Add new types
├── constants/
│   └── index.ts          # Add feature constants
├── services/
│   └── feature.service.ts # Business logic
├── hooks/
│   └── useFeature.ts     # Custom hooks
├── components/
│   └── Feature/
│       ├── Feature.tsx   # Component
│       ├── index.ts      # Export
│       └── Feature.test.tsx # Tests
└── pages/
    └── FeaturePage/
        └── FeaturePage.tsx
```

### Common Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Preview
pnpm preview

# Run tests (when configured)
pnpm test
```
