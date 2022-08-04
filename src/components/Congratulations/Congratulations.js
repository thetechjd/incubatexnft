import React, { useState, useEffect, useContext } from 'react'
import Congratulation from '../../assets/images/congrats.gif';
import Navbar from '../NavBar/Navbar.js';
//import Footer from '../Footer/Footer.js';
import { UserContext } from '../UseContext.js';
import Stickysocial from '../StickySocials/Stickysocial.js';

export default function Congratulations() {
    const { userCurrentMembership, setUserCurrentMembership } = useContext(UserContext);

    console.log("userCurrentMembership", userCurrentMembership)
    const onHomePage = () => {
        window.location.href = "/mymemberships"
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
                    <p>You have successfully minted the membership.</p>
                    <button class="infobutton" onClick={() => { onHomePage() }}><span>See Membership</span></button>
                </div>
            </section>
            {/*<Footer />*/}
        </div>
    )
}
