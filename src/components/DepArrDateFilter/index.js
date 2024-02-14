import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import DatePickerButton from '../DatePickerButton';
import styles from './styles';

const FlightSearchDepartureArrival = ({flights, onFilterApply,departureDate,arrivalDate,onDepartureChange,onArrivalChange}) => {
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  const handleDepartureChange = (event, selectedDate) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      onDepartureChange(selectedDate);
    }
  };

  const handleArrivalChange = (event, selectedDate) => {
    setShowArrivalPicker(false);
    if (selectedDate) {
      onArrivalChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <DatePickerButton
        label="Departure"
        value={departureDate}
        onChange={handleDepartureChange}
        showPicker={showDeparturePicker}
        setShowPicker={setShowDeparturePicker}
        buttonStyle={{
          backgroundColor: '#FFA500',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      <DatePickerButton
        label="Arrival"
        value={arrivalDate}
        onChange={handleArrivalChange}
        showPicker={showArrivalPicker}
        setShowPicker={setShowArrivalPicker}
        buttonStyle={{
          backgroundColor: '#4CAF50',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
    </View>
  );
};


export default FlightSearchDepartureArrival;
