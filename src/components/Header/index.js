import React, {useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../../actions'

/**
 * @author
 * @function Header
 */

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div style={{display: 'flex'}}>
                <div className="logo">Chat App</div>
                <div style={{color: 'white'}}>
                    {
                        window.web3 === undefined ?
                            <p>no wallet</p>
                            :
                            window.web3.currentProvider.selectedAddress ?
                                <p>connected</p>
                                :
                                <p>Locked wallet:
                                    {
                                        window.web3.currentProvider.isMetaMask ?
                                            ' MetaMask'
                                            :
                                            ' your Wallet'
                                    }
                                </p>
                    }
                </div>
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
                <a href='/settings'>Settings</a>
                {
                    auth.authenticated ?

                        <button className="app-btn logout-btn" onClick={() => {
                            dispatch(logout(auth.uid))
                        }}>Logout</button> : null
                }
            </div>
        </header>
    )
};

export default Header;