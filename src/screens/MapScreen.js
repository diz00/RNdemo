import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={25} color={tintColor}  />;
        }
    }

    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    removeToken() {
        AsyncStorage.removeItem('fb_token');
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                {/*<Button title="remove token" onPress={this.removeToken} />*/}
                <View style={styles.buttonContainer}>
                    <Button  
                        large
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
      //  ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    map: {
       // ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
});


export default connect(null, actions)(MapScreen);