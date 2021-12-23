import React, {useEffect, useState} from "react";
import './style.css'
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInUser, signin, updateMessage} from "../../actions";
import {Redirect} from "react-router-dom";

// FontAwesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';


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
    const [error, setError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const userLogin = (e) => {
        e.preventDefault();
        setShow(false)

        if (email === "") {
            setEmailError(true)

            setPassError(false)
            return;
        }else{
            setEmailError(false)
        }

        if (password === "") {
            setPassError(true)

            setEmailError(false)
            return;
        }else {
            setPassError(false)
        }

        dispatch(signin({email, password}));

        if (!auth.authenticated) {
            setError(true)
        }
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

    return (<Layout>
        <div className="body-input">
            <div className="loginContainer">
                <form onSubmit={userLogin}>
                    <h1 className="auth-head">Login</h1>

                    <div className="input-form">
                        <input
                            className={emailError === true ? "login-input input-required" : "login-input"}
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
                            className={passError  ===  true ? "login-input input-required" : "login-input"}
                            name="password"
                            type={show ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <label className="login-label" htmlFor="password">Password</label>

                        <button id="eye-btn" type="button" onClick={showPass}>
                            {show ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
                        </button>
                    </div>

                    <div className="submit-box">
                        <button className="app-btn submit" type="submit">Login</button>
                    </div>

                    <div style={{
                        display: 'flex', justifyContent: 'center', margin: '30px 0 5px 0'
                    }}>
                        <a className="links" href="/register">Register</a>
                    </div>
                    {error ? <div className="error-box">
                        <FontAwesomeIcon icon={faExclamationCircle} className="exclamation-icon"/>
                        <p>Password or Mail is wrong!</p>
                    </div> : null}
                </form>
            </div>
        </div>
    </Layout>)
}

export default LoginPage