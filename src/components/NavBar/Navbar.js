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

const Navbar = ({ height, width }) => {

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const [getLogin, setLogin] = useState({});
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [modalIsOpen3, setIsOpen3] = React.useState(false);

    var history = useHistory();

    const ethereum = window.ethereum;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }


    const myStorage = window.localStorage;


    useEffect(async () => {
        getUserDetail(account);
        // handleWalletChange();
    }, [account]);

    const getUserDetail = async (data) => {
        if (data) {
            const docRef = doc(db, "Users", (data.toLowerCase()));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                // setUserDetails(docSnap.data())
            }
        }
    }

    const handleWalletChange = async () => {
        if (ethereum) {
            console.log("Is handle wallet change called")
            ethereum.on('accountsChanged', function (accounts) {
                console.log("accounts are", accounts)

                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('First Account', accounts[0]);
                }

                if (accounts.length > 0) {

                    console.log("What is in accounts[0]", accounts[0]);
                    var address = accounts[0]
                    console.log("address is21", address)
                    getDoc(doc(db, "Users", address)).then(docSnap => {
                        if (docSnap.exists()) {
                            console.log("Document data:", docSnap.data());
                            window.location.reload();

                        } else {
                            console.log("No such document!>>");
                            const RegisterData = {
                                address: '' + accounts[0],
                                name: '',
                                IsAdmin: false
                            };
                            CrudMethods.RegisterUser("Users", RegisterData, accounts[0]);
                            // window.location.reload()
                        }
                    })
                }
            });

        }
    }

    // Connect Wallet Method
    const handleConnectWallet = () => {
        console.log("123124234234")
        login();
    }

    const login = async () => {
        const permissions = await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {},
            }]
        });
        await activateBrowserWallet();
        // await handleWalletChange();
    }

    const metamaskErrorhandle = () => {

        history.push("/connect");


    }



    return (
        <div>
            <div class="top-ad-bar"><a href="#membership">Mint Date To Be Announced Soon! </a></div>
            <header id="header" data-aos="fade-down">
                <div class="logo">
                    <a href="/"><img src={logo} /></a>
                </div>
                <div class="mobile-menu">
                    <input type="checkbox" id="active" />
                    <label for="active" class="menu-btn"><i class="fas fa-bars"></i></label>
                    <div class="wrapper">
                        <ul>
                            <li><a href="/">HOME </a></li>
                            <li><a href="/allprojects">PROJECTS </a></li>
                            <li><a href="/#whitepaper">WHITEPAPER </a></li>
                            <li><a href="/#roadmap">ROADMAP </a></li>
                            <li><a href="/#team">TEAM </a></li>
                            <li><a href="/#membership">MEMBERSHIPS </a></li>
                            {/* <li><a href="/#faq">FAQ'S </a></li> */}
                            <li><a href="/#contact">CONTACT</a></li>

                            {/* <li><a href="/connect" class="connect-btn"><span>{account ? "DISCONNECT WALLET" : "CONNECT WALLET"}</span></a></li> */}

                            <li><a onClick={() => window.location.reload()} href="/connect" class="connect-btn"><span>{account ? "DISCONNECT WALLET" : "CONNECT WALLET"}</span></a></li>
                            {/* <li><a  href="/" class="connect-btn"><span>CONNECT WALLET</span></a></li> */}

                        </ul>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">HOME </a></li>
                        <li><a href="/allprojects">PROJECTS </a></li>
                        <li><a href="/#whitepaper">WHITEPAPER </a></li>
                        <li><a href="/#roadmap">ROADMAP </a></li>
                        <li><a href="/#team">TEAM </a></li>
                        <li><a href="/#membership">MEMBERSHIPS </a></li>
                        {/* <li><a href="/#faq">FAQ'S </a></li> */}
                        <li><a href="/#contact">CONTACT</a></li>
                        {/*<li><a href="/submitproject">SUBMIT YOUR PROJECT</a></li>*/}
                        <li><a onClick={() => window.location.reload()} href="/connect" class="connect-btn"><span>{account ? <span> {account &&
                            `${account.slice(0, 6)}...${account.slice(
                                account.length - 4,
                                account.length
                            )}`}</span> : "CONNECT WALLET"}</span></a></li>
                        {/* <li><a  href="/" class="connect-btn"><span>CONNECT WALLET</span></a></li> */}

                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;

