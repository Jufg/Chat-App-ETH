import React, {useEffect, useState} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateProfile} from "../../actions";
import Web3 from "web3";

/**
 * @author
 * @function Header
 */

const SettingsPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const ethereum = window.ethereum;

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

    // Web3

    const connectWallet = () => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            ethereum
                .send('eth_requestAccounts')
                .then(() => {
                    ethereum.request({method: 'eth_accounts'})
                        .then((accounts) => {
                            if (accounts.length !== 0 && user.users.find(uid => uid = auth.uid).ETH_Adress[0] !== accounts[0]) {
                                dispatch(updateProfile(auth.uid, 'ETH_Adress', accounts[0]));
                            }
                        })
                        .catch((error) => {
                            console.error(
                                `Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
                            );
                        });
                })
                .catch(e => {
                    console.log('User denied account access');
                });

            return true;
        }
        return false;
    }

    return (
        <Layout>
            <div className="settings-container">
                <div className="settings-box">
                    <div className="settings-header">
                        Wallet Settings
                    </div>
                </div>
                <div className="settings-box">
                    <div className="settings-child">
                        {
                            window.web3 !== undefined ?
                                window.web3.currentProvider.selectedAddress ?
                                    <button
                                        className="wallet-button"
                                        style={{
                                            cursor: 'not-allowed'
                                        }}>
                                        Connect
                                    </button>
                                    :
                                    <button
                                        className="wallet-button"
                                        onClick={connectWallet}
                                    >
                                        Connect
                                    </button>
                                :
                                <button
                                    className="wallet-button"
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    Connect
                                </button>
                        }
                    </div>
                </div>
                <hr className="settings-line"/>
                <div className="settings-box">
                    <div className="settings-header">
                        Personal Information
                    </div>
                </div>
                <form onSubmit={updateUser}>
                    <div className="settings-box">
                        <div className="settings-child">
                            <label>change username</label>
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
                            change password
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
                                type='text'
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
                </form>
            </div>
        </Layout>
    );
};

export default SettingsPage;