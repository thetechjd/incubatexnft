import React from 'react'
import Navbar from '../NavBar/Navbar.js'
import Stickysocial from '../StickySocials/Stickysocial.js'
import Congratulation from '../../assets/images/congrats.gif';
import Footer from '../Footer/Footer.js';

export default function CongratsNft() {

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
                    <p>You have successfully minted the NFT.</p>
                    <button class="infobutton" onClick={() => { onHomePage() }}><span>See Projects</span></button>
                </div>
            </section>
            <Footer />
        </div>
    )
}
