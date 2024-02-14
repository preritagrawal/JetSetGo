import React, {useMemo, useState} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FlightSearchDepartureArrival from '../DepArrDateFilter';
import FlightSorter from './FlightSorter';
import styles from './styles';

const FlightFilters = ({flights, onFilterApply}) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [selectedStop, setSelectedStop] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [departureDate, setDepartureTime] = useState(null);
  const [arrivalDate, setArrivalTime] = useState(null);

  const [fromOptions, toOptions, airlineOptions, stopOptions] = useMemo(() => {
    const fromOptions = flights
      .map(item => item.displayData.source.airport.cityName)
      .filter((value, index, self) => self.indexOf(value) === index);
    const toOptions = flights
      .map(item => item.displayData.destination.airport.cityName)
      .filter((value, index, self) => self.indexOf(value) === index);
    const airlineOptions = flights
      .flatMap(item => item.displayData.airlines.map(item => item.airlineName))
      .filter((value, index, self) => self.indexOf(value) === index);
    const stopOptions = flights
      .map(item => item.displayData.stopInfo)
      .filter((value, index, self) => self.indexOf(value) === index);
    return [fromOptions, toOptions, airlineOptions, stopOptions];
  }, [flights]);

  const applyFilter = () => {
    let filteredData = [...flights];
    if (selectedAirline) {
      filteredData = filteredData.filter(item =>
        item.displayData.airlines.some(
          airline => airline.airlineName === selectedAirline,
        ),
      );
    }
    if (from) {
      filteredData = filteredData.filter(
        flight => flight.displayData.source.airport.cityName === from,
      );
    }
    if (to) {
      filteredData = filteredData.filter(
        flight => flight.displayData.destination.airport.cityName === to,
      );
    }
    if (selectedStop) {
      filteredData = filteredData.filter(
        flight => flight.displayData.stopInfo === selectedStop,
      );
    }
    if (sortBy === 'price') {
      filteredData.sort((a, b) => a.fare - b.fare);
    }
    if(arrivalDate && departureDate){
      filteredData = filteredData.filter(
        flight =>
          new Date(flight.displayData.source.depTime) >= departureDate &&
          new Date(flight.displayData.destination.arrTime) <= arrivalDate,
      );
    }
    onFilterApply(filteredData);
  };


  const clearFilter = () => {
    setFrom(null);
    setTo(null);
    setSortBy(null);
    setSelectedAirline(null);
    setSelectedStop(null);
    onFilterApply(flights);
    onArrivalChange(null);
    onDepartureChange(null);
  };

  const handleSortChange = sortOption => {
    setSortBy(sortOption);
  };

  const renderCustomPicker = (
    selectedValue,
    onValueChange,
    options,
    label,
    isSmall,
  ) => {
    return (
      <View
        style={[
          {
            borderWidth: 1,
            height: 55,
            borderRadius: 8,
            borderColor: 'grey',
            marginBottom: 10,
          },
          isSmall && {width: 170},
        ]}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label={label} />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    );
  };

  const onArrivalChange=(data)=>{
    setArrivalTime(data)
  }

  const onDepartureChange=(data)=>{
    setDepartureTime(data);
  }

  return (
    <View
      style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {renderCustomPicker(from, setFrom, fromOptions, 'From', true)}
        {renderCustomPicker(to, setTo, toOptions, 'To', true)}
      </View>
      <FlightSearchDepartureArrival
        flights={flights}
        departureDate={departureDate}
        arrivalDate={arrivalDate}
        onArrivalChange={onArrivalChange}
        onDepartureChange={onDepartureChange}
        onFilterApply={onFilterApply}
      />
      {renderCustomPicker(
        selectedAirline,
        setSelectedAirline,
        airlineOptions,
        'Select Airlines',
      )}
      {renderCustomPicker(
        selectedStop,
        setSelectedStop,
        stopOptions,
        'Select Stops',
      )}
      <FlightSorter sortBy={sortBy} onSortChange={handleSortChange} />
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.applyButton}
          onPress={applyFilter}
          underlayColor="#0057a3">
          <Text style={styles.buttonText}>Search Flights</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.clearButton}
          onPress={clearFilter}
          underlayColor="#d83c3c">
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default FlightFilters;
