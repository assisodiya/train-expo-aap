import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Card, Text, IconButton, Button, Surface, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { lightColors, darkColors } from '../themes/colors';
const TrainSearchScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      weekday: 'short',
    })
  );
  const [quotaList, setQuotaList] = useState(['GN', 'TQ', 'LD', 'SC', 'PT']);
  const [activeClass, setActiveClass] = useState({
    class: '',
    train: '',
  });
  const generateDates = (days) => {
    const options = { day: '2-digit', month: 'short', weekday: 'short' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const dates = [];

    const currentDate = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push({ date: formatter.format(date) });
    }
    return dates;
  };

  // Generate dates for the next 120 days
  const dates = generateDates(120);

  const trains = [
    {
      id: '1',
      number: '15014',
      name: 'Ranikhet Exp',
      departureTime: '05:23',
      arrivalTime: '16:35',
      fromStation: 'GGN',
      toStation: 'JU',
      duration: '11h 12m',
      rating: '3.9',
      timeAgo: 'Updated 1 hour ago',
      daysAgo: '1 day ago',
      lastUpdate: 'Last updated 1 hour ago',
      classes: [
        { name: 'SL', fare: '365', status: 'Not Available' },
        { name: 'SL', fare: '365', status: 'Not Available', tatkal: true },
        { name: '3A', status: 'WL 20', chance: '60% Chance' }
      ],
    },
    {
      id: '2',
      number: '25014',
      name: 'Corbet Prk Link',
      departureTime: '05:23',
      arrivalTime: '16:35',
      fromStation: 'GGN',
      toStation: 'JU',
      duration: '11h 12m',
      rating: '4.1',
      timeAgo: 'Updated 1 hour ago',
      daysAgo: '1 day ago',
      lastUpdate: 'Last updated 1 hour ago',
      classes: [
        { name: 'SL', fare: '365', status: 'Not Available', tatkal: true },
        { name: '3A', fare: '990', status: 'WL 42', chance: '61% Chance' },
        { name: '3A', status: 'Not Available', tatkal: true }
      ]
    },
    {
      id: '3',
      number: '25016',
      name: 'Corbet Prk Link',
      departureTime: '05:23',
      arrivalTime: '16:35',
      fromStation: 'GGN',
      toStation: 'JU',
      duration: '11h 12m',
      rating: '4.1',
      timeAgo: 'Updated 1 hour ago',
      daysAgo: '1 day ago',
      lastUpdate: 'Last updated 1 hour ago',
      classes: [
        { name: 'SL', fare: '365', status: 'Not Available', tatkal: true },
        { name: '3A', fare: '990', status: 'WL 42', chance: '61% Chance' },
        { name: '3A', status: 'Not Available', tatkal: true }
      ]
    },
    {
      id: '4',
      number: '25017',
      name: 'Corbet Prk Link',
      departureTime: '05:23',
      arrivalTime: '16:35',
      fromStation: 'GGN',
      toStation: 'JU',
      duration: '11h 12m',
      rating: '4.1',
      timeAgo: 'Updated 1 hour ago',
      daysAgo: '1 day ago',
      lastUpdate: 'Last updated 1 hour ago',
      classes: [
        { name: 'SL', fare: '365', status: 'Not Available', tatkal: true },
        { name: '3A', fare: '990', status: 'WL 42', chance: '61% Chance' },
        { name: '3A', status: 'Not Available', tatkal: true }
      ]
    }
  ];

  const renderDateItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        selectedDate === item.date && styles.selectedDateButton
      ]}
      onPress={() => setSelectedDate(item.date)}
    >
      <Text style={[
        styles.dateText,
        selectedDate === item.date && styles.selectedDateText
      ]}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );

  const renderTrainItem = ({ item }) => (
    <Card style={styles.trainCard}>
      <View style={styles.trainHeader}>
        <View style={styles.trainTitleRow}>
          <View style={styles.trainTitleLeft}>
            <Text style={styles.trainNumber}>{item.number} - </Text>
            <Text style={styles.trainName}>{item.name}</Text>
          </View>
          <View style={styles.trainTitleRight}>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="food-bank" size={20} color={lightColors.success} />
            </View>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={14} color={lightColors.success} />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <IconButton
              icon="clock-outline"
              size={18}
              color="#666"
              style={styles.scheduleButton}
              onPress={() => { }}
            />
          </View>
        </View>

        <View style={styles.journeyRow}>
          <View style={styles.timeStation}>
            <Text style={styles.time}>{item.departureTime}</Text>
            <Text style={[styles.station, { color: lightColors.primary }]}>{item.fromStation}</Text>
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.duration}>
              Route
            </Text>
            <Text style={styles.duration}>
              <Ionicons name="arrow-forward" size={16} color="black" />
            </Text>
            <Text style={styles.duration}>- {item.duration} -</Text>
          </View>
          <View style={[styles.timeStation, { alignItems: 'flex-end' }]}>
            <Text style={styles.time}>{item.arrivalTime}</Text>
            <Text style={[styles.station, { color: lightColors.error }]}>{item.toStation}</Text>
          </View>
        </View>
      </View>

      <View style={styles.classesContainer}>
        {item.classes.map((classItem, index) => (
          <TouchableOpacity key={index} onPress={() => setActiveClass({class: classItem.name, train: item.number })} >
            <Button style={styles.classItem}>
              <Text style={styles.className}>{classItem.name}</Text>
            </Button>
          </TouchableOpacity>
        ))}
      </View>
      {activeClass.train === item.number && 
        //show quota list here
        quotaList.map((quota, index) => (
          <TouchableOpacity key={index} onPress={() => setActiveClass({ ...activeClass, quota })} >
            <Button style={styles.classItem}>
              <Text style={styles.className}>{quota}</Text>
            </Button>
          </TouchableOpacity>
        ))
      }

    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.routeContainer}>
              <View style={styles.routeRow}>
                <Text style={styles.stationCode}>GGN</Text>
                <Text style={styles.routeArrow}><Ionicons name="arrow-forward" size={16} color="black" /></Text>
                <Text style={styles.stationCode}>JU</Text>
              </View>
              <View style={styles.routeDetailsRow}>
                <Text style={styles.routeDetails}>General Quota | {selectedDate}</Text>
              </View>
            </View>
          </View>
          <IconButton
            icon="pencil-outline"
            size={20}
            color="#4CAF50"
            onPress={() => { }}
          />
        </View>

        <View style={styles.dateListContainer}>
          <FlatList
            horizontal
            data={dates}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.date}
            style={styles.dateList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* <View style={styles.cancellationBanner}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
          <Text style={styles.cancellationText}>Free Cancellation</Text>
          <View style={styles.trustedBadge}>
            <Text style={styles.trustedText}>Trusted by 1Crore+ people</Text>
          </View>
        </View> */}

        <FlatList
          data={trains}
          renderItem={renderTrainItem}
          keyExtractor={(item) => item.id}
          style={styles.trainList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeContainer: {
    flex: 1,
    marginRight: 8,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  routeArrow: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 8,
  },
  routeDetailsRow: {
    marginTop: 2,
  },
  routeDetails: {
    fontSize: 13,
    color: '#666',
  },
  dateListContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateList: {
    paddingVertical: 8,
  },
  cancellationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    marginVertical: 8,
  },
  cancellationText: {
    marginLeft: 8,
    color: '#4CAF50',
  },
  trustedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  trustedText: {
    color: '#fff',
    fontSize: 12,
  },
  trainCard: {
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  trainHeader: {
    padding: 12,
  },
  trainTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trainTitleLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  trainNumber: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  trainName: {
    fontSize: 15,
    color: '#333',
  },
  trainTitleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  rating: {
    color: '#4CAF50',
    marginLeft: 2,
    fontSize: 13,
    fontWeight: '500',
  },
  scheduleButton: {
    margin: 0,
    padding: 0,
    width: 24,
    height: 24,
  },
  journeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  timeStation: {
    alignItems: 'flex-start',
    width: 50,
  },
  time: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  station: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  durationLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  timeInfo: {
    marginTop: 4,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  classesContainer: {
    flexDirection: 'row', // This makes the buttons align horizontally
    flexWrap: 'wrap',     // Allows the items to wrap if there is not enough space
    justifyContent: 'center', // Distribute buttons evenly
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },

  classItem: {
    backgroundColor: `rgba(${lightColors.backgroundRGBSuccess}, 0.1)`, // Light background for each class button   
    marginRight: 8,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 2,
    elevation: 2,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  className: {
    marginHorizontal: 4,
    marginVertical: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: lightColors.success,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fare: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  tatkalBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 8,
  },
  tatkalText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  availabilityContainer: {
    alignItems: 'flex-end',
  },
  availability: {
    fontSize: 14,
    fontWeight: '500',
  },
  chance: {
    fontSize: 11,
    color: '#FF9800',
  },
  notAvailable: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '500',
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  selectedDateButton: {
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.8)`,
  },
  dateText: {
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
  },
});

export default TrainSearchScreen;
