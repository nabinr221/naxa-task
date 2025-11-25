/**
 * Custom hook for managing async operations
 * Handles loading, success, and error states
 */

import { useState, useCallback, useEffect } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type AsyncFunction<T> = () => Promise<T>;

export const useAsync = <T>(
  asyncFunction: AsyncFunction<T>,
  immediate = true
): AsyncState<T> & { execute: () => Promise<T> } => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async (): Promise<T> => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (!immediate) return;

    let mounted = true;

    const executeAsync = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await asyncFunction();
        if (mounted) {
          setState({ data: response, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          const err = error instanceof Error ? error : new Error(String(error));
          setState({ data: null, loading: false, error: err });
        }
      }
    };

    executeAsync();

    return () => {
      mounted = false;
    };
  }, [asyncFunction, immediate]);

  return { ...state, execute };
};
