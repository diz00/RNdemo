import { AsyncStorage } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';


import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    }
};


export const doFBLogin = (error, result) => {
    return async (dispatch) => {
        if (error) {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
        } else if (result.isCancelled) {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
        } else {
            let data = await AccessToken.getCurrentAccessToken();
            await AsyncStorage.setItem('fb_token', data.accessToken.toString());
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: data.accessToken.toString() });
        }
    }
    
}