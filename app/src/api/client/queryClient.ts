import { QueryCache, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
    mutations: {
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
      },
    },
  },
});
