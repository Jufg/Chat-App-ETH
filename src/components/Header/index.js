import React, {useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../../actions'
import Web3 from "web3";

/**
 * @author
 * @function Header
 */

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const web3 = new Web3(window.web3.currentProvider);

    // Web3
    const connectWallet = () => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            window.ethereum.enable();
            return true;
        }
        return false;
    }

    return (
        <header className="header">
            <div style={{display: 'flex'}}>
                <div className="logo">Chat App</div>
                {
                    web3.currentProvider.selectedAddress ?
                        <p>connected</p>
                        :
                        <p>not connected</p>
                }
            </div>
            <div style={{
                margin: '20px 0',
                color: '#fff',
                fontWeight: 'bold',
                alignSelf: 'center'
            }}>
                {auth.authenticated ? `Hi ${auth.username}!` : ''}
            </div>
            <div className="menu">
                {
                    auth.authenticated ?

                        <button className="app-btn logout-btn" onClick={() => {
                            dispatch(logout(auth.uid))
                        }}>Logout</button> : null
                }
                {
                    web3.currentProvider.selectedAddress ?
                        null :
                        <button className="app-btn logout-btn" onClick={connectWallet}>Connect</button>
                }
            </div>
        </header>
    )
};

export default Header;