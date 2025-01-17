import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, IconButton, Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightColors, darkColors } from '../themes/colors';
const stations = [
  { name: 'New Delhi - All stations', city: 'New Delhi, Delhi' },
  { name: 'New Delhi - Main', city: 'New Delhi, Delhi' },
  { name: 'Nandyal', city: 'Nandyal, Andhra Pradesh' },
  { name: 'Nellore South', city: 'Nellore, Andhra Pradesh' },
  { name: 'Nandlalee Halt', city: 'Nandlalee Halt, Bihar' },
];

const StationSearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStations, setFilteredStations] = useState(stations);
  const { onSelect, type } = route.params;

  useEffect(() => {
    if (searchQuery) {
      const filtered = stations.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(stations);
    }
  }, [searchQuery]);

  const handleStationSelect = (station) => {
    navigation.goBack();
    onSelect(station);
  };

  const renderStationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.stationItem}
      onPress={() => handleStationSelect(item)}
    >
      <MaterialIcons name="train" size={24} color="#666" style={styles.stationIcon} />
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{item.name}</Text>
        <Text style={styles.stationCity}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  const HandleSpeechRecognition = () => {
    navigation.navigate('SpeechRecognition');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search stations..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            autoFocus={true}
            icon="magnify" // Default search icon      
            iconPosition="right" // Move the icon to the right
          />
        </View>
        <TouchableOpacity>
          <Appbar.Action icon="microphone" onPress={() => HandleSpeechRecognition()} />
        </TouchableOpacity>

      </View>
      <FlatList
        data={filteredStations}
        renderItem={renderStationItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  searchContainer: {
    borderColor: lightColors.primary,
    borderWidth: 0.4,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 8,
    marginHorizontal: 8,
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.03)`,
  },
  backButton: {
    padding: 8,
    marginRight: 4,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  searchIcon: {
    marginLeft: 4,
    marginRight: 8,
  },
  searchBar: {
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0)`,
    borderRadius: 25,
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 0,
    marginLeft: 0,
  },
  clearButton: {
    padding: 8,
  },
  stationItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  stationIcon: {
    marginRight: 16,
    opacity: 0.6,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  stationCity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 56,
  },
  listContent: {
    flexGrow: 1,
    marginTop: 8,
  },
});

export default StationSearchScreen;
