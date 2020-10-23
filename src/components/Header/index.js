import React from 'react';
import {NavLink, Link} from 'react-router-dom'
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

    /*const logout = () => {
        dispatch(logout())
    }*/

    return (
        <header className="header">
            <div style={{display: 'flex'}}>
                <div className="logo">Chat App</div>
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

                        < button className="app-btn logout-btn" onClick={() => {
                            dispatch(logout(auth.uid))
                        }}>Logout</button> : null
                }
            </div>
        </header>
    )
};

export default Header;