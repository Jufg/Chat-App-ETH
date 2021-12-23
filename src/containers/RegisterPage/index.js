import React, {useState} from "react";
import '../LoginPage/style.css'
import Layout from "../../components/Layout";
import {signup} from '../../actions'
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

// FontAwesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

/**
 * @author
 * @function RegisterPage
 **/

const RegisterPage = (props) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const registerUser = (e) => {
        e.preventDefault();
        setShow(false)

        if (username === "") {
            setUsernameError(true)

            setEmailError(false)
            setPassError(false)
            return;
        } else {
            setUsernameError(false)
        }

        if (email === "") {
            setEmailError(true)

            setUsernameError(false)
            setPassError(false)
            return;
        } else {
            setEmailError(false)
        }

        if (password === "") {
            setPassError(true)

            setUsernameError(false)
            setEmailError(false)
            return;
        } else {
            setPassError(false)
        }

        const user = {
            username, email, password
        }

        dispatch(signup(user))

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

    return (
        <Layout>
            <div className="body-input">
                <div className="registerContainer">
                    <form onSubmit={registerUser}>
                        <h1 className="auth-head">Register</h1>

                        <div className="input-form">
                            <input
                                className={usernameError === true ? "login-input input-required" : "login-input"}
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <label className="login-label" htmlFor="username">Username</label>
                        </div>

                        <div className="input-form" style={{marginBottom: 0}}>
                            <input
                                className={emailError === true ? "login-input input-required" : "login-input"}
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <label className="login-label" htmlFor="email">Email Adresse</label>
                        </div>

                        <div className="input-form" style={{marginTop: 0}}>
                            <input
                                className={passError === true ? "login-input input-required" : "login-input"}
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
                            <button className="app-btn submit" type="submit">Register</button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '30px 0 5px 0'
                        }}>
                            <a className="links" href="/login">Login</a>
                        </div>
                        {error ? <div className="error-box">
                            <FontAwesomeIcon icon={faExclamationCircle} className="exclamation-icon"/>
                            <p>Username or mail already assigned!</p>
                        </div> : null}
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage