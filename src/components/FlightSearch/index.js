import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, FlatList} from 'react-native';
import {fetchFlights} from '../../services/fetchFlights';
import FlightFilters from '../FlightFilter';
import styles from './styles';

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    setFilteredFlights(flights);
  }, [flights]);

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
  });

  const loadFlights = async () => {
    try {
      const flightData = await fetchFlights();
      setFlights(flightData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFilterApply=(flights)=>{
    setFilteredFlights(flights)
  }

  const FlightInfo = ({ label, value }) => {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoText}>{value}</Text>
      </View>
    );
  };

  const renderFlightItem = ({ item }) => {
    return (
      <View style={styles.flightItemContainer}>
        <FlightInfo label="Source" value={item.displayData.source.airport.airportName} />
        <FlightInfo label="Destination" value={item.displayData.destination.airport.airportName} />
        <FlightInfo label="StopInfo" value={item.displayData.stopInfo} />
        <FlightInfo label="Airline" value={item.displayData.airlines.map(airline => airline.airlineName).join(', ')} />
        <FlightInfo label="Flight Number" value={item.displayData.airlines.map(airline => airline.flightNumber).join(', ')} />
        <FlightInfo label="Fare" value={`$${item.fare}`} />
      </View>
    );
  };

  return (
    <View>
      <FlightFilters
        flights={flights}
        onFilterApply={onFilterApply}></FlightFilters>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{padding:20}}>
        <FlatList
          data={filteredFlights}
          renderItem={renderFlightItem}
          keyExtractor={item => item.id}
        />
        </View>
      )}
    </View>
  );
};

export default FlightSearch;
