import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';


const DatePickerButton = ({ label, value, onChange, showPicker, setShowPicker,buttonStyle }) => {
  return (
    <>
      <TouchableHighlight
        style={buttonStyle}
        onPress={() => setShowPicker(true)}
        underlayColor="#DDDDDD">
        <View style={styles.datePickerContainer}>
        <Text style={styles.buttonText}>
            {value ? value.toLocaleDateString() : 'Select'}
          </Text>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </TouchableHighlight>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default DatePickerButton;
