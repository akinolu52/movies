import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Movies } from './src/screens';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Movies />
        </QueryClientProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
