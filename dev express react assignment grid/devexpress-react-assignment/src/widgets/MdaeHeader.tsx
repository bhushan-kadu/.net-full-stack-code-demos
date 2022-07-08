import React from 'react';
import { MdaeButton } from './MdaeButton';
import logo from './logo.png';
import { Link } from 'react-router-dom';

export const MdaeHeader = () => {
    return (
        <header>
            <div><img src={logo} alt="logo" id="imgLogo" /> </div>
            <div id="pnlHead">
                <div style={{ margin: "0.8em 1em 1.5em 0", display: "flex" }}>Welcome
                <div style={{ marginLeft: "1em" }}> OFFICEBOX SUPPORT</div>
                </div>
                <div className="navigation-ui">
                    <div><Link to="/home" className="head-links">CONTACTS</Link></div>
                    <div><Link to="countries" className="head-links">COUNTRY</Link></div>
                    <div><Link to="states" className="head-links">STATES</Link></div>
                    <div><a href="#" className="head-links">COMPANY1</a></div>
                    <div><a href="#" className="head-links">DEFAULT REGION</a></div>
                    <div><a href="#" className="head-links">DEFAULT BRANCH</a></div>
                    <div><a href="#" className="head-links">UNIT 1</a></div>
                    <div><a href="#" className="head-links">FY2019-2020</a></div>
                </div>
            </div>
            <div style={{ margin: "0.3em 0.3em 0 0" }}>
                <MdaeButton id="btnHeaderHelp" text="Help" />
                <MdaeButton id="btnHeaderHome" text="Home" />
                <MdaeButton id="btnHeaderLogout" text="Logout" />
            </div>

        </header >
    )
}