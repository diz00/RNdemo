import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native'

import reducers from '../reducers';

const store = createStore(
    reducers,
    {}, // default state
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] })
    //.purge() // to clear the data
;
export default store;
