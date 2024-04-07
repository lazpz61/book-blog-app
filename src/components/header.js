import React from "react";
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import Cookies from "js-cookie"

import logo from "../../static/assets/images/mo_books_laz_problems.png"

function header(props) {
    const handleLogout = () => {
        Cookies.remove("username")
        props.history.push("/")
    }

    return (
        <div className="header-wrapper">
            <div className="left-column">
                <Link to="/">
                <img src={logo} alt="" />
                </Link>
               
            </div>
            <div className="welcome-logout">
                {Cookies.get("username") 
                ? <div className="right-column">
                    <span className="span-Name">Welcome,&nbsp;{Cookies.get("username").toUpperCase() }</span>
                    <span onClick={handleLogout} className="span-logout">Log&nbsp;out</span>

                </div>  
                : <div className="right-column">
                    <Link to="/signup" className="header-signup">Signup</Link>
                    <Link to="/login" className="header-login">Login</Link>
                </div>
            }
            </div>

        </div>
    )
}

export default withRouter(header);