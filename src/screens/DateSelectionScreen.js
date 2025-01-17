import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { lightColors, darkColors } from '../themes/colors'; 
const DateSelectionScreen = ({ navigation, route }) => {
  const { onSelectDate, selectedDate } = route.params || {};
  const currentDate = moment();
  const months = [
    moment().format('MMMM YYYY'),
    moment().add(1, 'month').format('MMMM YYYY'),
    moment().add(2, 'month').format('MMMM YYYY')
  ];

  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  const generateCalendar = (monthMoment) => {
    const startOfMonth = monthMoment.clone().startOf('month');
    const endOfMonth = monthMoment.clone().endOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();
    
    let calendar = [];
    let week = new Array(7).fill(null);
    
    // Fill in empty days at start
    for (let i = 0; i < startDay; i++) {
      week[i] = null;
    }
    
    // Fill in the days
    let dayCounter = 1;
    for (let i = startDay; i < 7; i++) {
      week[i] = dayCounter++;
    }
    calendar.push(week);
    
    week = new Array(7).fill(null);
    let weekDay = 0;
    while (dayCounter <= daysInMonth) {
      week[weekDay] = dayCounter++;
      weekDay++;
      if (weekDay === 7) {
        calendar.push(week);
        week = new Array(7).fill(null);
        weekDay = 0;
      }
    }
    
    if (weekDay > 0) {
      calendar.push(week);
    }
    
    return calendar;
  };

  const handleDateSelect = (date, month) => {
    if (!date) return;
    const selectedMoment = moment(month, 'MMMM YYYY').date(date);
    if (selectedMoment.isBefore(moment(), 'day')) return;
    
    if (onSelectDate) {
      onSelectDate(selectedMoment.format('YYYY-MM-DD'));
    }
    navigation.goBack();
  };

  const isDateSelected = (date, month) => {
    if (!date) return false;
    const currentDateString = moment(month, 'MMMM YYYY').date(date).format('YYYY-MM-DD');
    return currentDateString === selectedDate;
  };

  const isDateDisabled = (date, month) => {
    if (!date) return true;
    const currentDateString = moment(month, 'MMMM YYYY').date(date);
    return currentDateString.isBefore(moment(), 'day');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Select Departure Date" />
        <Appbar.Action icon="microphone" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.departureText}>Departure</Text>
        <Text style={styles.selectedDateText}>
          {moment(selectedDate).format('ddd, DD MMM')}
        </Text>
        
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {months.map((month, monthIndex) => (
          <View key={monthIndex} style={styles.monthContainer}>
            <Text style={styles.monthText}>{month}</Text>
            {generateCalendar(moment(month, 'MMMM YYYY')).map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekContainer}>
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    style={[
                      styles.dayButton,
                      isDateSelected(day, month) && styles.selectedDay,
                      isDateDisabled(day, month) && styles.disabledDay,
                    ]}
                    onPress={() => handleDateSelect(day, month)}
                    disabled={isDateDisabled(day, month)}
                  >
                    {day && (
                      <Text
                        style={[
                          styles.dayText,
                          isDateSelected(day, month) && styles.selectedDayText,
                          isDateDisabled(day, month) && styles.disabledDayText,
                        ]}
                      >
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  content: {
    padding: 16,
  },
  departureText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  selectedDateText: {
    textAlign: 'center',
    color:  lightColors.primary,
    fontSize: 24,
    fontWeight: '500',
    marginVertical: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  monthContainer: {
    marginBottom: 24,
  },
  monthText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedDay: {
    backgroundColor: lightColors.primary,
  },
  disabledDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  disabledDayText: {
    color: '#999',
  },
});

export default DateSelectionScreen;
