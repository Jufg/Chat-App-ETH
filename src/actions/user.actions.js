import {userConstant} from "./constants";
import {firestore} from 'firebase';

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

//
export const updateAdress = (uid, adress) => {
    return async dispatch => {

        const db = firestore();
        db.collection('users')
            .doc(uid)
            .update({
                ETH_Adress: adress
            })
            .then(() => {
                //console.log('Adress updated')
            })
            .catch(error => {
                console.log(error)
            })
    }
}

