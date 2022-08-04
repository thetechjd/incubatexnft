import React from 'react'
import logopng from '../../assets/images/logo.png'
//import Footer from '../Footer/Footer.js'
import Navbar from '../NavBar/Navbar.js'
import Stickysocial from '../StickySocials/Stickysocial.js'
export default function SubmitSucess() {
    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>

            <section class="inner-pages" data-aos="fade-up">
                <div class="container success-text">
                    <img src={logopng} />

                    <p>Thank you for completing the form!<br />
                        We will reach out to you via email. Please be sure to add<br />
                        <a href="mailto:mail@incubatex.io">mail@incubatex.io</a> to your contact list.</p>
                    <span>THAT'S IT. AND SO, WE BEGIN...</span>

                </div>
            </section>
            {/*<Footer />*/}
        </div>
    )
}
