import React, { useState, useEffect, useContext, useReducer } from 'react';
import '../Styles/style-front.css';
import { useEthers } from "@usedapp/core";
import { Link, NavLink, useLocation } from 'react-router-dom';
import CrudMethods from '../../config/CrudMethods';
import Web3 from 'web3';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import logo from '../../assets/images/logo.png'
import lInfo from '../../assets/images/loading-error.gif'
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";


const EbookNav = ({ height, width }) => {


    return (
        <div>

            <header id="header" data-aos="fade-down" style={{ backgroundColor: '#693ecb', position: 'relative', margin: '0 0 0 0' }}>
                <div class="logo">
                    <a href="/"><img src={logo} /></a>
                </div>
                <div class="mobile-menu">
                    <input type="checkbox" id="active" />
                    <label for="active" class="menu-btn"><i class="fas fa-bars"></i></label>
                    <div class="wrapper">
                        <ul>
                            <li><a href="/">HOME </a></li>
                            <li><a href="/ebook">TOP </a></li>
                            <li><a href="#build">BUILD </a></li>
                            <li><a href="#mistakes">MISTAKES</a></li>
                            <li><a href="#content">CONTENT </a></li>
                            <li><a href="#preview">PREVIEW </a></li>

                            <li><a href="#ebook" style={{ color: '#fff', textDecoration: 'none' }} class="connect-btn">Download</a> </li>



                            {/* <li><a href="/connect" class="connect-btn"><span>{account ? "DISCONNECT WALLET" : "CONNECT WALLET"}</span></a></li> */}


                            {/* <li><a  href="/" class="connect-btn"><span>CONNECT WALLET</span></a></li> */}

                        </ul>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">HOME </a></li>
                        <li><a href="/ebook">TOP </a></li>
                        <li><a href="#build">BUILD </a></li>
                        <li><a href="#mistakes">MISTAKES</a></li>
                        <li><a href="#content">CONTENT </a></li>
                        <li><a href="#preview">PREVIEW </a></li>

                        <li><button class="ebook-download" style={{ color: '#000', padding: '0.5em 1em 0.5em 1em', borderRadius: '3em', borderColor: '#fff', borderStyle: 'none', backgroundColor: '#fff' }}><a style={{ color: '#000', textDecoration: 'none' }} href="#ebook"><span>Download </span></a> </button> </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default EbookNav;
