import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar.js';
import '../Styles/style-inner.css';
import axios from 'axios';
import Footer from '../Footer/Footer.js';
import Stickysocial from '../StickySocials/Stickysocial.js';
export default function SubmitProject() {

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
                <div class="container submit-project">

                    <h6>We are glad you are interested in joining us.</h6>
                    <form action="https://docs.google.com/forms/d/e/1FAIpQLSdSSUshNlrGkv4KNq3q-h7cn0ChGjkweMaJ7-1ECx96viwdvQ/formResponse" method="post" target="_blank">
                        <input type="text" name="entry.272185550" placeholder="project name*" required />
                        <input type="text" name="entry.30661209" placeholder="your name*" required />
                        <input type="email" name="entry.140900808" placeholder="contact email*" required />
                        <input type="text" name="entry.860092091" placeholder="what is your project about?*" required />
                        <input type="text" name="entry.519032733" placeholder="how much in USD are you planning to raise?*" required />
                        <input type="text" name="entry.628484530" placeholder="project website" />
                        <input type="text" name="entry.524442606" placeholder="twitter account" />
                        <button type="submit" class="submit-project-btn" ><span>Submit</span></button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}
