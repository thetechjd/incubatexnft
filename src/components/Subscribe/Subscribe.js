import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar.js';
import '../Styles/style-inner.css';
import axios from 'axios';
//import Footer from '../Footer/Footer.js';
import Stickysocial from '../StickySocials/Stickysocial.js';
export default function Subscribe() {

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [projectName, setProjectName] = useState("")
    const [projectAbout, setProjectAbout] = useState("")
    const [projectRaiseAmount, setProjectRaiseAmount] = useState("")
    const [projectWebsite, setProjectWebsite] = useState("")
    const [projectTwitterAcc, setProjectTwitterAcc] = useState("")


    const gotoSubmitSucess = () => {
        window.location.href = "/incubatex/submitsucess";

    }
    const submitForm = () => {

        // var data = '{"personalizations": [{"to": [{"email": "roopal@vibhuti.biz"}]}],\n"from": {"email": "shailja@vibhuti.biz","name":"Incubatex"},\n"subject": "Sending with SendGrid is Fun",\n"content": [{"type": "text/plain", "value": "Thanks for contacting us.Our support will reach you soon"}]}';
        var data = {
            "personalizations": [{ "to": [{ "email": "roopal@vibhuti.biz", "name": "Admin" }] }],
            "from": { "email": "shailja@vibhuti.biz", "name": userName },
            "subject": "Project Details",
            "content": [{
                "type": "text/plain",
                "value": userName + " would like to submit Project" + "\n" + "Email:" + userEmail + "\n" + "Project Name:" + projectName + "\n" + "About Project:" + projectAbout + "\n" +
                    "Project Website" + projectWebsite + "\n" + "Twitter Account:" + projectTwitterAcc + "\n" + "Amount Planned to Raise:" + projectRaiseAmount

            }]
        }
        var config = {
            method: 'post',
            url: 'https://tranquil-garden-15529.herokuapp.com/https://api.sendgrid.com/v3/mail/send',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': ' application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                console.log(JSON.stringify(response.data));
                gotoSubmitSucess();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            <section class="inner-pages" data-aos="fade-up">


                <div class="container">
                    <h3>SUBSCRIBE</h3>
                    <div class="form-content">
                        <div>
                            <div id="mc_embed_signup">
                                <form action="https://docs.google.com/forms/d/e/1FAIpQLSe5ceK8nVHr5cniolcrj5hd9G0_orBHoicM6mq5G3wxJmvCvQ/formResponse" method="post" target="_blank">
                                    <div id="mc_embed_signup_scroll">
                                        <div class="mc-field-group">
                                            <input type="email" name="entry.78566672" required class="required email" id="mce-EMAIL" placeholder="Email Address*" />
                                            <input type="text" name="entry.592093501" required class="required" id="mce-MMERGE1" placeholder="Name*" />
                                        </div>
                                        <button type="submit" class="submit-contact-btn" ta><span>Subscribe</span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
            {/*<Footer />*/}
        </div>
    )
}
