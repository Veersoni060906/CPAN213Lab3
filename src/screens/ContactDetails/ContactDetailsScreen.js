import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts, deleteContact, toggleFavorite } = useContacts();
  const contact = contacts.find((c) => c.id === contactId);

  if (!contact) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.centered]}>
        <Text>Contact not found.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Contact', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteContact(contact.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={[GlobalStyles.container, { padding: Spacing.lg }]}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {contact.firstName} {contact.lastName}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(contact.id)}>
          <Icon
            name={contact.favorite ? 'star' : 'star-border'}
            size={28}
            color={contact.favorite ? Colors.accent : Colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{contact.phone}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{contact.email}</Text>

        {contact.company ? (
          <>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{contact.company}</Text>
          </>
        ) : null}

        {contact.notes ? (
          <>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{contact.notes}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[GlobalStyles.button, { flex: 1, marginRight: 10 }]}
          onPress={() => navigation.navigate('AddContact', { contactToEdit: contact })}
        >
          <Text style={GlobalStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyles.button, { backgroundColor: Colors.accent, flex: 1 }]}
          onPress={handleDelete}
        >
          <Text style={GlobalStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  infoContainer: {
    marginTop: Spacing.lg,
  },
  label: {
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  value: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
  },
});

export default ContactDetailsScreen;
