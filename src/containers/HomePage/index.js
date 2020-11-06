import React, {useEffect, useState} from "react";
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeChats, getRealtimeUsers, updateMessage} from "../../actions";

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons';

/**
 * @author
 * @function HomePage
 **/

const User = (props) => {

    let {user, onClick, chatUser} = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayProfilePic">
                <FontAwesomeIcon icon={faUser}/>
            </div>
            <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}/>
            <div style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                margin: '0 10px'
            }}>
                <span style={chatUser === user.username ?
                    {fontWeight: 800} :
                    {
                        fontWeight: 500,
                        color: '#6b8095'
                    }
                }
                      className="username"
                >
                    {user.username}
                </span>
            </div>
        </div>
    );
}

const HomePage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);

    let unsubscribe;

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
        setChatUser(user.username);
        setUserUid(user.uid);

        //console.log(user);

        dispatch(getRealtimeChats({uid_Sender: auth.uid, uid_Receiver: user.uid}))
    }

    // send the Message
    const submitMessage = (e) => {
        const msgObj = {
            user_uid_Sender: auth.uid,
            user_uid_Receiver: userUid,
            message
        }

        if (message !== "") {
            dispatch(updateMessage(msgObj))
                .then(() => {
                    setMessage('')
                });
        }

        //console.log(msgObj);
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
                                        chatUser={chatUser}
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
                                        <p>{chatUser}</p>
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
                                    <div style={{
                                        alignItems: chat.user_uid_Sender === auth.uid ? 'flex-end' : 'flex-start',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                         key={index}>
                                        <p className={chat.user_uid_Sender === auth.uid ? 'messageStyle sender' : 'messageStyle receiver'}>
                                            {chat.message}
                                        </p>
                                        <p className="message-Time">
                                            {returnTime(chat.createdAt)}
                                        </p>
                                    </div>)
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
                                <button onClick={submitMessage}>Send <FontAwesomeIcon icon={faPaperPlane}/></button>
                            </div> : null
                    }

                </div>
            </section>
        </Layout>
    );

    // Timestamp to TimeString
    function returnTime(pTimeStamp) {
        let difference = Date.now() - pTimeStamp.toDate();

        let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24

        let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60

        let minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60

        let secondsDifference = Math.floor(difference / 1000);

        if (new Date().getDay() === pTimeStamp.toDate().getDay()) {
            if (hoursDifference > 0) {
                return pTimeStamp.toDate().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else if (minutesDifference > 0) {
                return `${minutesDifference} min ago`;
            } else if (secondsDifference > -1) {
                return `${secondsDifference} sec ago`;
            }
        } else {
            if (new Date().getFullYear() === pTimeStamp.toDate().getFullYear()) {
                return pTimeStamp.toDate().toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                });
            } else {
                return pTimeStamp.toDate().toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                });
            }
        }

    }
}

export default HomePage