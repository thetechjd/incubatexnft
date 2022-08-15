import React from 'react'
import '../Styles/style-front.css';
import whitebanner from '../../assets/images/white-banner.png';
import whitepaper from '../../assets/images/whitepaper_new.pdf';


export default function WhitePaper() {
    return (
        <div>
            <section class="whitepaper-section" id="whitepaper" data-aos="fade-up">
                <div class="container">
                    <h3>WHITEPAPER</h3>
                    <div class="whitepaper-img">
                        <img src={whitebanner} />
                        <button class="download-btn"><a href={whitepaper} target="_blank"><span>View Whitepaper</span></a></button>
                    </div>
                </div>
            </section>
        </div>
    )
}
