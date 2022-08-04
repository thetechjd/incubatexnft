import React, { useState, useEffect } from 'react'
//import Footer from '../Footer/Footer.js'
import Navbar from '../NavBar/Navbar.js'
import { useEthers } from "@usedapp/core";
import Web3 from 'web3';
import axios from "axios";
import Modal from 'react-modal';
import Stickysocial from '../StickySocials/Stickysocial.js';
import genesisVid from '../../assets/images/genesis.mp4';
import metaVid from '../../assets/images/meta.mp4';


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
const ERC721ContractAddress = '0x21121bf94a6187bc318665d7ea0bf26ba2f309f1'
const ERCContractAbi = [{ "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [], "name": "Genesis_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_TX", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_WALLET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Meta_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Genesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Meta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WL_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "burnBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "exists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedGenesisTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "mintBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintGenesisNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintMetaCapsuleNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "publicSaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }, { "internalType": "uint8", "name": "tokenId", "type": "uint8" }], "name": "reserveMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setGenesisPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newMax", "type": "uint256" }], "name": "setMaxPerWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "m", "type": "bytes32" }], "name": "setMerkleRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setMetaNFTPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setPublicSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newuri", "type": "string" }], "name": "setURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setWhiteListEnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistEnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
// var netwokUrl = 'https://polygon-mumbai.g.alchemy.com/v2/deAwtSML_l5cXUEMuwl2IqjyAD0lRTmy'
var netwokUrl = 'https://eth-rinkeby.alchemyapi.io/v2/deSJ7VyGLswml7dz5tzzNbHBeYu_R_S1'

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
        const contract = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);

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








            {/*<Footer />*/}
            {loading ? <div class="waiting-overlay">
                <div class="waiting" id="text">
                    <div class="loading-img"></div>
                    <div class="loader"></div>
                </div></div> : null}

        </div>

    )

}
