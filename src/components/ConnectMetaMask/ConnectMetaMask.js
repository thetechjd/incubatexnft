import React, { useEffect, useState, useRef, useContext } from 'react'
import { useEthers } from "@usedapp/core";
import InfoImgMeta from '../../assets/images/metamask.gif';
import Navbar from '../NavBar/Navbar.js';
//import Footer from '../Footer/Footer'
import Modal from 'react-modal';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Web3 from 'web3';
import { UserContext } from '../UseContext.js';
import '../Styles/style-front.css'
import lInfo from '../../assets/images/loading-error.gif'
import Stickysocial from '../StickySocials/Stickysocial.js';

const contractABI = require("../utils/contract-abi.json");
const netwokUrl = 'https://eth-mainnet.g.alchemy.com/v2/gOkgumMo6bV2fWBI5ih89uP7KW99oXye'

export default function ConnectMetaMask() {
    const ethereum = window.ethereum;
    const [admin, setAdmin] = useState(false)
    const { userCurrentMembership, setUserCurrentMembership } = useContext(UserContext);
    let history = useHistory();

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const [modalIsOpen3, setIsOpen3] = React.useState(false);
    const [userBalance, setUserBalance] = useState("");
    const [userNFTs, setUserNFTs] = useState([]);
    const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
    const [userMembershipArray, setUserMembershipArray] = useState([]);
    const [userMembershipArraytemp, setUserMembershipArraytemp] = useState([]);
    const [sale, setSale] = useState(false)

    const [userNFTs111, setUserNFTs111] = useState([]);
    const [userMembership, setUsermembership] = useState("")
    const [network, setNetwork] = useState(true)

    const contractAddress = '0x41458d0A88711F80fE306737864BDDe1f8e19174';
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
    const [value, setValue] = useState();
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;



    useEffect(async () => {
        { ethereum && ethereum.isMetaMask ? ChainId() : null }
        { ethereum && ethereum.isMetaMask ? onNetworkChange() : null }
        checkSaleOnOff()
    }, []);

    const switchNetwork = async () => {
        var chainId = 4
        const web3 = new Web3(Web3.givenProvider || network)
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(chainId) }], // chainId must be in hexadecimal numbers
        });
        window.location.reload()
    }

    const ChainId = async () => {
        const web3 = new Web3(Web3.givenProvider || network)
        const chainid = await new web3.eth.getChainId()
        console.log("chain is", chainid)
        if (chainid == 1) {
            setNetwork(true)
        }
        else {
            setNetwork(false)
        }

    }

    const onNetworkChange = () => {
        ethereum.on('chainChanged', (chainId) => {
            if (chainId == 0x89) {
                window.location.reload()
            }
            else {
                window.location.reload()
                setNetwork(false)
            }
        });
    }


    useEffect(() => {

        if (reloadCount < 1) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);

    useEffect(() => {
        if (account) {
            getUserDetails()
            getBalance();
            handleWalletChange();
            //checkCurrentMembership()
            checkSaleOnOff()
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            getUserDetails()
            checkSaleOnOff()
        }
    }, [admin]);

    useEffect(() => {
        if (account) {
            getUserDetails()
            checkSaleOnOff()
        }
    }, []);

    const GetNft = async (value1, value2, value3) => {
        var mintedPlatinumTokens = value1;
        var mintedGoldTokens = value2;
        var mintedBronzeTokens = value3

        var userWalletAddress = window.localStorage.getItem("walletAddress");
        var i;
        var data = [];
        await axios.get("https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + contractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
            .then(async (response) => {
                data = response.data.result
                if (data.length == 0) {
                    //   setloading(false)
                    setUserNFTs([])
                    setListOfNFTtemp([])
                }
                let tokenID = [];
                for (i = 0; i < data.length; i++) {
                    const web3 = new Web3(netwokUrl);
                    const daiToken = new web3.eth.Contract(contractABI, contractAddress);
                    var tokendata = data[i].tokenID
                    var timestampValue = data[i].timeStamp

                    await daiToken.methods.ownerOf(tokendata).call().then(async (data) => {

                        var data = JSON.stringify(data);
                        var addrss = JSON.stringify(userWalletAddress);
                        var accontAdd = data.toLowerCase()
                        var wallAdd = addrss.toLowerCase()
                        if (accontAdd == wallAdd) {
                            var userArrayLength = userNFTs.length

                            if (mintedPlatinumTokens.includes(tokendata)) {
                                var obj = {
                                    "tokenid": tokendata,
                                    "name": "NFT" + tokendata,
                                }
                                if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
                                    userNFTs.push(obj);
                                    listOfNFTtemp.push(obj)
                                    userNFTs[userArrayLength]["membership"] = "platinum";
                                    setUserNFTs111([...userNFTs, obj]);
                                }

                            }
                            else if (mintedGoldTokens.includes(tokendata)) {
                                var obj = {
                                    "tokenid": tokendata,
                                    "name": "NFT" + tokendata,
                                }
                                if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
                                    userNFTs.push(obj);
                                    listOfNFTtemp.push(obj)
                                    userNFTs[userArrayLength]["membership"] = "gold";
                                    setUserNFTs111([...userNFTs, obj]);
                                }

                            }
                            else if (mintedBronzeTokens.includes(tokendata)) {
                                var obj = {
                                    "tokenid": tokendata,
                                    "name": "NFT" + tokendata,
                                }
                                if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
                                    userNFTs.push(obj);
                                    listOfNFTtemp.push(obj)
                                    userNFTs[userArrayLength]["membership"] = "bronze";
                                    setUserNFTs111([...userNFTs, obj]);
                                }

                            }
                            CurrentMembership()

                        }
                    }).catch((error) => {
                        console.log("error ownerof ============ ", error)
                    });
                }

            }).catch((error) => {
                console.log("Error in GetNFT Api---->", error)
            })
    }

    const CurrentMembership = async () => {
        var nftdata = userNFTs;
        if (nftdata == [] || nftdata == "") {
            setUsermembership("You dont have any membership currently");
        }
        else {
            for (var j = 0; j < nftdata.length; j++) {
                var getmembership = nftdata[j].membership
                var obj = {
                    "tokenid": nftdata[j].tokenid,
                    "membership": getmembership,
                }

                if (userMembershipArray.filter(x => x.membership === obj.membership).length === 0) {
                    userMembershipArray.push(obj);
                    userMembershipArraytemp.push(obj)
                    setUserMembershipArraytemp([...userNFTs, obj]);
                }
            }
        }

    }
    /** 
        const checkCurrentMembership = async () => {
            var result1;
            var result2;
            var result3;
            const web3 = new Web3("https://rinkeby.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
            const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
            //await daiToken.methods.getMintedPlatinumTokens().call().then((data1) => {
    
                result1 = data1
            }).catch((error) => {
                console.log("Error in GetNFT Api---->", error)
            })
    
            //await daiToken.methods.getMintedGoldTokens().call().then((data2) => {
    
           //     result2 = data2
          //  }).catch((error) => {
           //     console.log("Error in GetNFT Api---->", error)
          //  })
            //await daiToken.methods.getMintedBronzeTokens().call().then((data3) => {
    
           //     result3 = data3
          //  }).catch((error) => {
           //     console.log("Error in GetNFT Api---->", error)
           // })
    
    
          //  GetNft(result1, result2, result3)
    
    
        }*/

    const getUserDetails = async () => {
        var address = account.toLowerCase();
        const docRef = doc(db, "Users", address);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            var userDetails = docSnap.data();
            var checkadmin = userDetails.IsAdmin
            if (checkadmin == true) {
                setAdmin(true);
            }
            else if (checkadmin == false) {
                setAdmin(false);
            }
            else {
                console.log("Admin in  section", admin)

            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    function openModal3(value) {
        setIsOpen3(true);

    }

    function afterOpenModal3() {
    }

    function closeModal3() {
        setIsOpen3(false);
    }


    const getBalance = async () => {
        var userWalletAddress = window.localStorage.getItem("walletAddress");
        var i;
        var data = [];
        await axios.get("https://api.etherscan.io/api?module=account&action=balance&address=" + userWalletAddress + "&tag=latest&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3")
            .then(async (response) => {
                data = response.data.result
                var balance = data / 1000000000000000000;
                var balanceFixed = balance.toFixed(2)
                setUserBalance(balanceFixed);
            }).catch((error) => {
                console.log("Error in GetNFT Api---->", error)
            })
    }

    const handleWalletChange = async () => {
        if (ethereum) {
            ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length > 0) {
                    var address = accounts[0]
                    getDoc(doc(db, "Users", address)).then(async (docSnap) => {
                        if (docSnap.exists()) {
                            window.location.reload();

                        } else {
                            var id = Date.now();
                            const washingtonRef = doc(db, "Users", accounts[0]);
                            const RegisterData = {
                                memberId: id,
                                address: '' + accounts[0],
                                name: '',
                                IsAdmin: false,
                                balance: '',
                                membership: '',
                                allocations: ''
                            };
                            const aaa = await setDoc(washingtonRef, RegisterData);
                            window.location.reload()
                        }
                    })
                }
            });

        }
    }

    // Connect Wallet Method
    const handleConnectWallet = () => {
        login();
    }
    const switchtoAdmin = () => {
        history.push('/admin/projects')
    }

    const login = async () => {
        const permissions = await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {},
            }]
        });
        await activateBrowserWallet();
        await handleWalletChange();
    }

    const checkSaleOnOff = async () => {
        const docRef = doc(db, "mintEnable", "mintEnable");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            console.log("mint data", data.mintEnable)
            var saleStatus = data.mintEnable
            setSale(saleStatus);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    const turnOnOffMinting = async () => {
        const washingtonRef = doc(db, "mintEnable", "mintEnable");
        if (sale) {
            var detail = {
                mintEnable: false
            }
            const aaa = await updateDoc(washingtonRef, detail);
            window.location.reload()
        }
        else {
            var detail = {
                mintEnable: true
            }
            const aaa = await updateDoc(washingtonRef, detail);
            window.location.reload()

        }
    }

    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            <section class="inner-section" data-aos="fade-up">
                {network ?
                    <div class="container inner-middle">
                        <img src={InfoImgMeta} />
                        {account ?

                            <div class="connect-info"><h2>Metamask Connected!</h2>
                                <p>You Can Disconnect MetaMask.</p>
                                <div onClick={() => { deactivate(); }}>
                                    <button class="infobutton"><span>Disconnect</span></button>
                                </div>
                            </div>
                            :
                            {
                                ...ethereum && ethereum.isMetaMask ?
                                    <div>
                                        <h2>Connect Metamask!</h2>
                                        <p>Please Connect MetaMask First.</p>
                                        <div onClick={() => { handleConnectWallet() }}>
                                            <button class="infobutton"><span>Connect</span></button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <h2>Install Metamask!</h2>
                                        <p>Please Install MetaMask First.</p>
                                    </div>
                            }
                        }
                        {account ? <div>{userBalance ? <h4>Current Balance : <span>{userBalance} ETH</span></h4> : null}</div> : null}
                        {account ?
                            <div>
                                <div>
                                    <a href="/#membership" class="my-membership">MINT MEMBERSHIP </a>
                                </div>
                                <div>
                                    <a href="/mymemberships" class="my-membership">MY MEMBERSHIPS </a>
                                </div>
                            </div>
                            : null}
                        {admin && account ?
                            <div>
                                <button class="infobutton" onClick={() => { turnOnOffMinting() }}><span>{sale ? "Turn OFF Minting" : "Turn ON Minting"}</span></button>

                                <button class="infobutton" onClick={() => { switchtoAdmin() }}><span>Switch to Admin</span></button>
                            </div>
                            : null}

                    </div> :

                    <div class="container inner-middle">
                        <img class="infoImg" src={lInfo} />
                        <h2>Wrong Network!</h2>
                        <p>Please change it to Ethereum Network! to Connect</p>
                        <button class="infobutton" onClick={() => { switchNetwork() }}><span>Switch Network</span></button>
                    </div>}

            </section>
            {/*<Footer />*/}
        </div>
    )
}
