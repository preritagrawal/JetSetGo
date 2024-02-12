import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import DatePickerButton from '../DatePickerButton';
import styles from './styles';

const FlightSearchDepartureArrival = ({flights, onFilterApply}) => {
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  const handleDepartureChange = (event, selectedDate) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setDepartureTime(selectedDate);
    }
  };

  const handleArrivalChange = (event, selectedDate) => {
    setShowArrivalPicker(false);
    if (selectedDate) {
      setArrivalTime(selectedDate);
    }
  };

  const handleSearch = () => {
    if (!departureTime || !arrivalTime) {
      Alert.alert('Error', 'Please enter both departure and arrival dates.');
      return;
    }
    const filtered = flights.filter(
      flight =>
        new Date(flight.displayData.source.depTime) >= departureTime &&
        new Date(flight.displayData.destination.arrTime) <= arrivalTime,
    );
    onFilterApply(filtered);
  };

  return (
    <View style={styles.container}>
      <DatePickerButton
        label="Departure"
        value={departureTime}
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
        value={arrivalTime}
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
