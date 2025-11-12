import { useState } from 'react';
import '../global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {

  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#6b21a8',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}>
          <Stack.Screen
            name="index"
            options={{
              title: 'Film Listesi',
            }}
          />
          <Stack.Screen
            name="add"
            options={{
              title: 'Film Ekle',
            }}
          />
          <Stack.Screen
            name="movies/[id]/index"
            options={{
              title: 'Film Detayı',
            }}
          />
          <Stack.Screen
            name="movies/[id]/edit"
            options={{
              title: 'Filmi Düzenle',
            }}
          />
        </Stack>
    </QueryClientProvider>
  );
}
