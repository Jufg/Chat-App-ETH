import React, {useEffect, useState} from "react";
import './style.css'
import '../../../containers/LoginPage/style.css'
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateProfile} from "../../../actions";

/**
 * @author Jufg
 * @function Personal_info_form
 **/


const Personal_info_form = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [pass, setPass] = useState('');

    let unsubscribe;

    useEffect(() => {

        unsubscribe = dispatch(getRealtimeUsers())
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    // DB communication
    const updateUser = (e) => {
        e.preventDefault();

        let userDetails = {
            username,
            email,
            newPass,
            pass
        }

        if (userDetails.pass !== '') {
            dispatch(updateProfile(auth.uid, userDetails));
        }

        setUsername('');
        setEmail('');
        setNewPass('');
        setPass('');
    }

    return (
        <form
            onSubmit={updateUser}
            className="settings-form"
        >
            <div className="user-details">
                <div className="input-box">
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your new Username"
                    />
                    <label className="login-label" htmlFor="email">Username</label>
                </div>
                <div className="input-box">
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your new E-Mail"
                    />
                    <label className="login-label" htmlFor="email">Email Adress</label>
                </div>
                <div className="input-box">
                    <input
                        type='password'
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Enter your new Password"
                    />
                    <label className="login-label" htmlFor="email">New Password</label>
                </div>
                <div className="input-box">
                    <input
                        type='password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Confirm changes with your old Password"
                    />
                    <label className="login-label" htmlFor="email">Old Password</label>
                </div>
            </div>
            <div className="settings-button">
                <button
                    className="app-btn settings"
                    type="submit"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}

export default Personal_info_form