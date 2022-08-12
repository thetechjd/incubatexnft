import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import footlogo from '../../assets/images/foot-lgo.png'
import polygon from '../../assets/images/polgon-icon.png'
import ethlogo from '../../assets/images/eth_white.png'

const Footer = () => {

    const search = useLocation().search;
    const test = new URLSearchParams(search).get('test');


    return (
        <div>
            <footer>
                <div class="container">
                    <img src={footlogo} />
                    <p>© 2022 IncubateX</p>
                    <div class="foot-icon">
                        <a href="https://discord.gg/4ayCtuwRMp" target="blank" class="discord"><i class="fab fa-discord" aria-hidden="true"></i></a>
                        {/* <a href="https://twitter.com/IncubateX_NFT" target="blank" class="twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a> */}
                        <a href="https://www.instagram.com/incubatex_nft/" target="blank" class="instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/channel/UCyL7eRZ9CQAG3tGnfG2HM2g" target="blank" class="youtube"><i class="fab fa-youtube" aria-hidden="true"></i></a>
                        <a href="https://www.tiktok.com/@incubatex_nft" target="blank" class="tiktok"><i class="fab fa-tiktok" aria-hidden="true"></i></a>
                        <a href="https://medium.com/@IncubateX_NFT" target="blank" class="medium"><i class="fab fa-medium" aria-hidden="true"></i></a>
                    </div>
                    <div class="foot-nav">
                        <a href="/"> Home </a> | <a href="/allnews"> News </a> | <a href="/#contact"> Contact </a> | <a href="/wearehiring"> We're hiring </a> | <a href="/subscribe"> Subscribe  </a> | <a href="/termsofservices"> Terms of Use  </a> | <a href="/privacypolicy"> Privacy Policy </a>
                        <p>Powered By : <span><img src={ethlogo} /></span> Ethereum </p>
                    </div>
                </div>
            </footer>
            <div class="star-field">
                <div class="layer"></div>
                <div class="layer"></div>
                <div class="layer"></div>
            </div>
        </div>
    )
}


export default Footer;