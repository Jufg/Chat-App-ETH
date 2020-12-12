import React, {useState} from "react";
import '../LoginPage/style.css'
import Layout from "../../components/Layout";
import {signup} from '../../actions'
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

// FontAwesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

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

    const registerUser = (e) => {
        e.preventDefault();
        setShow(false)

        const user = {
            username, email, password
        }

        dispatch(signup(user))
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
                                className="login-input"
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
                                className="login-input"
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
                            <button className="app-btn submit" type="submit">Register</button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '30px 0 5px 0'
                        }}>
                            <a className="links" href="/login">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage