import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

const FlightSorter = ({sortBy, onSortChange}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={sortBy}
        onValueChange={itemValue => onSortChange(itemValue)}>
        <Picker.Item label="Sort by" value={null} />
        <Picker.Item label="Price" value="price" />
        {/* Add more sorting options if needed */}
      </Picker>
    </View>
  );
};

export default FlightSorter;
