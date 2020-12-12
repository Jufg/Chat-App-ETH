import {userConstant} from "./constants";
import {auth, firestore} from 'firebase';
import * as firebase from "firebase";

// Fetch the Users from Firestore
export const getRealtimeUsers = (uid) => {

    return async (dispatch) => {

        dispatch({type: `${userConstant.GET_REALTIME_USERS}_REQUEST`})

        const db = firestore();

        const unsubscribe = db.collection("users")
            //.where("uid", "!==", uid)
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.data().uid !== uid) {
                        users.push(doc.data());
                    }
                });
                //console.log(users);

                dispatch({
                    type: `${userConstant.GET_REALTIME_USERS}_SUCCESS`,
                    payload: {users}
                });
            });

        return unsubscribe;
    }
}

// Push the Message to Firestore
export const updateMessage = (msgObj) => {
    return async dispatch => {

        const db = firestore();
        db.collection('chats')
            .add({
                ...msgObj,
                isViewed: false,
                createdAt: new Date()
            })
            .then((data) => {
                //console.log(data)

            })
            .catch(error => {
                console.log(error)
            })
    }
}

// Fetch the Chats from Firestore
export const getRealtimeChats = (user) => {
    return async dispatch => {

        const db = firestore();
        db.collection('chats')
            .where('user_uid_Sender', 'in', [user.uid_Sender, user.uid_Receiver])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const chats = []

                querySnapshot.forEach(doc => {
                    if (
                        (doc.data().user_uid_Sender === user.uid_Sender && doc.data().user_uid_Receiver === user.uid_Receiver)
                        ||
                        (doc.data().user_uid_Sender === user.uid_Receiver && doc.data().user_uid_Receiver === user.uid_Sender)
                    ) {
                        chats.push(doc.data())
                    }
                })

                dispatch({
                    type: userConstant.GET_REALTIME_MESSAGES,
                    payload: {chats}
                })
            })
    }
}

// update a specific field
export const updateProfile = (uid, field, value, optPass) => {
    return async dispatch => {

        const db = firestore();
        const user = auth().currentUser;

        try {

            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                optPass
            );

            if (field != null) {
                switch (field) {
                    case 'ETH_Adress': {
                        db.collection('users')
                            .doc(uid)
                            .update({
                                ETH_Adress: value
                            })
                            .then()
                            .catch(error => {
                                console.log(error)
                            })

                        break;
                    }
                    case'username': {
                        if (credential) {
                            user.reauthenticateWithCredential(credential).then(function () {
                                // User re-authenticated.
                                user.updateProfile(
                                    {
                                        displayName: value
                                    }
                                ).then(function () {
                                    // Update successful.
                                    db.collection('users')
                                        .doc(uid)
                                        .update({
                                            username: value
                                        })
                                        .then()
                                        .catch(error => {
                                            console.log(error)
                                        })
                                }).catch(function (error) {
                                    console.log(error)
                                });
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }
                        break;
                    }
                    case 'eMail': {
                        if (credential) {
                            user.reauthenticateWithCredential(credential).then(function () {
                                // User re-authenticated.
                                user.updateEmail(value).then(function () {
                                    // Update successful.
                                }).catch(function (error) {
                                    console.log(error)
                                });
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }
                        break;
                    }
                    case 'password': {
                        if (credential) {
                            user.reauthenticateWithCredential(credential).then(function () {
                                // User re-authenticated.
                                user.updatePassword(value).then(function () {
                                    // Update successful.
                                }).catch(function (error) {
                                    console.log(error)
                                });
                            }).catch(function (error) {
                                console.log(error)
                            });
                        }
                        break;
                    }
                    default:
                        console.log('Field is not a String or Empty.')
                        console.log('Field: ' + field)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}

