import React, {useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from '../../actions'

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSlidersH, faCircle} from '@fortawesome/free-solid-svg-icons';

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
                <div className="logo">
                    <a href='/' style={{color: "white"}}>
                        ETH Chat App
                    </a>
                </div>
                <div style={{color: 'white', display: "flex"}}>
                    {
                        window.web3 === undefined ?
                            <p className={"wallet-status"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
                                    <g id="Circle" transform="translate(-634 -1197)">
                                        <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(634 1197)"
                                           fill="rgba(255,224,229,0.5)" stroke="#ef4b62" stroke-width="60">
                                            <circle cx="250" cy="250" r="250" stroke="none"/>
                                            <circle cx="250" cy="250" r="220" fill="none"/>
                                        </g>
                                    </g>
                                </svg>
                                no wallet
                            </p>
                            :
                            window.web3.currentProvider.selectedAddress ?
                                <p className={"wallet-status"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"
                                         viewBox="0 0 500 500">
                                        <g id="Circle" transform="translate(-634 -1197)">
                                            <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(634 1197)"
                                               fill="rgba(205,245,212,0.5)" stroke="#43edac" stroke-width="60">
                                                <circle cx="250" cy="250" r="250" stroke="none"/>
                                                <circle cx="250" cy="250" r="220" fill="none"/>
                                            </g>
                                        </g>
                                    </svg>
                                    Connected Wallet:
                                    {
                                        window.web3.currentProvider.isMetaMask ?
                                            ' MetaMask'
                                            :
                                            ' other Wallet'
                                    }
                                </p>
                                :
                                <p className={"wallet-status"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"
                                         viewBox="0 0 500 500">
                                        <g id="Circle" transform="translate(-634 -1197)">
                                            <g id="Ellipse_11" data-name="Ellipse 11" transform="translate(634 1197)"
                                               fill="rgba(250,244,207,0.5)" stroke="#fcdf35" stroke-width="60">
                                                <circle cx="250" cy="250" r="250" stroke="none"/>
                                                <circle cx="250" cy="250" r="220" fill="none"/>
                                            </g>
                                        </g>
                                    </svg>
                                    Locked wallet:
                                    {
                                        window.web3.currentProvider.isMetaMask ?
                                            ' MetaMask'
                                            :
                                            ' other Wallet'
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
                <a href='/settings' className={'settingsIco'}><FontAwesomeIcon icon={faSlidersH}/></a>
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