import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";
import {Provider} from 'react-redux';
import store from "./store";
import ipfs from "ipfs";
require('dotenv').config()

const env = process.env

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: `${env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: `${env.REACT_APP_PROJECT_ID}.appspot.com`,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
    appId: env.REACT_APP_APP_ID,
    measurementId: env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Ipfs Setup
const cat = async (hash) => {
    const node = await ipfs.create()

    const stream = node.cat('QmYKtvp8XiBEVrPK3X9ZQZ1znMuBsKMesUViZ93eGenhGK')
    let data = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }

    return data;
}
cat().then(data => {
    console.log(data);

});

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
