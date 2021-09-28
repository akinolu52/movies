import { ROUTES } from '../utils';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Movies from '../screens/Movies';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name={ROUTES.MOVIES} component={Movies} />
        <Stack.Screen name={ROUTES.MOVIE_DETAILS} component={Details} />
    </Stack.Navigator>
);

export default AppNavigator;
