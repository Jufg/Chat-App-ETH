import React, {useEffect, useState} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import Web3 from "web3";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateProfile} from "../../actions";

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
    const [email, setEmail] = useState('');
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

    // state handlers


    // DB communication
    const updateUser = (pField, pValue) => {
        dispatch(updateProfile(auth.uid, pField, pValue, pass));
    }

    // Web3
    if (window.web3) {
        ethereum
            .request({method: 'eth_accounts'})
            .then((accounts) => {
                if (accounts.length !== 0 && user.users.find(uid => uid = auth.uid).ETH_Adress[0] !== accounts[0]) {
                    console.log(auth.uid)
                    dispatch(updateProfile(auth.uid, 'ETH_Adress', accounts[0]));
                }
            })
            .catch((error) => {
                console.error(
                    `Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
                );
            });
    }

    const connectWallet = async () => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            ethereum.send('eth_requestAccounts');

            return true;
        }
        return false;
    }

    return (
        <Layout>
            <div>
                <div>
                    {
                        window.web3 !== undefined ?
                            window.web3.currentProvider.selectedAddress ?
                                null
                                :
                                <button onClick={connectWallet}>Connect</button>
                            :
                            null
                    }
                </div>
                <div>
                    <button>change Wallet</button>
                </div>
                <div>
                    change username
                </div>
                <div>
                    <label>E-mail</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type='text'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button
                        onClick={(e) => updateUser('eMail', email)}
                    >
                        change email
                    </button>
                </div>
                <div>
                    change password
                </div>
            </div>
        </Layout>

    );
};

export default SettingsPage;