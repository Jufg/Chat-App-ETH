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
        <form className="settings-form">
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Username</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your new Username"
                    />
                </div>
                <div className="input-box">
                    <span className="details">E-Mail</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your new E-Mail"
                    />
                </div>
                <div className="input-box">
                    <span className="details">Password</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your new Password"
                    />
                </div>
                <div className="input-box">
                    <span className="details">Confirm changes</span>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Confirm changes with your old Password"
                    />
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

        /**
         <form onSubmit={updateUser}>
         <div className="settings-con">
         <div className="settings-child">
         <label>Username</label>
         <input
         type='text'
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         />
         </div>
         <div className="settings-child">
         <label>E-mail</label>
         <input
         type='email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         />
         </div>
         <div className="settings-child">
         <label>new Password</label>
         <input
         type='text'
         value={newPass}
         onChange={(e) => setNewPass(e.target.value)}
         />
         </div>
         <div className="settings-child">
         Confirm settings
         <label>Current Password</label>
         <input
         type='password'
         required={true}
         value={pass}
         onChange={(e) => setPass(e.target.value)}
         />
         <button
         type="submit"
         >
         Confirm
         </button>
         </div>
         </div>
         </form>**/
    );
}

export default Personal_info_form