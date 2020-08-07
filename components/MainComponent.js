import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './favoriteComponent';
import Login from './LoginComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color:'#fff'
    }
};

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
            
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                name='menu'
                                size={24}
                                color='white'
                                onPress={ () =>
                                    navigation.toggleDrawer()}
                            />
                        )
                    })
                }
            />
            <MenuNavigator.Screen
                name='DishDetail'
                component={DishDetail}
                options={{ headerTitle: 'Dish Detail'}}
            />
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name='Home'
                component={Home}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon
                                name='menu'
                                size={24}
                                color='white'
                                onPress={ () =>
                                    navigation.toggleDrawer()}
                            />
                        )
                    })
                }
            />
        </HomeNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact Us'
            screenOptions={HeaderOptions}
            >
                <ContactNavigator.Screen
                    name='Contact Us'
                    component={Contact}
                    options={
                        ({navigation}) => ({
                            headerLeft: () => (
                                <Icon
                                    name='menu'
                                    size={24}
                                    color='white'
                                    onPress={ () =>
                                        navigation.toggleDrawer()}
                                />
                            )
                        })
                    }
                />
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
            initialRouteName='About Us'
            screenOptions={HeaderOptions}
            >
                <AboutNavigator.Screen
                    name='About'
                    component={About}
                    options={
                        ({navigation}) => ({
                            headerLeft: () => (
                                <Icon
                                    name='menu'
                                    size={24}
                                    color='white'
                                    onPress={ () =>
                                        navigation.toggleDrawer()}
                                />
                            )
                        })
                    }
                />
        </AboutNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reserve Table'
            screenOptions={HeaderOptions}
            >
                <ReservationNavigator.Screen
                    name='Reserve Table'
                    component={Reservation}
                    options={
                        ({navigation}) => ({
                            headerLeft: () => (
                                <Icon
                                    name='menu'
                                    size={24}
                                    color='white'
                                    onPress={ () =>
                                        navigation.toggleDrawer()}
                                />
                            )
                        })
                    }
                />
        </ReservationNavigator.Navigator>
    );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen() {
    return(
        <FavoritesNavigator.Navigator
            initialRouteName='My Favorites'
            screenOptions={HeaderOptions}
            >
                <FavoritesNavigator.Screen
                    name='My Favorites'
                    component={Favorites}
                    options={
                        ({navigation}) => ({
                            headerLeft: () => (
                                <Icon
                                    name='menu'
                                    size={24}
                                    color='white'
                                    onPress={ () =>
                                        navigation.toggleDrawer()}
                                />
                            )
                        })
                    }
                />
                <FavoritesNavigator.Screen
                    name='DishDetail'
                    component={DishDetail}
                    options={{ headerTitle: 'Dish Detail'}}
                />
        </FavoritesNavigator.Navigator>
    );
}

const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
            initialRouteName='Login'
            screenOptions={HeaderOptions}
            >
                <LoginNavigator.Screen
                    name='Login'
                    component={Login}
                    options={
                        ({navigation}) => ({
                            headerLeft: () => (
                                <Icon
                                    name='menu'
                                    size={24}
                                    color='white'
                                    onPress={ () =>
                                        navigation.toggleDrawer()}
                                />
                            )
                        })
                    }
                />
        </LoginNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator
            initialRouteName='Home'
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props}/>}
        >   
            <MainNavigator.Screen 
                name='Login' 
                component={LoginNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name='Home' 
                component={HomeNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />

            <MainNavigator.Screen 
                name='About Us' 
                component={AboutNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                    />
                    )
                }}
            />
            <MainNavigator.Screen 
                name='Menu' 
                component={MenuNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                    />
                    )
                }}
            />
            <MainNavigator.Screen 
                name='Contact Us' 
                component={ContactNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                    />
                    )
                }}
            />
            <MainNavigator.Screen 
                name='My Favorites' 
                component={FavoritesNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='heart'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                    />
                    )
                }}
            />
            <MainNavigator.Screen 
                name='Reserve Table' 
                component={ReservationNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                    />
                    )
                }}
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return(
            <NavigationContainer>
                <MainNavigatorDrawer/>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DAB',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row' 
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);