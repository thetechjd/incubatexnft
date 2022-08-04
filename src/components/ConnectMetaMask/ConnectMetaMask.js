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

    const ERC721ContractAddress = '0x21121bf94a6187bc318665d7ea0bf26ba2f309f1';
    const ERCContractAbi = [{ "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [], "name": "Genesis_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_TX", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_WALLET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Meta_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Genesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Meta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WL_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "burnBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "exists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedGenesisTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "mintBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintGenesisNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintMetaCapsuleNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "publicSaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }, { "internalType": "uint8", "name": "tokenId", "type": "uint8" }], "name": "reserveMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setGenesisPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newMax", "type": "uint256" }], "name": "setMaxPerWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "m", "type": "bytes32" }], "name": "setMerkleRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setMetaNFTPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setPublicSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newuri", "type": "string" }], "name": "setURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setWhiteListEnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistEnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
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
        if (chainid == 4) {
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
        await axios.get("https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
            .then(async (response) => {
                data = response.data.result
                if (data.length == 0) {
                    //   setloading(false)
                    setUserNFTs([])
                    setListOfNFTtemp([])
                }
                let tokenID = [];
                for (i = 0; i < data.length; i++) {
                    const web3 = new Web3("https://rinkeby.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
                    const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
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
        await axios.get("https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=" + userWalletAddress + "&tag=latest&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3")
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
