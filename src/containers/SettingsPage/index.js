import React, {useEffect, useState} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import Personal_info_form from "../../components/UI/Settings/Personal-info";
import WalletSettings from "../../components/UI/Settings/Wallet-Settings";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateAdresse, updateProfile} from "../../actions";
import Web3 from "web3";

/**
 * @author Jufg
 * @function SettingsPage
 */

const SettingsPage = () => {

    const user = useSelector(state => state.user);

    return (
        <Layout>
            <div className="settings-container">
                <div className="settings-box">
                    <div className="settings-header">
                        Wallet Settings
                    </div>
                </div>
                <WalletSettings/>
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