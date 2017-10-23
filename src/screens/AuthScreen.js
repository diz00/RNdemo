import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View>
                <Text>Login with Facebook!</Text>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={this.props.doFBLogin}
                    onLogoutFinished={() => alert("logout.")}
                />
            </View>
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);