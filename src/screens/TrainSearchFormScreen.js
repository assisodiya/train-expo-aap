import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, SafeAreaView, StatusBar } from 'react-native';
import { Text, Surface, IconButton, Button, Portal, Modal, Provider } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { lightColors } from '../themes/colors';
const TrainSearchFormScreen = ({ navigation }) => {
  const [fromStation, setFromStation] = useState({ code: 'NZM', name: 'H Nizamuddin', city: 'New Delhi, Delhi' });
  const [toStation, setToStation] = useState({ code: 'PNVL', name: 'Panvel', city: 'Mumbai, Maharashtra' });
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTab, setSelectedTab] = useState('home');
  const [showCalendar, setShowCalendar] = useState(false);

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home', badge: '' },
    { id: 'bookings', icon: 'format-list-bulleted', label: 'My Bookings', badge: '2' },
    { id: 'offers', icon: 'local-offer', label: 'Offers', badge: 'NEW' },
    { id: 'account', icon: 'person', label: 'Account', badge: '1' },
  ];

  const services = [
    { id: 'trains', icon: 'train', label: 'Trains', },
    { id: 'flights', icon: 'airplane', label: 'Flights', },
    { id: 'bus', icon: 'bus', label: 'Bus', },
    { id: 'hotels', icon: 'hotel', label: 'Hotels', discount: 'Upto 50% Off' },
  ];

  const otherServices = [
    { id: 'food', icon: 'food', label: 'Order food\non train', isNew: true },
    { id: 'pnr', icon: 'ticket-confirmation', label: 'PNR\nStatus' },
    { id: 'running', icon: 'train-variant', label: 'Running\nStatus' },
    { id: 'seat', icon: 'seat', label: 'Seat\nAvailability' },
    { id: 'track', icon: 'map-marker-path', label: 'Track\nTrain' },
    { id: 'calendar', icon: 'calendar', label: 'Train\nCalendar' },
    { id: 'route', icon: 'routes', label: 'Train\nRoute' },
    { id: 'coach', icon: 'train-car', label: 'Coach\nPosition' },
  ];

  const handleStationSelect = (type) => {
    navigation.navigate('StationSearch', {
      type,
      onSelect: (station) => {
        if (type === 'from') {
          setFromStation(station);
        } else {
          setToStation(station);
        }
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logoText}>
              <Text style={styles.confirmText}>FWMSPL</Text>
            </Text>
            <IconButton icon="share-variant" size={24} onPress={() => { }} />
          </View>

          <View style={styles.servicesContainer}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceIconContainer}>
                  <View style={styles.iconCircle}>
                    <MaterialCommunityIcons
                      name={service.icon}
                      size={24}
                      color='#fff'
                    />
                  </View>
                  {service.discount && <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{service.discount}</Text>
                  </View>}
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </View>
            ))}
          </View>

          <Surface style={styles.searchForm}>
            <View style={styles.stationSection}>
              <MaterialIcons name="train" size={24} color="#666" style={styles.stationIcon} />
              <TouchableOpacity
                style={styles.stationInput}
                onPress={() => handleStationSelect('from')}
              >
                <Text style={styles.stationLabel}>From</Text>
                <Text style={styles.stationText}>{fromStation.name}</Text>
                <Text style={styles.stationCity}>{fromStation.city}</Text>
              </TouchableOpacity>
            </View>

            <IconButton
              icon="swap-vertical"
              size={24}
              style={[styles.swapButton, { backgroundColor: lightColors.light, boxShadow : '0px 2px 4px rgba(0, 0, 0, 0.1)' }]}
              iconColor={lightColors.primary}
              onPress={() => {
                const temp = fromStation;
                setFromStation(toStation);
                setToStation(temp);
              }}
            />

            <View style={styles.stationSection}>
              <MaterialIcons name="train" size={24} color="#666" style={styles.stationIcon} />
              <TouchableOpacity
                style={styles.stationInput}
                onPress={() => handleStationSelect('to')}
              >
                <Text style={styles.stationLabel}>To</Text>
                <Text style={styles.stationText}>{toStation.name}</Text>
                <Text style={styles.stationCity}>{toStation.city}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => navigation.navigate('DateSelection', {
                selectedDate,
                onSelectDate: (date) => setSelectedDate(date)
              })}
            >
              <View style={styles.dateRow}>
                <MaterialIcons name="calendar-month" size={24} color="#666" style={styles.stationIcon} />
                <Text style={styles.dateText}>{moment(selectedDate).format('ddd, DD MMM YYYY')}</Text>
              </View>
              <View style={styles.quickDateButtons}>
                <TouchableOpacity
                  style={[
                    styles.quickDateBtn,
                    moment(selectedDate).isSame(moment(), 'day') && styles.activeDateBtn
                  ]}
                  onPress={() => setSelectedDate(moment().format('YYYY-MM-DD'))}
                >
                  <Text style={[
                    styles.quickDateBtnText,
                    moment(selectedDate).isSame(moment(), 'day') && styles.activeDateBtnText
                  ]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.quickDateBtn,
                    moment(selectedDate).isSame(moment().add(1, 'day'), 'day') && styles.activeDateBtn
                  ]}
                  onPress={() => setSelectedDate(moment().add(1, 'day').format('YYYY-MM-DD'))}
                >
                  <Text style={[
                    styles.quickDateBtnText,
                    moment(selectedDate).isSame(moment().add(1, 'day'), 'day') && styles.activeDateBtnText
                  ]}>Tomorrow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.quickDateBtn,
                    moment(selectedDate).isSame(moment().add(2, 'day'), 'day') && styles.activeDateBtn
                  ]}
                  onPress={() => setSelectedDate(moment().add(2, 'day').format('YYYY-MM-DD'))}
                >
                  <Text style={[
                    styles.quickDateBtnText,
                    moment(selectedDate).isSame(moment().add(2, 'day'), 'day') && styles.activeDateBtnText
                  ]}>Day After</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View style={styles.refundContainer}>
              <MaterialCommunityIcons name="checkbox-marked" size={24} color={lightColors.primary} />
              <Text style={styles.refundText}>Get full train fare refund on cancellation</Text>
              <MaterialIcons name="info" size={24} color="#666" />
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => navigation.navigate('TrainList')}
            >
              <Text style={styles.searchButtonText}>SEARCH TRAINS</Text>
            </TouchableOpacity>

            <View style={styles.partnerContainer}>
              <View style={styles.irctcLogoContainer}>
                <MaterialCommunityIcons name="train" size={20} color={lightColors.primary} />
              </View>
              <Text style={styles.partnerText}>IRCTC Authorised Partner</Text>
            </View>
          </Surface>

          <View style={styles.otherServicesSection}>
            <Text style={styles.sectionTitle}>Other Services</Text>
            <View style={styles.otherServicesGrid}>
              {otherServices.map((service) => (
                <TouchableOpacity key={service.id} style={styles.otherServiceItem}>
                  <View style={styles.otherServiceIconContainer}>
                    <View style={styles.otherIconCircle}>
                      <MaterialCommunityIcons
                        name={service.icon}
                        size={20}
                        color={lightColors.primary}
                      />
                    </View>
                    {service.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>New</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.otherServiceLabel}>{service.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => setSelectedTab(tab.id)}
            >
              <View style={styles.tabContent}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name={tab.icon}
                    size={24}
                    color={selectedTab === tab.id ? lightColors.primary : '#666666'}
                  />
                  {tab.badge && (
                    <View style={[
                      styles.badge,
                      {
                        backgroundColor: tab.badge === 'NEW' ? lightColors.primary : '#FF5722',
                        minWidth: tab.badge === 'NEW' ? 32 : 16,
                      }
                    ]}>
                      <Text style={styles.badgeText}>{tab.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={[
                  styles.tabLabel,
                  { color: selectedTab === tab.id ? lightColors.primary : '#666666' }
                ]}>
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 60,
    marginBottom: 60,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 0,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  serviceItem: {
    alignItems: 'center',
    width: '22%',
  },
  serviceIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.9)`,
    justifyContent: 'center',
    alignItems: 'center',
    color: lightColors.light,
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: -16,
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
  },
  serviceLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  searchForm: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  stationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stationIcon: {
    marginRight: 12,
  },
  stationInput: {
    flex: 1,
  },
  stationLabel: {
    fontSize: 12,
    color: '#666',
  },
  stationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  stationCity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  swapButton: {
    alignSelf: 'flex-end',
    marginVertical: 12,
    position: 'absolute',
    right: 10,
    top : 67,
    borderRadius: 20,
  },
  dateContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  quickDateButtons: {
    flexDirection: 'row',
  },
  quickDateBtn: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  activeDateBtn: {
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.8)`,
  },
  quickDateBtnText: {
    color: '#666',
    fontSize: 11,
  },
  activeDateBtnText: {
    color: '#FFF',
  },
  refundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  refundText: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 14,
    color: '#666',
  },
  searchButton: {
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.8)`,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  partnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  irctcLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.1)`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  partnerText: {
    fontSize: 14,
    color: '#666',
  },
  otherServicesSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  otherServicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  otherServiceItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 24,
  },
  otherServiceIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  otherIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `rgba(${lightColors.backgroundRGB}, 0.1)`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
  },
  otherServiceLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  confirmText: {
    color: '#333',
  },
  tktText: {
    color: '#4CAF50',
  },
});

export default TrainSearchFormScreen;
