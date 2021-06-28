import React, {useEffect} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import Personal_info_form from "../../components/UI/Personal-info-form";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateAdresse} from "../../actions";
import Web3 from "web3";
import Settings_form from "../../components/UI/Personal-info-form";

/**
 * @author Jufg
 * @function SettingsPage
 */

const SettingsPage = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

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

    // Web3
    let ethereum;

    if (window.web3) {
        ethereum = window.ethereum;
    }

    const connectWallet = () => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            ethereum
                .send('eth_requestAccounts')
                .then(() => {
                    ethereum.request({method: 'eth_accounts'})
                        .then((accounts) => {
                            if (accounts.length !== 0 && user.users.find(uid => uid = auth.uid).ETH_Adress[0] !== accounts[0]) {
                                dispatch(updateAdresse(auth.uid, accounts[0]));
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
                                        className="app-btn settings"
                                        style={{
                                            cursor: 'not-allowed'
                                        }}>
                                        Connect
                                    </button>
                                    :
                                    <button
                                        className="app-btn settings"
                                        onClick={connectWallet}
                                    >
                                        Connect
                                    </button>
                                :
                                <button
                                    className="app-btn settings"
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
               <Personal_info_form/>
            </div>
        </Layout>
    );
};

export default SettingsPage;