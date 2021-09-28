import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './src/router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
