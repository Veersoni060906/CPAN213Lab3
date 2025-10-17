import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import { Colors, GlobalStyles, Spacing, Fonts } from '../../styles/globalStyles';

const ContactListScreen = ({ navigation }) => {
  const { contacts, loading } = useContacts();

  if (loading) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      {item.favorite && (
        <Icon name="star" size={24} color={Colors.accent} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.md }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: Colors.text.secondary }}>
            No contacts yet. Add one!
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...GlobalStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  phone: {
    color: Colors.text.secondary,
    marginTop: 4,
  },
  email: {
    color: Colors.text.secondary,
    fontSize: Fonts.small,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ContactListScreen;
