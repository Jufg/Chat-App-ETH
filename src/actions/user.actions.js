import {authConstant, userConstant} from "./constants";
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
export const updateChats = (msgObj) => {
    return async dispatch => {

        const db = firestore();
        db.collection('chats')
            .add({
                ...msgObj,
                isViewed: false,
                createdAt: new Date()
            })
            .then((data) => {
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

// update UserProfile
export const updateProfile = (uid, userDetails) => {
    return async dispatch => {

        const db = firestore();
        const user = auth().currentUser;
        let credential;

        try {
            credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                userDetails.pass
            );
        } catch (e) {
            credential = null;
        }

        try {
            if (credential) {

                // Change Username
                if (userDetails.username !== '') {
                    user.reauthenticateWithCredential(credential).then(() => {
                        // User re-authenticated.
                        user.updateProfile({
                            displayName: `${userDetails.username}`
                        }).then(() => {
                            // Update successful.
                            db.collection('users')
                                .doc(uid)
                                .update({
                                    username: userDetails.username
                                })
                                .then(() => {
                                    // successful
                                    const loggedInUser = {
                                        username: user.displayName,
                                        uid: user.uid,
                                        email: user.email
                                    }

                                    localStorage.setItem('user', JSON.stringify(loggedInUser));

                                    dispatch({
                                        type: `${authConstant.USER_LOGIN}_SUCCESS`,
                                        payload: {user: loggedInUser}
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }).catch((error) => {
                            console.log(error)
                        });
                    }).catch((error) => {
                        console.log(error)
                    });

                }

                // Change Email
                if (userDetails.email !== '') {
                    user.reauthenticateWithCredential(credential)
                        .then(() => {
                            // User re-authenticated.
                            user.updateEmail(userDetails.email)
                                .then(() => {
                                    // Update successful.
                                    // successful
                                    const loggedInUser = {
                                        username: user.displayName,
                                        uid: user.uid,
                                        email: user.email
                                    }

                                    localStorage.setItem('user', JSON.stringify(loggedInUser));

                                    dispatch({
                                        type: `${authConstant.USER_LOGIN}_SUCCESS`,
                                        payload: {user: loggedInUser}
                                    })
                                }).catch((error) => {
                                console.log(error)
                            });
                        }).catch((error) => {
                        console.log(error)
                    });
                }

                // Change Pass
                if (userDetails.newPass !== '') {
                    user.reauthenticateWithCredential(credential).then(() => {
                        // User re-authenticated.
                        user.updatePassword(userDetails.newPass).then(() => {
                            // Update successful.
                        }).catch((error) => {
                            console.log(error)
                        });
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            }
        } catch
            (e) {
            console.log(e)
        }
    }
}

export const updateAdresse = (uid, account) => {
    return async dispatch => {

        const db = firestore();

        if (account !== '') {
            db.collection('users')
                .doc(uid)
                .update({
                    ETH_Adress: account
                })
                .then()
                .catch(error => {
                    console.log(error)
                })
        }

    }
}

export const updateProfileHash = (uid, hash) => {
    return async dispatch => {

        const db = firestore();

        if (hash !== '') {
            db.collection('users')
                .doc(uid)
                .update({
                    IPFS_ProfilePicHash: hash
                })
                .then()
                .catch(error => {
                    console.log(error)
                })
        }

    }
}

