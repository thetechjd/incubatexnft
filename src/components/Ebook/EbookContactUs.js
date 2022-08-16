import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EbookNav from '../Ebook/EbookNav.js'
import '../Styles/style-inner.css'
import fav from '../../assets/images/fav.png'
import info from '../../assets/images/ebook-info.png'
import banner from '../../assets/images/ebook-banner3.png'
export default function ContactUs() {

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [userSubject, setUserSubject] = useState("")
    const [userMessage, setUserMessage] = useState("")

    return (
        <>
            <EbookNav />
            <div>
                <section class="contact-section" id="contact" data-aos="fade-up" style={{ backgroundColor: '#693ecb' }}>
                    <div class="container" style={{ backgroundColor: '#693ecb' }}>
                        <div style={{ justifyContent: 'center' }}>
                            <button class="ebook-download" style={{ color: '#fff', width: '25%', height: '12%', borderRadius: '3em', backgroundColor: '#693ecb', position: 'absolute', marginTop: '33%', marginLeft: '12%' }}>Download Now For Free  ▶</button>
                            <img src={banner} style={{ width: '100%', backgroundColor: '#edfcfd', marginBottom: '-5px' }} />
                        </div>
                        <img src={info} style={{ width: '100%', marginTop: '-5px', marginRight: '2em', backgroundColor: '#edfcfd' }} />
                        <div>
                            <img src={fav} id="ebook-footer-icon" style={{ width: '30%', marginLeft: '2em', padding: '1em', marginTop: '1em' }} />
                        </div>



                        <div class="form-content" id="ebook-form-content" style={{ backgroundColor: '#693ecb', marginTop: '1em', marginRight: '1em' }}>
                            <form action="https://docs.google.com/forms/d/e/1FAIpQLSfb1rVWkz-bOF5-L7TskktbvJavMv9VtJctsGf8YHmhVLZ3ag/formResponse" method="post" target="_blank">
                                <h2>Download Your Free Ebook</h2>
                                <input type="text" id="fname" style={{ width: '40%', backgroundColor: '#fff' }} name="entry.1911725452" placeholder="Name*" required />
                                <input type="email" id="mail" style={{ backgroundColor: '#fff', marginLeft: '1px', width: '45%' }} name="entry.917704839" placeholder="Email*" required /><br /><br />
                                <input type="text" id="subject" style={{ backgroundColor: '#fff', width: '93%' }} name="entry.1261820702" placeholder="Subject" /><br /><br />
                                <textarea class="form-control form-control" style={{ backgroundColor: '#fff', width: '93%' }} rows="3" name="entry.62356061" placeholder="Message"></textarea>
                                <button type="submit" class="submit-contact-btn"><span>Send Message</span></button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

