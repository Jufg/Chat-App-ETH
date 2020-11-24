import React from 'react';
import './style.css'
import Layout from "../../components/Layout";
import Web3 from "web3";
import {useDispatch, useSelector} from "react-redux";
import {updateAdress} from "../../actions";

/**
 * @author
 * @function Header
 */

const SettingsPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // Web3
    const connectWallet = async () => {
         if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            window.ethereum.enable();

            if (await window.web3.currentProvider.selectedAddress) {
                dispatch(updateAdress(auth.uid, window.web3.currentProvider.selectedAddress))
            }
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