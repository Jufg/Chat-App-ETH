import React from "react";
import './style.css'
import {useSelector} from "react-redux";
import returnTime from "../../../utils/chatUtils";

/**
 * @author
 * @function User
 **/


const Message = (props) => {

    let {index, chat} = props;

    const auth = useSelector(state => state.auth);

    return (
        <div
            style={{
                alignItems: chat.user_uid_Sender === auth.uid ? 'flex-end' : 'flex-start',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            key={index}>
            <div className={chat.user_uid_Sender === auth.uid ? 'messageStyle sender' : 'messageStyle receiver'}>
                {
                    chat.type === 'transaction' ?
                        <div>
                            <p>{chat.user_uid_Sender === auth.uid ? "Send ETH:" : "Received ETH:"}</p>
                            <p>
                                TxHash:
                                <a href={"https://etherscan.io/tx/" + chat.txHash} target="_blank">
                                    {chat.txHash}
                                </a>
                            </p>
                            <p>value: {chat.value}</p>
                        </div>
                        :
                        chat.message
                }
            </div>
            <p className="message-Time">
                {returnTime(chat.createdAt)}
            </p>
        </div>
    );
}

export default Message