import React, {useEffect, useState} from "react";
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInUser, signin, updateMessage} from "../../actions";
import {Redirect} from "react-router-dom";

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


/**
 * @author
 * @function LoginPage
 **/

const LoginPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [show, setShow] = useState(false);

    const userLogin = (e) => {
        e.preventDefault();
        setShow(false)

        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password === "") {
            alert("Password is required")
            return;
        }

        dispatch(signin({email, password}));

    }

    if (auth.authenticated) {
        return <Redirect to={`/`}/>
    }

    const showPass = (e) => {
        if (show === false) {
            setShow(true)
        } else if (show === true) {
            setShow(false);
        }
    }

    return (
        <Layout>
            <div className="body-input">
                <div className="loginContainer">
                    <form onSubmit={userLogin}>
                        <h1 className="auth-head">Login</h1>

                        <div className="input-form">
                            <input
                                className="login-input"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <label className="login-label" htmlFor="email">Email Adress</label>
                        </div>

                        <div className="input-form">
                            <input
                                className="login-input"
                                name="password"
                                type={show ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <label className="login-label" htmlFor="password">Password</label>

                            <button id="eye-btn" type="button" onClick={showPass}>
                                {
                                    show ?
                                        <FontAwesomeIcon icon={faEye}/>
                                        :
                                        <FontAwesomeIcon icon={faEyeSlash}/>
                                }
                            </button>
                        </div>

                        <div className="submit-box">
                            <button className="app-btn settings" type="submit">Login</button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '30px 0 5px 0'
                        }}>
                            <a className="links" href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LoginPage