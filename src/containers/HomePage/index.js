import React, {useEffect, useState} from "react";
import './style.css'
import Layout from "../../components/Layout";
import User from "../../components/UI/User";
import Message from "../../components/UI/Message";
import returnTime from "../../utils/chatUtils";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeChats, getRealtimeUsers, updateChats} from "../../actions";
import Web3 from "web3";

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons';

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {


    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState('');
    const [userUid, setUserUid] = useState(null);
    const [accounts, setAccounts] = useState([]);

    let unsubscribe;

    // Web3
    let ethereum, web3;

    if (window.web3) {
        ethereum = window.ethereum;
        web3 = new Web3(window.web3.currentProvider);
    }

    useEffect(() => {

        if (window.web3) {
            ethereum
                .request({method: 'eth_accounts'})
                .then((accounts) => {
                    setAccounts(accounts)
                })
                .catch((error) => {
                    console.error(
                        `Error fetching accounts: ${error.message}.
       Code: ${error.code}. Data: ${error.data}`
                    );
                });
        }

    }, []);


    // ETH Transaction
    const sendETH = () => {

        if (!isNaN(amount) && !amount == '') {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: accounts[0],
                            to: chatUser.ETH_Adress,
                            value: web3.utils.toHex(web3.utils.toWei(amount))
                        },
                    ],
                })
                .then((txHash) => {
                    web3.eth.getTransactionReceipt(txHash, (e) => e)
                        .then(result => {
                            submitTransaction(txHash, web3.utils.fromWei(result.gasUsed.toString()));
                        })
                })
                .catch((error) => console.error);
        } else {
            console.log('amount is not a number')
        }
    }

    useEffect(() => {

        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe;
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    // ComponentWillUnmount
    useEffect(() => {
        return () => {
            // cleanup
            unsubscribe.then(f => f())
                .catch(error => console.log(error));
        }
    }, []);

    // initialize Chat
    const initChat = (user) => {
        setChatStarted(true);
        setChatUser(user);
        setUserUid(user.uid);

        dispatch(getRealtimeChats({uid_Sender: auth.uid, uid_Receiver: user.uid}))
    }

    // send the Message
    const submitMessage = (e) => {
        const msgObj = {
            user_uid_Sender: auth.uid,
            user_uid_Receiver: userUid,
            type: 'text',
            message
        }

        if (message !== "") {
            dispatch(updateChats(msgObj))
                .then(() => {
                    setMessage('')
                });
        }
    }

    // send Transaction
    const submitTransaction = (txHash, gasUsed) => {
        const msgObj = {
            user_uid_Sender: auth.uid,
            user_uid_Receiver: userUid,
            type: 'transaction',
            txHash: txHash,
            from: accounts[0],
            to: chatUser.ETH_Adress,
            value: amount,
            gasUsed
        }

        if (msgObj) {
            dispatch(updateChats(msgObj))
                .then(() => {
                    setAmount('')
                });
        }
    }

    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">

                    {
                        user.users.length > 0 ?
                            user.users.map(user => {
                                return (
                                    <User
                                        onClick={initChat}
                                        key={user.uid}
                                        user={user}
                                        chatUser={chatUser.username}
                                    />
                                );
                            }) : null
                    }

                </div>
                <div className="chatArea">
                    <div className="chatHeader">
                        {
                            chatStarted ?
                                <div className="ChatHeader-Profile">
                                    <div className="ProfilePic">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <span
                                        className={user.users.find(({uid}) => uid === userUid).isOnline ? `onlineStatus` : `onlineStatus off`}/>
                                    <div>
                                        <p>{chatUser.username}</p>
                                        <p style={{
                                            fontWeight: '300'
                                        }}>
                                            {
                                                user.users.find(({uid}) => uid === userUid).isOnline ?
                                                    'online'
                                                    :
                                                    returnTime(user.users.find(({uid}) => uid === userUid).lastOnline)
                                            }
                                        </p>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted ?
                                user.chats.map((chat, index) =>
                                    <Message index={index} chat={chat}/>
                                    )
                                : null
                        }
                    </div>
                    {
                        chatStarted ?
                            <div className="chatControls">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write Message"
                                />
                                <button onClick={(e) => submitMessage(e)}>
                                    Send
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                                {
                                    window.web3 !== undefined ?
                                        window.web3.currentProvider.selectedAddress ?
                                            <>
                                                <textarea
                                                    style={{
                                                        width: '15%'
                                                    }}
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Amount of ETH"
                                                />
                                                <button onClick={sendETH}>ETH</button>
                                            </>
                                            :
                                            null
                                        :
                                        null
                                }
                            </div> : null
                    }

                </div>
            </section>
        </Layout>
    );
}

export default HomePage