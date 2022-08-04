
import React, { useState, useEffect } from 'react'
import CrudMethods from '../../config/CrudMethods.js';
import { useEthers } from "@usedapp/core";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import Navbar from '../NavBar/Navbar.js';
//import Footer from '../Footer/Footer.js';
import Modal from 'react-modal';
import Web3 from 'web3';
import axios from "axios";


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
const ERC721TransferABI = [{ "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [], "name": "Genesis_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_TX", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_WALLET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Meta_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Genesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Meta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WL_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "burnBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "exists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedGenesisTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "mintBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintGenesisNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintMetaCapsuleNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "publicSaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }, { "internalType": "uint8", "name": "tokenId", "type": "uint8" }], "name": "reserveMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setGenesisPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newMax", "type": "uint256" }], "name": "setMaxPerWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "m", "type": "bytes32" }], "name": "setMerkleRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setMetaNFTPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setPublicSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newuri", "type": "string" }], "name": "setURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setWhiteListEnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistEnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
var contractAddress = "0x0EB8F0E9De582Ab609E4f5aC6e2E3DDe7d1e034a";
export default function MyNFT() {
  const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [transferto, setTransferto] = useState(0);
  const [userNFTs, setUserNFTs] = useState([]);
  const [userNFTs111, setUserNFTs111] = useState([]);
  const [loading, setloading] = useState(true);

  const ethereum = window.ethereum;
  var userWalletAddress1 = window.localStorage.getItem("walletAddress");


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(value) {
    setIsOpen(true);
    setTokenId(value)

  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider)
    console.log("url is", "https://tranquil-garden-15529.herokuapp.com/")
    console.log("we3 is", web3);
    // const chainid=await new web3.eth.net.getId()
    const chainid = await new web3.eth.getChainId()
    console.log("Chain ID====", chainid)
    if (chainid == 3) {
      setTimeout(
        () => {
          if (ethereum && ethereum.isMetaMask) {
            ChainId()
          }
          else {
            setloading(false)
          }

        },
        6000
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
  }, [account]);


  const ChainId = async () => {
    const web3 = new Web3(Web3.givenProvider)
    console.log("url is", "https://tranquil-garden-15529.herokuapp.com/")
    console.log("we3 is", web3);
    // const chainid=await new web3.eth.net.getId()
    const chainid = await new web3.eth.getChainId()
    console.log("Chain ID123", chainid)
    if (chainid == 3) {
      await GetNft()

    }
    else {
      setloading(false);
    }

  }

  // useEffect(async()=>{
  //   await GetNft()
  // })


  const GetNft = async () => {
    console.log("account in GetNft", account);
    var userWalletAddress = window.localStorage.getItem("walletAddress");
    console.log("userWalletAddress in MyNFT.js", userWalletAddress)
    var i;
    var data = [];
    console.log(">>", "https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + contractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
    await axios.get("https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + contractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
      .then(async (response) => {
        data = response.data.result
        console.log("data Array---->>", data)
        if (data.length == 0) {
          setloading(false)
        }

        let tokenID = [];
        for (i = 0; i < data.length; i++) {
          const web3 = new Web3("https://ropsten.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
          const daiToken = new web3.eth.Contract(ERC721TransferABI, contractAddress);
          var tokendata = data[i].tokenID
          var timestampValue = data[i].timeStamp
          console.log("tokendata", tokendata)

          console.log("daiToken12", daiToken.methods)
          await daiToken.methods.ownerOf(tokendata).call().then((data) => {
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
            setloading(false);
            console.log("error ============ ", error)
          });
        }

      }).catch((error) => {
        setloading(false);
        console.log("Error in GetNFT Api---->", error)
      })
  }

  const GetUrl = (tokenId) => {
    const web3 = new Web3("https://ropsten.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
    const daiToken = new web3.eth.Contract(ERC721TransferABI, contractAddress);
    const myMethod = daiToken.methods['tokenURI(uint256)'](tokenId)
    myMethod.call().then(function (result) {
      console.log("url is", result)
      GetMetaData(result);
    })
  }
  const GetMetaData = (url, calculatedHrs) => {
    console.log("GetMetaData url", url)
    axios.get("https://tranquil-garden-15529.herokuapp.com/" + url)
      .then((response) => {
        const arr = response.data;
        console.log("Value of array is", arr)

        const userArrayLength = userNFTs.length;
        if (userNFTs.filter(x => x.tokenid === arr.tokenid).length === 0) {
          userNFTs.push(arr);
          listOfNFTtemp.push(arr)
          // userNFTs[userArrayLength]["timehrs"] = calculatedHrs;
          setUserNFTs111([...userNFTs, arr]);
          setloading(false);
        }
        else {
          console.log("duplicate Collections data")
        }

      }).catch((error) => {
        setloading(false);
        console.log("Error in GetMetadata Api---->", error)
      })
  }
  const goToOpensea = () => {
    window.location.href = "https://opensea.io/"
  }
  return (
    <div>
      <Navbar />
      <Stickysocial />
      <div class="third-section" data-aos="fade-up">
        <h2>My NFT's</h2>
        {console.log("userNFTs in return MyNFT", userNFTs)}
        {userNFTs.length > 0 ?
          <div class="container">
            {userNFTs.map((item) => (

              <div class="collection-card">
                <div class="source">
                  {(item.image).includes(".mp4" || ".gif") ?
                    <video width="320" height="240" controls>
                      <source src={item.image} type="video/mp4" />
                    </video> : <img src={item.image} alt="Avatar" />
                  }

                </div>
                <div class="details">
                  <div class="left">
                    <h3>{item.name}</h3>
                    <h4>Created By : <span><a href="https://ropsten.etherscan.io/address/0xA841fD03d38A6C8926bAA78E7B52e9F688e0E09A">Lostboy (0xA841...E09A)</a></span></h4>
                    <h4>owned by : <span>{userWalletAddress1.slice(0, 6)}...{userWalletAddress1.slice(-2)}</span></h4>
                    <a href="https://opensea.io/" target="_blank"><button>Sell Now</button></a>
                  </div>
                  <div class="right">
                    <span>Price</span>
                    <h5>PT 1</h5>
                    <a download="custom-filename.jpg" href={item.downloadUrl} class="download"><i class="fas fa-download"></i> Download</a>

                  </div>
                </div>
              </div>

            )).sort()}

          </div> : <div class="container"><div class="nft-panel"> <h3 class="no-found">{loading ? null : <div>No NFTs Found! Please Mint Some NFTs <a href=""><Link to="/#explore">here</Link></a></div>}</h3></div></div>}

        {loading ?
          <div class="waiting-overlay">
            <div id="text">
              <div class="loading-img"></div>
              <div class="loader"></div></div>
            <span>Please wait your NFT's is in progress...</span>
          </div> : null}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >

        <div class="infotext_Modal">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Transfer To Address</h2>
          <input
            value={transferto}
            onChange={(e) => { setTransferto(e.target.value) }}
            type="text" id="price"
            name="price"
            placeholder="Enter Wallet Address" />
          <span>ETH</span>
          <button class="infobtnModal" onClick={() => { setNFTPrice() }}>Submit</button>
          <button class="infobtnModal1" onClick={() => { closeModal() }}>Close</button>
        </div>
      </Modal>

      {/* <Footer/> */}
    </div>
  )
}





