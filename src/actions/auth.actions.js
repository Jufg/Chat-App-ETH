import {auth, firestore} from 'firebase'
import {authConstant} from "./constants";

// Signup Function
export const signup = (user) => {

    return async (dispatch) => {
        const db = firestore();

        dispatch({type: `${authConstant.USER_LOGIN}_REQUEST`});

        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                //console.log(data);
                const currentUser = auth().currentUser;
                currentUser.updateProfile({
                    displayName: `${user.username}`
                })
                    .then(() => {
                        // Update successfully
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
                                username: user.username,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true
                            })
                            .then(() => {
                                // successful
                                const loggedInUser = {
                                    username: user.username,
                                    uid: data.user.uid,
                                    email: user.email
                                }

                                localStorage.setItem('user', JSON.stringify(loggedInUser));
                                //console.log('user logged in...')
                                dispatch({
                                    type: `${authConstant.USER_LOGIN}_SUCCESS`,
                                    payload: {user: loggedInUser}
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                dispatch({
                                    type: `${authConstant.USER_LOGIN}_FAILURE`,
                                    payload: {error}
                                })
                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// Login Function
export const signin = (user) => {
    return async dispatch => {
        dispatch({type: `${authConstant.USER_LOGIN}_REQUEST`});
        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                //console.log(data);

                const db = firestore();
                db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        const username = data.user.displayName;

                        const loggedInUser = {
                            username,
                            uid: data.user.uid,
                            email: data.user.email
                        }

                        localStorage.setItem('user', JSON.stringify(loggedInUser));

                        dispatch({
                            type: `${authConstant.USER_LOGIN}_SUCCESS`,
                            payload: {user: loggedInUser}
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);

                dispatch({
                    type: `${authConstant.USER_LOGIN}_FAILURE`,
                    payload: {error}
                })
            })
    }
}

// Proof User-Login function
export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
            dispatch({
                type: `${authConstant.USER_LOGIN}_SUCCESS`,
                payload: {user}
            })
        } else {
            dispatch({
                type: `${authConstant.USER_LOGIN}_FAILURE`,
                payload: {error: 'Login again please'}
            })
        }

    }
}

//Logout Function
export const logout = (uid) => {
    return async dispatch => {
        dispatch({type: `${authConstant.USER_LOGOUT}_REQUEST`});

        const db = firestore();
        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false,
                lastOnline: new Date()
            })
            .then(() => {

                auth()
                    .signOut()
                    .then(() => {
                        // Success
                        localStorage.clear();
                        dispatch({type: `${authConstant.USER_LOGOUT}_SUCCESS`})
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch({
                            type: `${authConstant.USER_LOGOUT}_FAILURE`,
                            payload: {error}
                        })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
}
