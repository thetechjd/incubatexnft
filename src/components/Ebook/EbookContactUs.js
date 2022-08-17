import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EbookNav from '../Ebook/EbookNav.js'
import '../Styles/style-inner.css'
import fav from '../../assets/images/fav.png'
import info from '../../assets/images/ebook-info.png'
import top from '../../assets/images/Top.png'
import build from '../../assets/images/Build.png'
import mistakes from '../../assets/images/Mistakes.png'
import content from '../../assets/images/Content.png'
import preview from '../../assets/images/Preview.png'

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
                        <div id="top" style={{ justifyContent: 'center' }}>
                            <div style={{ width: '33%', position: 'absolute', marginTop: '10%', marginLeft: '10%' }}>
                                <p style={{ fontSize: '3vw', lineHeight: '150%' }}>PLAN & EXECUTE YOUR NFT PROJECT LIKE A PRO!</p>
                                <p style={{ fontSize: '1.5vw', lineHeight: '100%' }}>If you have a good idea for an NFT project but feel lost in the space and unsure how to proceed, this free Ebook guide is for you! We will walk you step by step through the most important stages of planning & executing your project with easy to follow tips & resources!</p>
                            </div>
                            <button class="connect-btn" style={{ fontSize: '1.5vw', paddingLeft: '0.5em', paddingRight: '0.5em', color: '#fff', minWidth: '10%', minHeight: '8%', maxWidth: '15%', backgroundColor: '#693ecb', position: 'absolute', marginTop: '45%', marginLeft: '10%' }}>Download Now For Free  ▶</button>
                            <img src={top} style={{ width: '100%', backgroundColor: '#edfcfd', marginBottom: '-5px' }} />
                        </div>
                        <div id="build" style={{ justifyContent: 'center' }}>
                            <div style={{ width: '33%', position: 'absolute', marginTop: '2%', marginLeft: '55%' }}>
                                <p style={{ color: '#2e2e2d', fontSize: '3vw', lineHeight: '150%' }}>LEARN HOW TO BUILD A SUCCESSFUL NFT PROJECT IN TODAY'S MARKET!</p>
                                <p style={{ color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '150%' }}>The Structure That Successful Projects Follow</p>
                                <p style={{ color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>It can be scary to attempt to build in a brand new market in today's conditions. This guide will equip you with resources to maximize your chances of success even in a bear(ish) market!</p>
                            </div>
                            <img src={build} style={{ width: '100%', marginTop: '-5px', marginRight: '2em', backgroundColor: '#edfcfd' }} />


                        </div>
                        <div id="mistakes" style={{ justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center', width: '90%', position: 'absolute', marginTop: '5%' }}>
                                <p style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: '3.5vw', lineHeight: '150%' }}>AVOID COSTLY MISTAKES & LEARN FROM THE EXPERTS! </p>
                                <p style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: '2vw', lineHeight: '150%' }}>You Don't Need To Reinvent The Wheel! </p>
                                <p style={{ paddingLeft: '10%', paddingRight: '10%', fontSize: '2vw', lineHeight: '150%' }}>This free Ebook guide covers the main areas that most web3 creators need to address before launching if they plan to have a sold out mint. There's more to a successful launch than just putting out an art collection on the blockchain and this Ebook will guide you through what you need to do!</p>

                            </div>
                            <img src={mistakes} style={{ width: '100%', marginTop: '-5px', marginRight: '2em', backgroundColor: '#edfcfd' }} />
                        </div>

                        <div id="content" style={{ justifyContent: 'center' }}>
                            <div style={{ width: '33%', position: 'absolute', marginTop: '1%', marginLeft: '5%' }}>
                                <p style={{ color: '#2e2e2d', fontSize: '3vw', lineHeight: '150%' }}>13 steps to Launch a Successful NFT Project</p>
                                <p style={{ color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>This book introduces 13 great steps that are the foundation for having a sold-out, successful NFT mint. If you are looking to drop your NFTs for the first time or you have had several failed attempts, then this book is for you. Reading it will not only give you an edge over other creators but will also equip you with resources & tools that will help you with your launch.</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Create Project Goals & Roadmap</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Build your tokenomics</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Fund your project</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Build the Community</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Launch The Mint</p>
                                <p style={{ padding: '3px 0', color: '#2e2e2d', fontSize: '1.5vw', lineHeight: '100%' }}>✅ Post-mint tips</p>

                            </div>
                            <img src={content} style={{ width: '100%', marginTop: '-5px', marginRight: '2em', backgroundColor: '#edfcfd' }} />
                        </div>
                        <div id="preview" style={{ marginTop: '-10px' }}>
                            <img src={preview} style={{ width: '100%', marginRight: '2em', backgroundColor: '#edfcfd' }} />
                        </div>




                        <div class="form-content" id="ebook-form-content" style={{ backgroundColor: '#693ecb', width: '100%', marginTop: '1em' }}>
                            <form action="https://docs.google.com/forms/d/e/1FAIpQLSfb1rVWkz-bOF5-L7TskktbvJavMv9VtJctsGf8YHmhVLZ3ag/formResponse" method="post" target="_blank">
                                <h2>Download Your Free Ebook</h2>
                                <input type="text" id="fname" style={{ backgroundColor: '#fff' }} name="entry.1911725452" placeholder="Name*" required />
                                <input type="email" id="mail" style={{ backgroundColor: '#fff' }} name="entry.917704839" placeholder="Email*" required /><br /><br />
                                <input type="text" id="subject" style={{ backgroundColor: '#fff' }} name="entry.1261820702" placeholder="Subject" /><br /><br />
                                <textarea class="form-control form-control" style={{ backgroundColor: '#fff' }} rows="3" name="entry.62356061" placeholder="Message"></textarea>
                                <button type="submit" class="submit-contact-btn"><span>Send Message</span></button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

