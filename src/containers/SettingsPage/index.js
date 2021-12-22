import React, {useEffect, useState} from 'react';
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers, updateAdresse, updateProfile, updateProfileHash} from "../../actions";
import Web3 from "web3";
import {create} from "ipfs-http-client";

// Ipfs gateway
const client = create('https://ipfs.infura.io:5001/api/v0');

/**
 * @author Jufg
 * @function SettingsPage
 */

const SettingsPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    // States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [pass, setPass] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [urlArr, setUrlArr] = useState([]);

    let unsubscribe

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
            username, email, newPass, pass
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
                            console.error(`Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`);
                        });
                })
                .catch(e => {
                    console.log('User denied account access');
                });

            return true;
        }
        return false;
    }

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setProfilePic(Buffer(reader.result))
        }

        e.preventDefault();
    }

    const uploadImageToIPFS = async (e) => {
        e.preventDefault();
        try {
            const created = await client.add(profilePic);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`;
            setUrlArr(prev => [...prev, url]);

            dispatch(updateProfileHash(auth.uid, created.cid));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (<Layout>
        <div className="settings-container">
            <div className="settings-box">
                <div className="settings-header">
                    Wallet Settings
                </div>
            </div>
            <div className="settings-box">
                <div className="settings-child">
                    {window.web3 !== undefined ? window.web3.currentProvider.selectedAddress ? <button
                        className="wallet-button"
                        style={{
                            cursor: 'not-allowed'
                        }}>
                        Connect
                    </button> : <button
                        className="wallet-button"
                        onClick={connectWallet}
                    >
                        Connect
                    </button> : <button
                        className="wallet-button"
                        style={{
                            cursor: 'not-allowed',
                        }}>
                        Connect
                    </button>}
                </div>
            </div>
            <hr className="settings-line"/>
            <div className="settings-box">
                <div className="settings-header">
                    Personal Information
                </div>
            </div>
            <div className="settings-box">
                <div className="settings-child">
                    Profile Picture:
                </div>
                <div className="settings-child">
                    <img src=
                             {'https://ipfs.infura.io/ipfs/' + (user.users.find(({uid}) => uid === auth.uid) !== undefined ? user.users.find(({uid}) => uid === auth.uid).IPFS_ProfilePicHash : null)}
                         style={{width: "200px"}}/>
                </div>
                <div className="settings-child">

                    <input type='file'
                           accept=".png , .jpeg, .jpg"
                           onChange={retrieveFile}>
                    </input>
                    <button
                        className="wallet-button"
                        onClick={uploadImageToIPFS}
                    >
                        Upload file to ipfs
                    </button>
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
            </form>
        </div>
    </Layout>);
};

export default SettingsPage;