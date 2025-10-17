import React from 'react';
import { View, Text } from 'react-native';
import ContactForm from '../../components/forms/ContactForm';
import { useContacts } from '../../utils/ContactContext';
import { GlobalStyles, Spacing } from '../../styles/globalStyles';

const AddContactScreen = ({ navigation, route }) => {
  const { addContact, updateContact } = useContacts();
  const contactToEdit = route.params?.contactToEdit;
  const isEditing = !!contactToEdit;

  const handleSubmit = async (data) => {
    if (isEditing) {
      await updateContact(contactToEdit.id, data);
    } else {
      await addContact(data);
    }
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, { padding: Spacing.lg }]}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {isEditing ? 'Edit Contact' : 'Add New Contact'}
      </Text>
      <ContactForm
        initialData={contactToEdit}
        onSubmit={handleSubmit}
        buttonLabel={isEditing ? 'Update Contact' : 'Save Contact'}
      />
    </View>
  );
};

export default AddContactScreen;
