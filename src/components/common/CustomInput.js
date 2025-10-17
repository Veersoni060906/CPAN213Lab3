import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';

const CustomInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      secureTextEntry = false,
      multiline = false,
      numberOfLines = 1,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secureTextEntry);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: focused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [focused, value]);

    const labelStyle = {
      position: 'absolute',
      left: leftIcon ? 40 : 12,
      top: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [22, 6],
      }),
      fontSize: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Fonts.medium, Fonts.small],
      }),
      color: focused ? Colors.primary : Colors.text.secondary,
    };

    return (
      <View style={{ marginBottom: Spacing.md }}>
        <View
          style={[
            GlobalStyles.input,
            focused && GlobalStyles.inputFocused,
            error && GlobalStyles.inputError,
            { flexDirection: 'row', alignItems: 'center' },
          ]}>
          {leftIcon && (
            <Icon name={leftIcon} size={20} color={Colors.text.secondary} style={{ marginRight: 8 }} />
          )}
          <View style={{ flex: 1 }}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              secureTextEntry={secureTextEntry && !showPassword}
              multiline={multiline}
              numberOfLines={numberOfLines}
              style={{ fontSize: Fonts.medium, color: Colors.text.primary, paddingTop: 18 }}
              {...props}
            />
          </View>
          {secureTextEntry && (
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={Colors.text.secondary}
              />
            </TouchableOpacity>
          )}
          {rightIcon && !secureTextEntry && (
            <TouchableOpacity onPress={onRightIconPress}>
              <Icon name={rightIcon} size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
        {error ? <Text style={GlobalStyles.errorText}>{error}</Text> : null}
      </View>
    );
  }
);

export default CustomInput;
