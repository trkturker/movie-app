import { useState } from 'react';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Stack } from 'expo-router';

export default function Layout() {

  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
