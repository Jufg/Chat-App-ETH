import React, {useEffect} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import Web3 from "web3";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateAdress} from "../../actions";

/**
 * @author
 * @function Header
 */

const SettingsPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const ethereum = window.ethereum;

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
    if (window.web3) {
        ethereum
            .request({method: 'eth_accounts'})
            .then((accounts) => {
                if (accounts.length !== 0 && user.users.find(uid => uid = auth.uid).ETH_Adress[0] !== accounts[0]) {
                    dispatch(updateAdress(auth.uid, accounts));
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
                    change email
                </div>
                <div>
                    change password
                </div>
            </div>
        </Layout>

    );
};

export default SettingsPage;