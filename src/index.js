import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";
import {Provider} from 'react-redux';
import store from "./store";
import ipfs from 'ipfs';

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

const addData = async () => {
    const node = await ipfs.create()

    const data = 'Hello, <YOUR NAME HERE>'

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
    const results = node.add(Buffer.from(data))

// we loop over the results because 'add' supports multiple
// additions, but we only added one entry here so we only see
// one log line in the output
    /*for await ( results) {
        // CID (Content IDentifier) uniquely addresses the data
        // and can be used to get it again.
        console.log(cid.toString())
    }*/
}

addData().then(r => {
    console.log(r);
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
