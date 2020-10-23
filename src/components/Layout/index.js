import React from 'react';
import Header from "../Header";
import './style.css';
import {useSelector} from "react-redux";

/**
 * @author
 * @function Layout
 */

const Layout = (props) => {
    const auth = useSelector(state => state.auth);

    return (
        <div className="Layout">
            {
                auth.authenticated ?
                    <Header/> : null
            }
            {props.children}
        </div>
    )
};

export default Layout;