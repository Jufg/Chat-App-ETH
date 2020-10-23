import React, {useEffect, useState} from "react";
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeChats, getRealtimeUsers, updateMessage} from "../../actions";

/**
 * @author
 * @function HomePage
 **/

const User = (props) => {

    const {user, onClick} = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img
                    src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                    alt=""/>
            </div>
            <div style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                margin: '0 10px'
            }}>
                <span style={{fontWeight: 500}}>{user.username}</span>
                <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}/>
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
                                    />
                                );
                            }) : null
                    }

                </div>
                <div className="chatArea">
                    <div className="chatHeader">
                        {
                            chatStarted ? chatUser : ''

                        }
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted ?
                                user.chats.map((chat, index) =>
                                    <div style={{textAlign: chat.user_uid_Sender === auth.uid ? 'right' : 'left'}}
                                         key={index}>
                                        <p className="messageStyle">
                                            {chat.message}
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
                                <button onClick={submitMessage}>Send</button>
                            </div> : null
                    }

                </div>
            </section>
        </Layout>
    )
}

export default HomePage