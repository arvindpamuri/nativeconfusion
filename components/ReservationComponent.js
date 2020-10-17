import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert, Vibration, Platform, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            mode: 'date'
        }
    }

    reserveTableAlert = () =>
    Alert.alert(
      "Your Reservation OK?",
      "Number of Guests: " + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
      [
        {
          text: "CANCEL",
          onPress: () => this.resetForm(),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{ 
            this.presentLocalNotification(this.state.date);
            this.resetForm(); 
            } 
        }
      ],
      { cancelable: false }
    );

    handleReservation() {

        this.reserveTableAlert()
        this.addReservationToCalendar(this.state.date)
        this.toggleForm()
        
    }

    toggleForm() {
        this.setState({ 
            show: false,
            date: new Date(),
            mode: 'date',
            smoking: false,
            guests: 1
        })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            show: false
        });
    }

    async obtainCalendarPermission() {
        let calPermission = await Permissions.getAsync(Permissions.CALENDAR);
        if ( calPermission.status !== 'granted') {
            calPermission = await Permissions.askAsync(Permissions.CALENDAR);
            if ( permission.status !== 'granted') {
                Alert.alert('Permission not granted for notifications');
            }
        }
        return calPermission;
    }

    //created a new calendar because directly adding to default calendar is not working properly for android
    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();

        let dateMs = Date.parse(date);
  
        let startDate = new Date(dateMs);
        
        let endDate = new Date(dateMs + 2 * 60 * 60 * 1000);
        
        const defaultCalendarSource =
        
        Platform.OS === 'ios'
        
        ? await getDefaultCalendarSource()
        
        : { isLocalAccount: true, name: 'Expo Calendar' };
        let details = {
  
            title: 'Con Fusion Table Reservation',
            
            source: defaultCalendarSource,
            
            name: 'internalCalendarName',
            
            color: 'blue',
            
            entityType: Calendar.EntityTypes.EVENT,
            
            sourceId: defaultCalendarSource.id,
            
            ownerAccount: 'personal',
            
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            
        }

        const calendarId = await Calendar.createCalendarAsync(details)

        await Calendar.createEventAsync(calendarId , {

            title: 'Con Fusion Table Reservation',
            
            startDate: startDate,
            
            endDate: endDate,
            
            timeZone: 'Asia/Hong_Kong',
            
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            
            });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if ( permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if ( permission.status !== 'granted') {
                Alert.alert('Permission not granted for notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();

        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                Vibrate: true,
                color: '#512D8'
            }
        });
    }

    render() {
        return(
            <Animatable.View animation='zoomIn'>
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})}
                        >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DAB'
                        onValueChange={(value) => this.setState({ smoking: value})}
                        >
                    </Switch>
                </View>
                {/* used a custom component to get both and time(for android */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity style={styles.formItem}
                            style={{
                                padding: 7,
                                borderColor: '#512DA8',
                                borderWidth: 2,
                                flexDirection: "row"
                            }}
                            onPress={() => this.setState({ show: true, mode: 'date' })}
                    >
                        <Icon type='font-awesome' name='calendar' color='#512DA8' />
                        <Text >
                            {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                        </Text>
                    </TouchableOpacity>
                    {/* Date Time Picker */}
                    {this.state.show && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            minimumDate={new Date()}
                            minuteInterval={30}
                            onChange={(event, date) => {
                                if (date === undefined) {
                                    this.setState({ show: false });
                                }
                                else {
                                    this.setState({
                                        show: this.state.mode === "time" ? false : true,
                                        mode: "time",
                                        date: new Date(date)
                                    });
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='learn more about this'
                        />
                </View>
            </ScrollView>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;
 