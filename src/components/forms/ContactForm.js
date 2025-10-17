import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CustomInput from '../common/CustomInput';
import { validateContact } from '../../data/contactsData';
import { GlobalStyles, Colors } from '../../styles/globalStyles';

const ContactForm = ({ onSubmit, initialData = {}, buttonLabel = 'Save' }) => {
  const [contact, setContact] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    company: initialData.company || '',
    notes: initialData.notes || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = () => {
    const { isValid, errors } = validateContact(contact);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    onSubmit(contact);
  };

  return (
    <View>
      <CustomInput label="First Name" value={contact.firstName} onChangeText={(v) => handleChange('firstName', v)} error={errors.firstName} />
      <CustomInput label="Last Name" value={contact.lastName} onChangeText={(v) => handleChange('lastName', v)} error={errors.lastName} />
      <CustomInput label="Email" value={contact.email} onChangeText={(v) => handleChange('email', v)} error={errors.email} keyboardType="email-address" />
      <CustomInput label="Phone" value={contact.phone} onChangeText={(v) => handleChange('phone', v)} error={errors.phone} keyboardType="phone-pad" />
      <CustomInput label="Company" value={contact.company} onChangeText={(v) => handleChange('company', v)} />
      <CustomInput label="Notes" value={contact.notes} onChangeText={(v) => handleChange('notes', v)} multiline numberOfLines={3} />
      <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}>
        <Text style={GlobalStyles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactForm;
