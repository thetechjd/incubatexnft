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

import LandingPage from './components/Landing/LandingPage.js';
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
import AllTeam from './components/AllTeam/AllTeam.js';
//import WeHiring from './components/WeHiring/WeHiring.js';
import TermsofServices from './components/TermsofServices/TermsofServices.js';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.js';

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
  const contractABI = require("./components/utils/contract-abi.json");
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
    const daiToken = new web3.eth.Contract(contractABI, ERC721ContractAddress);
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
          const daiToken = new web3.eth.Contract(contractABI, ERC721ContractAddress);
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

          <Route path='/mymemberships/' component={MyMemberships} />




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