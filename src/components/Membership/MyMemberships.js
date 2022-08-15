import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer.js'
import Navbar from '../NavBar/Navbar.js'
import { useEthers } from "@usedapp/core";
import Web3 from 'web3';
import axios from "axios";
import Modal from 'react-modal';
import Stickysocial from '../StickySocials/Stickysocial.js';
import genesisVid from '../../assets/images/genesis.mp4';
import metaVid from '../../assets/images/meta.mp4';

const contractABI = require("../utils/contract-abi.json");

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

const contractAddress = '0x538289E0497b3a87515A0cB35dD10442D4477038'
var netwokUrl = 'https://eth-rinkeby.alchemyapi.io/v2/deSJ7VyGLswml7dz5tzzNbHBeYu_R_S1'
//var netwokUrl = 'https://eth-mainnet.g.alchemy.com/v2/gOkgumMo6bV2fWBI5ih89uP7KW99oXye'

// var netwokUrl= 'https://polygon-mainnet.g.alchemy.com/v2/SVdVVUkdUK6uFUDAMxRVe6n3epdLaZqD'

export default function MyMemberships() {
    const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
    const [listOfNFT, setListOfNFT] = useState([]);
    const { activateBrowserWallet, account, deactivate } = useEthers();
    const [searchKey, setSearchKey] = useState('');
    var [metaData1, setMetaData1] = useState([]);
    const [show, setShow] = useState(false);
    const [tokenId, setTokenId] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [userNFTs, setUserNFTs] = useState([]);
    const [userNFTs111, setUserNFTs111] = useState([]);
    const [ggArray, setggArray] = useState([]);
    const [ggArrayTemp, setggArrayTemp] = useState([]);
    const [loading, setloading] = useState(true);
    const [transfertoAddress, setTransfertoAddress] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [genesisCount, setGenesisCount] = useState(0);
    const [metaCapsuleCount, setMetaCapsuleCount] = useState(0);

    const ethereum = window.ethereum;

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [transferTokenId, setTransferTokenId] = useState(0)

    function openModal(value) {
        setTransferTokenId(value)
        setIsOpen(true);

    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    useEffect(async () => {
        const web3 = new Web3(Web3.givenProvider)
        console.log("url is", "https://tranquil-garden-15529.herokuapp.com/")
        console.log("we3 is", web3);
        // const chainid=await new web3.eth.net.getId()
        const chainid = await new web3.eth.getChainId()
        console.log("Chain ID====", chainid)
        //replace this!
        if (chainid == 4) {
            setTimeout(
                () => {
                    if (ethereum && ethereum.isMetaMask) {
                        ChainId()
                    }
                    else {
                        setloading(false)
                    }

                },
                5000
            );
        }
        else {
            setloading(false)
        }

    }, []);

    useEffect(() => {
        var userWalletAddress = window.localStorage.getItem("walletAddress");
        console.log("userWalletAddress in MyNFT.js", userWalletAddress)
        setUserAddress(userWalletAddress);
        GetNft();
    }, [account]);


    const ChainId = async () => {
        const web3 = new Web3(Web3.givenProvider)
        console.log("url is", "https://tranquil-garden-15529.herokuapp.com/")
        console.log("we3 is", web3);
        // const chainid=await new web3.eth.net.getId()
        const chainid = await new web3.eth.getChainId()
        console.log("Chain ID====", chainid)

        //replace this!
        if (chainid == 4) {
            await GetNft()

            setloading(false);
        }
        else {
            setloading(false);
        }

    }

    const GetNft = async () => {
        const userWalletAddress = window.localStorage.getItem("walletAddress");

        const web3 = new Web3(netwokUrl);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const genesisCount = await contract.methods.balanceOf(userWalletAddress, 1).call();
        const metaCapsuleCount = await contract.methods.balanceOf(userWalletAddress, 2).call();
        setGenesisCount(genesisCount);
        setMetaCapsuleCount(metaCapsuleCount);
    }




    /** 
        const GetNft = async () => {
            console.log("account in GetNft", account);
            var userWalletAddress = window.localStorage.getItem("walletAddress");
            console.log("userWalletAddress12121", userWalletAddress.toLowerCase())
            // var userWalletAddress='0x89a71403c34f3e08c7762b09c13feda83bf03ee5'
            console.log("userWalletAddress in MyNFT.js", userWalletAddress)
            var convertedAddress = userWalletAddress.toLowerCase();
            var i;
            var data = [];
            await axios.get("https://api-rinkeby.etherscan.com/api?module=account&action=tokennfttx&contractaddress=0x21121bf94a6187bc318665d7ea0bf26ba2f309f1" + "&address=" + convertedAddress + "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3")
            .then(async (response) => {
                data = response.data.result
                console.log("data Array---->>", data)
                let tokenID = [];
                for (i = 0; i < data.length; i++) {
                    const web3 = new Web3(netwokUrl);
                    const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
                    var tokendata = data[i].tokenID
                    const genesisCount = await daiToken.methods.balanceOf(userWalletAddress, 1 ).call();
                    const metacapsuleCount = await daiToken.methods.balanceOf(userWalletAddress, 2 ).call();
                }
                });
                */

    /** 
            // console.log(">>", "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0xB793f891426D5fc9e883c2c8c14F5C8cc991e4a6&address=0x89a71403c34f3e08c7762b09c13feda83bf03ee5&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=5J93WMJM2KDX48KHXM4QCU17Y5EH5QST5K")
            console.log("4567", "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0xB793f891426D5fc9e883c2c8c14F5C8cc991e4a6" + "&address=" + convertedAddress + "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=5J93WMJM2KDX48KHXM4QCU17Y5EH5QST5K")
            // await axios.get("https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=5J93WMJM2KDX48KHXM4QCU17Y5EH5QST5K" + "&address=" + userWalletAddress)
            await axios.get("https://api-rinkeby.etherscan.com/api?module=account&action=tokennfttx&contractaddress=0x21121bf94a6187bc318665d7ea0bf26ba2f309f1" + "&address=" + convertedAddress + "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3")
                .then(async (response) => {
                    data = response.data.result
                    console.log("data Array---->>", data)
                    let tokenID = [];
                    for (i = 0; i < data.length; i++) {
                        const web3 = new Web3(netwokUrl);
                        const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
                        var tokendata = data[i].tokenID
                        await daiToken.methods.balanceOf([userWalletAddress],1).call().then((data) => {
                            console.log("data---->", JSON.stringify(data))
                            console.log("userWalletAddress---->", JSON.stringify(userWalletAddress));
                            var data = JSON.stringify(data);
                            var addrss = JSON.stringify(userWalletAddress);
                            var accontAdd = data.toLowerCase()
                            var wallAdd = addrss.toLowerCase()
                            if (accontAdd == wallAdd) {
                                GetUrl(tokendata);
                            }
                            else {
                                console.log("in else")
                            }
                        }).catch((error) => {
    
                            console.log("error ============ ", error)
                        });
                    }
    
                }).catch((error) => {
                    console.log("Error in GetNFT Api---->", error)
                })
        }*/

    /** 

const GetUrl = (tokenId) => {
    const web3 = new Web3(netwokUrl);
    const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
    const myMethod = daiToken.methods['tokenURI(uint256)'](tokenId)
    myMethod.call().then(function (result) {
        console.log("url is", result)
        // GetMetaData(result);
        GetMetaData("https://s3.amazonaws.com/assets.incubatex.io/tokens/" + tokenId + "/metadata.json")
    })
}
const GetMetaData = (url,) => {
    console.log("GetMetaData url", url)
    axios.get("https://tranquil-garden-15529.herokuapp.com/" + url)
        .then((response) => {
            const arr = response.data;
            console.log("response from getMedata---->>>", response.data);
            console.log("Value of array is", arr)
            const userArrayLength = userNFTs.length;
            if (userNFTs.filter(x => x.tokenid === arr.tokenid).length === 0) {
                userNFTs.push(arr);
                listOfNFTtemp.push(arr)
                setUserNFTs111([...userNFTs, arr]);
            }
            else {
                console.log("duplicate Collections data")
            }

        }).catch((error) => {
            console.log("Error in GetMetadata Api---->", error)
        })
}


const tranferNFT = async (i) => {
    setloading(true);
    closeModal()
    const web3 = new Web3(Web3.givenProvider || netwokUrl);
    const contract = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
    var toaccount = transfertoAddress;
    if (toaccount == "" || toaccount == undefined) {
        alert("Please enter transfer to address")
    }
    else {
        await contract.methods.safeTransferFrom(account, toaccount, transferTokenId).send({
            from: account
        }).then((value) => {
            setloading(false);
            alert("NFT transfered Successfully");

            window.location.reload()
        }).catch((e) => {
            console.log("error is", e)
            setloading(false);
        })
    }

}*/

    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>

            <section class="inner-pages" data-aos="fade-up">
                <div class="container how-it-works">
                    <h3>My Memberships</h3>
                    <div class="full-hiw">
                        <div class="tabcontent" style={{ margin: 0 }}>
                            {genesisCount > 0 ?




                                <div class="up-tab-data">
                                    <div class="tab-info">

                                        <div class="tab-info-video"
                                            dangerouslySetInnerHTML={{
                                                __html: `<video width="100%" height="auto" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${genesisVid} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                                            }} />
                                    </div></div>
                                : null}
                        </div>








                        {metaCapsuleCount > 0 ?
                            <div>



                                <div class="up-tab-data">
                                    <div class="tab-info">


                                        <div class="tab-info-video"
                                            dangerouslySetInnerHTML={{
                                                __html: `<video width="100%" height="auto" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${metaVid} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                                            }} /> </div></div></div> : null}


                    </div>
                </div>



            </section>








            <Footer />
            {loading ? <div class="waiting-overlay">
                <div class="waiting" id="text">
                    <div class="loading-img"></div>
                    <div class="loader"></div>
                </div></div> : null}

        </div>

    )

}
