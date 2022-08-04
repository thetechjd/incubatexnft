import React, { useReducer, useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEthers } from "@usedapp/core";
// import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../src/config/firebase-config";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

// import { getMessaging, getToken,onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

import AWS from 'aws-sdk'
import ConnectMetaMask from './components/ConnectMetaMask/ConnectMetaMask.js';
import Updatenft from './components/Updatenft/Updatenft.js';
import LandingPage from './components/Landing/LandingPage.js';
import MyNFTs from './components/MyNFT/MyNFT.js';
import adminuploadregular from './containers/upload/adminuploadRegular.js';
import Projects from './containers/AdminPanel/Projects.js';
import CreateProjects from './containers/AdminPanel/CreateProjects.js';
import AddNews from './containers/AdminPanel/AddNews.js';
import News from './containers/AdminPanel/News.js';
import EditNews from './containers/AdminPanel/EditNews.js';
import Membership from './components/Membership/Membership.js';
//import Memberships from './containers/AdminPanel/Memberships.js';
import EditMemberships from './containers/AdminPanel/EditMemberships.js';
//import Members from './containers/AdminPanel/Members.js';
//import EditMember from './containers/AdminPanel/EditMember.js';
//import EditProject from './containers/AdminPanel/EditProject.js';
import Congratulations from './components/Congratulations/Congratulations.js';
import NewsDetails from './components/NewsDetails/NewsDetails.js';
import AllNews from './components/AllNews/AllNews.js';
import AllProjects from './components/AllProjects/AllProjects.js';
import SubmitProject from './components/SubmitProject/SubmitProject.js';
import SubmitSucess from './components/SubmitProject/SubmitSucess.js';
import AllTeam from './components/AllTeam/AllTeam.js';
//import WeHiring from './components/WeHiring/WeHiring.js';
import TermsofServices from './components/TermsofServices/TermsofServices.js';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.js';
import ProjectDetails from './components/AllProjects/ProjectDetails.js';
import CongratsNft from './components/Congratulations/CongratsNft.js';
import MyMemberships from './components/Membership/MyMemberships.js';
import CongratsWl from './components/Congratulations/CongratsWL.js';
import Web3 from 'web3';
import { UserContext } from './components/UseContext.js';
import axios from 'axios';
import Notifications from './containers/AdminPanel/Notifications.js';
import Subscribe from './components/Subscribe/Subscribe.js';
import AddMember from './containers/AdminPanel/AddMember.js';

const App = () => {
  const [admin, setAdmin] = useState(false)
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [userNFTs, setUserNFTs] = useState([]);
  const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
  const [userMembershipArray, setUserMembershipArray] = useState([]);
  const [userMembershipArraytemp, setUserMembershipArraytemp] = useState([]);

  const { userGensisMebershipCount, setUserGensisMebershipCount, userMetaMebershipCount, setUserMetaMebershipCount } = useContext(UserContext);

  const [userNFTs111, setUserNFTs111] = useState([]);
  const [userMembership, setUsermembership] = useState("")
  var userholdingMeta = [];
  var userholdingGenesis = [];

  var ERC721ContractAddress = '0x21121bf94a6187bc318665d7ea0bf26ba2f309f1'
  var ERCContractAbi = [{ "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "URI", "type": "event" }, { "inputs": [], "name": "Genesis_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_TX", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PER_WALLET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_ReservedMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Meta_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Genesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT_Meta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WL_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "balanceOfBatch", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "burnBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "exists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedGenesisTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValid", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "mintBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintGenesisNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "numberOfTokens", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "mintMetaCapsuleNft", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintedMetaCapsule", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveGenesis", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMintedReserveMeta", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "publicSaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }, { "internalType": "uint8", "name": "tokenId", "type": "uint8" }], "name": "reserveMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setGenesisPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newMax", "type": "uint256" }], "name": "setMaxPerWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "m", "type": "bytes32" }], "name": "setMerkleRoot", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "setMetaNFTPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setPublicSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newuri", "type": "string" }], "name": "setURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setWhiteListEnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "uri", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "whitelistEnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  var netwokUrl = 'https://eth-rinkeby.alchemyapi.io/v2/deSJ7VyGLswml7dz5tzzNbHBeYu_R_S1'
  // var netwokUrl= 'https://polygon-mainnet.g.alchemy.com/v2/SVdVVUkdUK6uFUDAMxRVe6n3epdLaZqD'



  useEffect(() => {
    if (account == undefined || account == "" || account == null) {

    }
    else {
      window.localStorage.setItem("walletAddress", account)
      var userWalletAddress = window.localStorage.getItem("walletAddress");
      checkCurrentMembership()
    }

  }, [account]);

  useEffect(() => {
    if (account == undefined || account == "" || account == null) {

    }
    else {
      checkCurrentMembership()
    }

  }, []);

  useEffect(() => {
    if (account) {
      getUserDetails()
    }
  }, [admin]);

  useEffect(() => {
    if (account) {
      getUserDetails()
    }
  }, [account]);
  useEffect(() => {
    if (account) {
      getUserDetails()
    }
  }, []);


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

      }
    } else {
      // doc.data() will be undefined in this case
    }
  }

  const checkCurrentMembership = async () => {
    var result1;
    var result2;
    var userWalletAddress = window.localStorage.getItem("walletAddress");
    const web3 = new Web3(netwokUrl);
    const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
    await daiToken.methods.mintedGenesis(userWalletAddress).call().then((data1) => {


      result1 = data1
    }).catch((error) => {
      console.log("Error in GetNFT Api---->", error)
    })

    await daiToken.methods.mintedMetaCapsule(userWalletAddress).call().then((data2) => {

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
    await axios.get("https://api-rinkeby.etherscan.com/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=8XX3TRP1WSAQDAJD24KCGE56NJJADYD2P3" + "&address=" + userWalletAddress)
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
          const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
          var tokendata = data[i].tokenID
          await daiToken.methods.mintedGenesis(userWalletAddress).call().then(async (data) => {
            var data = JSON.stringify(data);
            var addrss = JSON.stringify(userWalletAddress);
            var accontAdd = data.toLowerCase()
            var wallAdd = addrss.toLowerCase()
            if (accontAdd == wallAdd) {
              var userArrayLength = userNFTs.length

              if (mintedGenesisTokens > 0) {
                var obj = {
                  "tokenid": 1,
                  "name": "Genesis",
                }
                if (userNFTs.filter(x => x.tokenid === 1).length === 0) {
                  userNFTs.push(obj);
                  listOfNFTtemp.push(obj)
                  userNFTs[userArrayLength]["membership"] = "genesis";
                  setUserNFTs111([...userNFTs, obj]);
                }

              }
              else if (mintedMetaTokens > 0) {
                var obj = {
                  "tokenid": 2,
                  "name": "Meta Access Capsule",
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

        window.localStorage.setItem('rememberMe', JSON.stringify("rememberMe"));




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




  return (
    <div>
      <Router basename={"/"}>
        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path='/mynfts/' component={MyNFTs} />
          <Route path='/connect/' component={ConnectMetaMask} />
          <Route path='/congrats/' component={Congratulations} />
          <Route path='/congratsnft/' component={CongratsNft} />
          <Route path='/congratswl/' component={CongratsWl} />


          <Route path='/allnews/' component={AllNews} />
          <Route path='/newsdetails/' component={NewsDetails} />
          <Route path='/allteam/' component={AllTeam} />
          {/*<Route path='/wearehiring/' component={WeHiring} />*/}
          <Route path='/termsofservices/' component={TermsofServices} />
          <Route path='/privacypolicy/' component={PrivacyPolicy} />
          <Route path='/subscribe/' component={Subscribe} />





          <Route path='/allprojects/' component={AllProjects} />
          <Route path='/projectdetails/' component={ProjectDetails} />
          <Route path='/mymemberships/' component={MyMemberships} />


          <Route path='/submitproject/' component={SubmitProject} />
          <Route path='/submitsucess/' component={SubmitSucess} />

          <Route path='/adminuploadRegular/' component={adminuploadregular} />
          {/* Admin Routes */}
          <Route path='/admin/projects' component={admin ? Projects : null} />
          <Route path='/admin/createproject' component={admin ? CreateProjects : null} />
          <Route path='/admin/editproject' component={admin ? EditProject : null} />

          <Route path='/admin/addnews' component={admin ? AddNews : null} />
          <Route path='/admin/news' component={admin ? News : null} />
          <Route path='/admin/editnews' component={admin ? EditNews : null} />
          <Route path='/admin/memberships' component={admin ? Memberships : null} />
          <Route path='/admin/editmemberships' component={admin ? EditMemberships : null} />

          <Route path='/admin/members' component={admin ? Members : null} />
          <Route path='/admin/addmembers' component={admin ? AddMember : null} />

          <Route path='/admin/editmembers' component={admin ? EditMember : null} />
          <Route path='/admin/notifications' component={admin ? Notifications : null} />








        </Switch>
      </Router>
    </div>
  );
}

export default App;