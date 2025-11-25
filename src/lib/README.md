# Library Directory

This directory contains third-party integrations and utility libraries.

## Examples

- Custom wrappers around popular libraries
- Integration code for external services
- Utility functions that wrap third-party APIs

## Guidelines

- Keep the main codebase decoupled from third-party dependencies
- Create wrapper functions/classes to abstract external libraries
- This makes it easier to swap implementations if needed

## Example

```typescript
// lib/analytics/index.ts
import { Analytics } from "some-analytics-lib";

export const initializeAnalytics = (token: string) => {
  Analytics.init(token);
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  Analytics.track(eventName, properties);
};
```
