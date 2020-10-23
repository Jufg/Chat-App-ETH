import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";
import {Provider} from 'react-redux';
import store from "./store";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz21_as9u_8EE8FAC-XBCXFX4JH7k05CY",
    authDomain: "web-chat-app-90624.firebaseapp.com",
    databaseURL: "https://web-chat-app-90624.firebaseio.com",
    projectId: "web-chat-app-90624",
    storageBucket: "web-chat-app-90624.appspot.com",
    messagingSenderId: "955891609480",
    appId: "1:955891609480:web:1322b76b5fa6f6d56cd43d",
    measurementId: "G-779ZVCDLET"
};

firebase.initializeApp(firebaseConfig);

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
