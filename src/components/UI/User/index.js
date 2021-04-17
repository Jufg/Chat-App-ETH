import React from "react";
import './style.css'

// FontAwesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

/**
 * @author
 * @function User
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
                    {
                        fontWeight: 600,
                        fontSize: '15px'
                    } :
                    {
                        fontWeight: 500,
                        color: '#6f8398',
                        fontSize: '15px'
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

export default User