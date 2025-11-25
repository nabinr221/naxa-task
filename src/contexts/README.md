# Contexts Directory

This directory contains React Context providers for global state management.

## Purpose

Use contexts for:

- Authentication state
- Theme/UI preferences
- Localization/i18n
- User preferences
- Application-wide notifications

**Don't use contexts for**:

- Frequently changing state (performance issues)
- Complex state logic (use Redux/Zustand instead)

## Structure

Each context should include:

```
AuthContext/
├── AuthContext.tsx        # Context definition
├── AuthProvider.tsx       # Provider component
├── useAuth.ts            # Custom hook
└── index.ts              # Exports
```

## Example

```typescript
// AuthContext/AuthContext.tsx
import { createContext } from 'react';
import { AuthState } from '../../types';

export const AuthContext = createContext<AuthState | undefined>(undefined);

// AuthContext/AuthProvider.tsx
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({...});

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```
