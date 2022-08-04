import React, { useState, useEffect, useContext } from 'react'
import Congratulation from '../../assets/images/congrats.gif';
import Navbar from '../NavBar/Navbar.js';
//import Footer from '../Footer/Footer.js';
import { UserContext } from '../UseContext.js';
import Stickysocial from '../StickySocials/Stickysocial.js';

export default function CongratsWl() {
    const { userCurrentMembership, setUserCurrentMembership } = useContext(UserContext);

    console.log("userCurrentMembership", userCurrentMembership)
    const onHomePage = () => {
        window.location.href = "/incubatex/allprojects"
    }
    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            <section class="inner-section">
                <div class="container inner-middle">
                    <img src={Congratulation} />
                    <h2>Congratulations!!</h2>
                    <p>You have become White List Member</p>
                    <button class="infobutton" onClick={() => { onHomePage() }}><span>See Projects</span></button>
                </div>
            </section>
            {/*<Footer />*/}
        </div>
    )
}
