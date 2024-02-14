import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  applyButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 4,
    borderRadius: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
