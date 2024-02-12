import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flightItemContainer: {
    backgroundColor: '#F5F5DC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC', 
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#4CAF50',
  },
  infoText: {
    flex: 1,
    color: '#9C27B0', 
  },
});

export default styles;
