import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactProvider } from './src/utils/ContactContext';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import { Colors } from './src/styles/globalStyles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Contacts" component={ContactListScreen} />
          <Stack.Screen
            name="ContactDetails"
            component={ContactDetailsScreen}
            options={{ title: 'Contact Details' }}
          />
          <Stack.Screen
            name="AddContact"
            component={AddContactScreen}
            options={{ title: 'Add Contact' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}
