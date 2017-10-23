import React, { Component } from 'react';
import { View, Text, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
    static navigationOptions = {
        headerRight: (
            <Button 
                title="Log out" 
                onPress={() => AsyncStorage.removeItem('fb_token')} 
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0, 122, 255, 1)"
            />
        )
    }
    render() {
        return (
            <View>
                <Button 
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete-forever' }}
                    backgroundColor="#F44336"
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
