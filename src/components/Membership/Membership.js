import React, { useState, useEffect, useContext } from 'react'
import '../Styles/style-front.css';
import Web3 from 'web3';
import { useEthers } from "@usedapp/core";
import Modal from 'react-modal';
import silverimg from '../../assets/images/silver-img.png';
import meta from '../../assets/images/meta.mp4';
import genesis from '../../assets/images/genesis.mp4';
import axios from 'axios';
import AWS from 'aws-sdk'
import { db } from "../../config/firebase-config";
import { UserContext } from '../UseContext.js';
import CountDown from '../CountDown/CountDown.js';
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

const S3_BUCKET = 'assets.incubatex.io';
const REGION = 'us-east-1';
const contractABI = require("../utils/contract-abi.json");

const { MerkleTree } = require('merkletreejs');
const KECCAK256 = require('keccak256');
const addresses = require('../utils/addresses.json');

const leaves = addresses.map(x => KECCAK256(x));
const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true })

const buf2hex = x => '0x' + x.toString('hex')


AWS.config.update({
    httpsOptions: {
        timeout: 3000 * 1000,
        connectTimeout: 3500 * 1000,
    },
    accessKeyId: 'AKIAROITQDTTLVXONJXM',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})


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

export default function Membership() {
    const { activateBrowserWallet, account, deactivate } = useEthers();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [loading, setloading] = useState(false);
    const [wlAddress, setWlAddress] = useState('')
    const [showConnect, setShowConnect] = useState(true)
    const [userEmail, setUserEmail] = useState("");
    const [userDiscord, setUserDiscord] = useState("");
    const [userTwitter, setUserTwitter] = useState("");
    const [userNFTs, setUserNFTs] = useState([]);
    const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
    const [userMembershipArray, setUserMembershipArray] = useState([]);
    const [userMembershipArraytemp, setUserMembershipArraytemp] = useState([]);
    const [mintCounterMeta, setMintCounterMeta] = useState(1);
    const [mintCounterGenesis, setMintCounterGenesis] = useState(1);
    const [sale, setSale] = useState(false)


    const { userGensisMebershipCount, setUserGensisMebershipCount, userMetaMebershipCount, setUserMetaMebershipCount } = useContext(UserContext);

    const [userNFTs111, setUserNFTs111] = useState([]);
    const [userMembership, setUsermembership] = useState("")
    var userholdingMeta = [];
    var userholdingGenesis = [];

    // var ERC721ContractAddress = '0x944df6cccBe1dF4080a292F120F675118541cA6d';//rinkeyBy
    // var ERC721ContractAddress = '0x4ED07409dA3aF014de71EB9d47f9CF7f408f8AAa';
    const contractAddress = '0x538289E0497b3a87515A0cB35dD10442D4477038'
    var netwokUrl = 'https://eth-rinkeby.alchemyapi.io/v2/deSJ7VyGLswml7dz5tzzNbHBeYu_R_S1'
    //var netwokUrl = 'https://eth-mainnet.g.alchemy.com/v2/gOkgumMo6bV2fWBI5ih89uP7KW99oXye'

    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = 1656597600000 / 1000; // use UNIX timestamp in mseconds

    console.log("stratTime>>", stratTime)
    console.log("endTime>>", endTime)


    useEffect(() => {
        if (account == null || account == undefined || account == "") {
            setShowConnect(true)
        } else {
            setWlAddress(account);
            setShowConnect(false)
            checkCurrentMembership()
            checkSaleOnOff()
        }

    }, [account]);

    useEffect(() => {
        if (account == null || account == undefined || account == "") {
            setShowConnect(true)
        } else {
            setWlAddress(account);
            setShowConnect(false)
            checkCurrentMembership()
            checkSaleOnOff()
        }

    }, []);


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

    function openModal(value) {
        setIsOpen(true);

    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    const checkCurrentMembership = async () => {
        var result1;
        var result2;
        const web3 = new Web3(netwokUrl);
        const daiToken = new web3.eth.Contract(contractABI, contractAddress);
        await daiToken.methods.getMintedGenesisTokens().call().then((data1) => {


            result1 = data1
        }).catch((error) => {
            console.log("Error in GetNFT Api---->", error)
        })

        await daiToken.methods.getMintedMetaCapsule().call().then((data2) => {
            console.log("getMintedGoldTokens Minted", data2)

            result2 = data2
        }).catch((error) => {
            console.log("Error in GetNFT Api---->", error)
        })

        GetNft(result1, result2)


    }
    const GetNft = async (value1, value2) => {
        var mintedGenesisTokens = value1;
        var mintedMetaTokens = value2;
        var userWalletAddress = window.localStorage.getItem("walletAddress");
        var i;
        var data = [];
        //replace this!
        await axios.get("https://api-rinkeby.etherscan.com/api?module=account&action=tokennfttx&contractaddress=" + contractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3" + "&address=" + userWalletAddress)
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
                    await daiToken.methods.ownerOf(tokendata).call().then(async (data) => {
                        var data = JSON.stringify(data);
                        var addrss = JSON.stringify(userWalletAddress);
                        var accontAdd = data.toLowerCase()
                        var wallAdd = addrss.toLowerCase()
                        if (accontAdd == wallAdd) {
                            var userArrayLength = userNFTs.length

                            if (mintedGenesisTokens.includes(tokendata)) {
                                var obj = {
                                    "tokenid": tokendata,
                                    "name": "NFT" + tokendata,
                                }
                                if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
                                    userNFTs.push(obj);
                                    listOfNFTtemp.push(obj)
                                    userNFTs[userArrayLength]["membership"] = "genesis";
                                    setUserNFTs111([...userNFTs, obj]);
                                }

                            }
                            else if (mintedMetaTokens.includes(tokendata)) {
                                var obj = {
                                    "tokenid": tokendata,
                                    "name": "NFT" + tokendata,
                                }
                                if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
                                    userNFTs.push(obj);
                                    listOfNFTtemp.push(obj)
                                    userNFTs[userArrayLength]["membership"] = "meta";
                                    setUserNFTs111([...userNFTs, obj]);
                                }

                            }
                            CurrentMembership()

                        }
                    }).catch((error) => {
                        console.log("error ownerof ============ ", error)
                    });
                }
                userholdingMeta = userNFTs.filter(x => x.membership == 'meta');
                userholdingGenesis = userNFTs.filter(x => x.membership == 'genesis');

                var mlength = userholdingMeta.length;
                setUserMetaMebershipCount(mlength);
                var glength = userholdingGenesis.length
                setUserGensisMebershipCount(glength);

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


    const ChainId = async () => {
        const web3 = new Web3(Web3.givenProvider)
        //replace this!
        if (chainid == 1) {
            setNetwork(true)
        }
        else {
            setNetwork(false)
        }

    }



    const onGenesisMintPressed = async () => {

        const web3 = new Web3(Web3.givenProvider || netwokUrl);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const genesisPrice = await contract.methods.PRICE_PER_NFT_Genesis().call();

        let whitelistCheck = await contract.methods.whitelistEnable().call();
        let total = genesisPrice * mintCounterGenesis;



        if (account == null || account == undefined || account == "") {
            window.location.href = "/connect/?1"
        }
        else {
            setloading(true);
            if (!whitelistCheck) {

                await contract.methods.mintGenesisNft(mintCounterGenesis, []).send({ from: account, value: total, gas: 500000 }).then(async () => {
                    window.location.href = "/congrats"
                });



            }
            else {

                let leaf = buf2hex(KECCAK256(account));
                let proof = tree.getProof(leaf).map(x => buf2hex(x.data));
                await contract.methods.mintGenesisNft(mintCounterGenesis, proof).send({ from: account, value: total, gas: 500000 }).then(async () => {
                    window.location.href = "/congrats"
                })
            }
        }



    }


    const onMetaCapsuleMintPressed = async () => {

        const web3 = new Web3(Web3.givenProvider || netwokUrl);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const metaPrice = await contract.methods.PRICE_PER_NFT_Meta().call();
        let whitelistCheck = await contract.methods.whitelistEnable().call();
        let total = metaPrice * mintCounterMeta;


        if (account == null || account == undefined || account == "") {
            window.location.href = "/connect/?1"
        }
        else {
            setloading(true);
            if (!whitelistCheck) {

                await contract.methods.mintMetaCapsuleNft(mintCounterMeta, []).send({ from: account, value: total, gas: 500000 }).then(async () => {
                    window.location.href = "/congrats"
                });

            }
            else {

                let leaf = buf2hex(KECCAK256(account));
                let proof = tree.getProof(leaf).map(x => buf2hex(x.data));
                await contract.methods.mintMetaCapsuleNft(mintCounterMeta, proof).send({ from: account, value: total, gas: 500000 }).then(async () => {
                    window.location.href = "/congrats"
                })
            }
        }


    }

    const mintGenesisMembershipPreSale = async () => {
        console.log("mintCounterGenesis", mintCounterGenesis)
        var valueee = BigInt(1380000000000000000000)

        const myNumber = Number(valueee);
        console.log("valueee", valueee)
        console.log("myNumber", myNumber)

        if (mintCounterGenesis > 2) {
            alert("Cannot mint more then 2")

        }
        else if (mintCounterGenesis <= 0) {
            alert("Mint atleast 1 NFT")
        } else {
            const web3 = new Web3(Web3.givenProvider || netwokUrl);
            const chainid = await new web3.eth.getChainId()
            var block = await web3.eth.getBlock("latest");
            var gasLimit = block.gasLimit / block.transactions.length;
            console.log("gasLimit in mint", gasLimit)

            var gaslimitTosend = parseInt(gasLimit);
            var gaslimittenperc = gaslimitTosend / 10;
            var finalGasLimit = gaslimitTosend + gaslimittenperc;
            // if (chainid == 80001) {

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            // openModal();
            await contract.methods.totalSupply().call().then(async (supply) => {
                var tokenid = parseInt(supply) + 1

                if (account == null || account == undefined || account == "") {
                    window.location.href = "/connect/?1"
                }
                else {
                    setloading(true);

                    await contract.methods.mintGenesisNftPreSale(mintCounterGenesis).send({
                        from: account,
                        to: ERC721ContractAddress,
                        value: mintCounterGenesis * 460000000000000000000,
                        // gasLimit:28892111,
                        maxPriorityFeePerGas: null,
                        maxFeePerGas: null,
                    }).then(async (value) => {
                        var NFTDetailsMeta = {
                            "tokenid": tokenid,
                            "name": "Genesis",
                            "image": "https://assets.incubatex.io/tokens/genesis.mp4",
                            "membershiptype": "genesis",
                            "animation_url": "https://assets.incubatex.io/tokens/genesis.mp4"
                        }
                        var notificationId = Date.now();

                        const washingtonRef = doc(db, "Notifications", notificationId.toString());
                        var notificationDetails = {
                            "notificationId": notificationId,
                            "membershipMinted": "Genesis",
                            "isRead": false,
                            "mintedBy": account

                        }
                        const aaa = await setDoc(washingtonRef, notificationDetails);
                        const myJSON = JSON.stringify(NFTDetailsMeta);

                        //upload on s3 and save in tokens folder where all main nfts are stored 
                        // var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
                        var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
                        const params = {
                            ACL: 'public-read',
                            Body: myJSON,
                            Bucket: S3_BUCKET,
                            Key: NFTDetailKey,
                            ContentType: 'application/json'
                        };

                        myBucket.putObject(params)
                            .on('httpUploadProgress', async (evt) => {
                                console.log("evnt is", evt)
                                setloading(false);
                                window.location.href = "/congrats"

                            })
                            .send((err) => {
                                if (err) console.log(err)
                            })



                    }).catch((error) => {
                        setloading(false);
                        console.log("error ============ ", error)
                    });
                }

            })
        }
        // else {
        //     window.location.href = "/connect/"
        // }

        // }


    }


    const mintMetaCapsuleMembershipPreSale = async () => {
        if (mintCounterMeta > 2) {
            alert("Cannot mint more then 2")

        }
        else if (mintCounterMeta <= 0) {
            alert("Mint atleast 1 NFT")
        }
        else {
            console.log("mintCounterMeta", mintCounterMeta)
            const web3 = new Web3(Web3.givenProvider || netwokUrl);
            const chainid = await new web3.eth.getChainId()
            var block = await web3.eth.getBlock("latest");
            var gasLimit = block.gasLimit / block.transactions.length;
            console.log("gasLimit in mint", gasLimit)

            var gaslimitTosend = parseInt(gasLimit);
            var gaslimittenperc = gaslimitTosend / 40;
            var finalGasLimit = gaslimitTosend + gaslimittenperc;
            // if (chainid == 80001) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            await contract.methods.totalSupply().call().then(async (supply) => {
                var tokenid = parseInt(supply) + 1
                if (account == null || account == undefined || account == "") {
                    window.location.href = "/connect"
                }
                else {
                    setloading(true);
                    await contract.methods.mintMetaCapsuleNftPreSale(mintCounterMeta).send({
                        from: account,
                        to: ERC721ContractAddress,
                        value: mintCounterMeta * 207000000000000000000,
                        maxPriorityFeePerGas: null,
                        maxFeePerGas: null,
                    }).then(async (value) => {

                        var NFTDetailsMeta = {
                            "tokenid": tokenid,
                            "name": "MetaCapsule",
                            "image": "https://assets.incubatex.io/tokens/meta.mp4",
                            "membershiptype": "metacapsule",
                            "animation_url": "https://assets.incubatex.io/tokens/meta.mp4"
                        }
                        var notificationId = Date.now();
                        const washingtonRef = doc(db, "Notifications", notificationId.toString());
                        var notificationDetails = {
                            "notificationId": notificationId,
                            "membershipMinted": "MetaCapsule",
                            "isRead": false,
                            "mintedBy": account

                        }
                        const aaa = await setDoc(washingtonRef, notificationDetails);

                        const myJSON = JSON.stringify(NFTDetailsMeta);

                        //upload on s3 and save in tokens folder where all main nfts are stored 
                        // var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
                        var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
                        const params = {
                            ACL: 'public-read',
                            Body: myJSON,
                            Bucket: S3_BUCKET,
                            Key: NFTDetailKey,
                            ContentType: 'application/json'
                        };

                        myBucket.putObject(params)
                            .on('httpUploadProgress', async (evt) => {
                                console.log("evnt is", evt)
                                setloading(false);
                                window.location.href = "/congrats"
                            })
                            .send((err) => {
                                if (err) console.log(err)
                            })



                    }).catch((error) => {
                        setloading(false);
                        console.log("error ============ ", error)
                    });

                }

            })
        }
        // else {
        //     window.location.href = "/connect/"

        // }
        // }
    }
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
        // await handleWalletChange();
    }


    const submitTomailchip = () => {
        if (userEmail == "" || userEmail == undefined) {
            alert("Please enter email first")
        }
        else if (userDiscord == "" || userDiscord == undefined) {
            alert("Please enter discord first")
        }
        else if (userTwitter == "" || userTwitter == undefined) {
            alert("Please enter discord first")
        }
        else {

        }
    }

    return (
        <div>
            <section class="member-section" id="membership" data-aos="fade-up">
                <div class="container">
                    <h3>MEMBERSHIPS</h3>

                    <span class="below-title">"In order to participate in IncubateX projects, you must hold an IncubateX Membership NFT in your wallet at the time of the project release"</span>
                    <div class="member-box gold" data-aos="fade-right">
                        <div class="member-inner">
                            <h4 class="gold-text">Genesis Membership</h4>

                            <div class="tier-info"
                                dangerouslySetInnerHTML={{
                                    __html: `<video width="480" height="270" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${genesis} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                                }}
                            />

                            <div class="member-text">
                                <ul>
                                    <li>Quantity - 11,111</li>
                                    <li>Price - 0.20 ETH </li>
                                    <li>Access to future projects incubated in the ecosystem</li>
                                    <li>Access to free exclusive merch </li>
                                    <li>Access to free genesis airdrops</li>
                                    <li>Future token airdrops </li>
                                    <li>Additional utility TBA</li>
                                </ul>
                                {/* <button style={{ cursor: 'not-allowed' }} class="mint-btn1" disabled><span>Mint</span></button> */}
                                {/* <input type="number" placeholder="1" onChange={(e)=>{setMintCounterGenesis(e.target.value)}} className="mint-btn1-input" /><button onClick={()=> mintGenesisMembershipPreSale()} class="mint-btn1"><span>Mint</span></button> */}


                                {sale ?
                                    <>
                                        <input type="number" placeholder="1" onChange={(e) => { setMintCounterGenesis(e.target.value) }} className="mint-btn1-input" /><button onClick={() => onGenesisMintPressed()} class="mint-btn1"><span>Mint</span></button>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}>Max limit: 3 NFTs/ wallet.</p>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}> You can mint up to 3 NFTs at a time</p>

                                    </>
                                    : <>
                                        <input type="number" placeholder="1" onChange={(e) => { setMintCounterGenesis(e.target.value) }} className="mint-btn1-input" /><button style={{ cursor: 'not-allowed' }} class="mint-btn1"><span>Mint</span></button>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}>Max limit: 3 NFTs/ wallet.</p>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}> You can mint up to 3 NFTs at a time</p>

                                    </>
                                }


                            </div>
                            <CrossmintPayButton
                                collectionTitle="IncubateX Test"
                                collectionDescription="null"
                                collectionPhoto=""
                                clientId="cae645e7-5233-4c24-abcf-e0b6a774cef0"
                                mintConfig={{ "type": "erc-1155", "totalPrice": "0.16", "numberOfTokens": "1" }}
                                environment="staging"
                            />
                        </div>
                    </div>

                    <div class="member-box platinum" data-aos="fade-left">
                        <div class="member-inner">
                            <h4 class="silver-text">Meta Access Capsule</h4>

                            <div class="tier-info-blue"
                                dangerouslySetInnerHTML={{
                                    __html: `<video width="480" height="270" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${meta} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                                }}
                            />
                            <div class="member-text">
                                <ul>
                                    <li>Quantity - 11,111</li>
                                    <li>Price - 0.09 ETH</li>
                                    <li>Free Tickets to exclusive metaverse events</li>
                                    <li>Free metaverse wearables by up & coming artists</li>
                                    <li>Access to free exclusive merch </li>
                                    <li>Access to meta airdrops </li>
                                    <li>Additional utility TBA</li>
                                </ul>
                                {/* <button onClick={()=> window.open("https://www.premint.xyz/incubatex/", "_blank")} class="mint-btn"><span>Mint</span></button> */}
                                {/* <input type="number" onChange={(e)=>{setMintCounterMeta(e.target.value)}} placeholder="1" className="mint-btn-input" /><button onClick={()=> mintMetaCapsuleMembershipPreSale()} class="mint-btn"><span>Mint</span></button> */}


                                {sale ?
                                    <>
                                        <input type="number" onChange={(e) => { setMintCounterMeta(e.target.value) }} placeholder="1" className="mint-btn-input" /><button onClick={() => onMetaCapsuleMintPressed()} class="mint-btn"><span>Mint</span></button>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}>Max limit: 3 NFTs/ wallet.</p>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}> You can mint up to 3 NFTs at a time</p>
                                    </>
                                    : <>
                                        <input type="number" onChange={(e) => { setMintCounterMeta(e.target.value) }} placeholder="1" className="mint-btn-input" /><button style={{ cursor: 'not-allowed' }} class="mint-btn"><span>Mint</span></button>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}>Max limit: 3 NFTs/ wallet.</p>
                                        <p style={{ fontSize: 12, lineHeight: 1, paddingBottom: 0 }}> You can mint up to 3 NFTs at a time</p>
                                    </>
                                }

                            </div>
                        </div>
                    </div>

                </div>
                {/* <div class="countdown-time">{stratTime == endTime ? null : <CountDown />}</div> */}
            </section>
            {loading ? <div class="waiting-overlay"><div class="waiting" id="text">
                <div class="loading-img"></div>
                <div class="loader"></div>
            </div></div> : null}

        </div>
    )
}
