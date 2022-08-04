import React, { useState, useEffect } from 'react'
import defaultimg from '../../assets/images/default-img.png';
import { useLocation } from "react-router-dom";
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import '../Styles/Project.css'
import Web3 from 'web3';
import Navbar from '../NavBar/Navbar.js';
////import Footer from '../Footer/Footer.js';
import Stickysocial from '../StickySocials/Stickysocial.js';
import axios from 'axios'
import { useEthers } from "@usedapp/core";
import InfoImg from '../../assets/images/wrong-network.gif'
import Modal from 'react-modal';
import whitebanner from '../../assets/images/white-banner.png';

export default function ProjectDetails() {

    const search = useLocation().search;
    const { activateBrowserWallet, account, deactivate } = useEthers();

    const queryParam = new URLSearchParams(search).get('detail');
    const [projectName, setProjectName] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [launchTime, setLaunchTime] = useState("");
    const [status, setStatus] = useState("");
    const [about, setAbout] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [discordUrl, setDiscordUrl] = useState("");
    const [thumbnailImg, setThumbnailImg] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [contractAbi, setContractAbi] = useState("");
    const [maxSupply, setMaxSupply] = useState(0)
    const [contractNetworkName, setContractNetworkName] = useState("");
    const [contractNetworkId, setContractNetworkId] = useState("");
    const [litePaperUrl, setLitePaperUrl] = useState("")
    const [loading, setloading] = useState(false);

    const [team, setTeam] = useState("");


    const [listOfNFTtemp, setListOfNFTtemp] = useState([]);
    const [exploreNFTs, setExploreNFTs] = useState([]);
    const [userNFTs111, setUserNFTs111] = useState([]);
    const [userNFTs, setUserNFTs] = useState([]);

    const [bannerImg, setBannerImg] = useState("");


    const [mintedlistOfNFTtemp, setmintedListOfNFTtemp] = useState([]);
    const [mintednfts, setMintednfts] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);

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
    function openModal(value) {
        setIsOpen(true);

    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }



    useEffect(() => {

        getMintedNFTS()
        GetNft()

    }, [])

    useEffect(() => {

        getMintedNFTS()
        GetNft()

    }, [account])

    const switchNetwork = async () => {
        closeModal()
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + contractNetworkId }], // chainId must be in hexadecimal numbers
        });
    }


    const getProjectContent = async () => {
        const docRef = doc(db, "Projects", queryParam.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const ProjectData = docSnap.data();
            setProjectName(ProjectData.projectName);

            setLaunchDate(ProjectData.launchDate);
            setLaunchTime(ProjectData.launchTime)
            setStatus(ProjectData.status);
            setAbout(ProjectData.about);
            setVideoUrl(ProjectData.videoUrl);
            setWebsiteUrl(ProjectData.websiteUrl);
            setTwitterUrl(ProjectData.twitterUrl);
            setDiscordUrl(ProjectData.discordUrl);
            setThumbnailImg(ProjectData.thumbnailImg)
            setContractAddress(ProjectData.smartContractAddress)
            setContractAbi(ProjectData.smartContractAbi)
            setTeam(ProjectData.team);
            setBannerImg(ProjectData.bannerUrl)
            setLitePaperUrl(ProjectData.litePaperFileUrl)
            const web3 = new Web3(Web3.givenProvider);
            var checkValid = web3.utils.isAddress(ProjectData.smartContractAddress)

            if (checkValid == true) {
                await getContracteNfts(ProjectData.smartContractAbi, ProjectData.smartContractAddress, ProjectData.smartContractNetwork);
            }

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }



    const GetNft = async (contractAbi, contractAddress, contractNetwok) => {
        const web3 = new Web3(Web3.givenProvider);

        const docRef = doc(db, "Projects", queryParam.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const ProjectData = docSnap.data();
            var ERC721ContractAddress = ProjectData.smartContractAddress;
            var checkValid = web3.utils.isAddress(ERC721ContractAddress)
            if (checkValid == true) {
                var ERCContractAbi = JSON.parse(ProjectData.smartContractAbi)
                var contractNetwok = ProjectData.smartContractNetwork;
                if (account == undefined || account == "" || account == null) {

                }
                else {
                    var userWalletAddress = account;
                    var i;
                    var data = [];
                    var apiurl;
                    if (contractNetwok == 4) {
                        apiurl = "https://api-rinkeby.etherscan.io/"
                    }
                    else if (contractNetwok == 3) {
                        apiurl = "https://api-ropsten.etherscan.io/"
                    }
                    else if (contractNetwok == 1) {
                        apiurl = "https://api.etherscan.io/"
                    }
                    else if (contractNetwok == 137) {
                        apiurl = "https://api.polygonscan.com/"
                    }
                    else if (contractNetwok == 80001) {
                        apiurl = "https://api-testnet.polygonscan.com/"
                    }
                    await axios.get(apiurl + "/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
                        .then(async (response) => {
                            data = response.data.result
                            let tokenID = [];
                            for (i = 0; i < data.length; i++) {
                                const web3 = new Web3(Web3.givenProvider);
                                const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
                                var tokendata = data[i].tokenID
                                await daiToken.methods.ownerOf(tokendata).call().then((data) => {
                                    var data = JSON.stringify(data);
                                    var addrss = JSON.stringify(userWalletAddress);
                                    var accontAdd = data.toLowerCase()
                                    var wallAdd = addrss.toLowerCase()
                                    if (accontAdd == wallAdd) {
                                        GetUrl(tokendata, ERC721ContractAddress, ERCContractAbi);
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
                }
            }


        }

    }

    const GetUrl = (tokenId, ERC721ContractAddress, ERCContractAbi) => {
        const web3 = new Web3(Web3.givenProvider);
        const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
        const myMethod = daiToken.methods['tokenURI(uint256)'](tokenId)
        myMethod.call().then(function (result) {
            GetMetaData(result);
        })
    }
    const GetMetaData = (url,) => {
        axios.get("https://tranquil-garden-15529.herokuapp.com/" + url)
            .then((response) => {
                const arr = response.data;
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

    const getContracteNfts = async (abi, contract, network) => {

        const docRef = doc(db, "Projects", queryParam.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const ProjectData = docSnap.data();

            var Erc721ContractAddress = ProjectData.smartContractAddress;
            var Erc721ContractAbi = JSON.parse(ProjectData.smartContractAbi);
            var metaUrl = ProjectData.metaUrl;
            var TotalSupply = ProjectData.maxSupply
            for (var i = 1; i <= TotalSupply; i++) {
                var nfttokenId = i;
                if (mintednfts.filter(x => x + "" === nfttokenId + "").length === 1) {
                } else {
                    getMetaUrl(nfttokenId, metaUrl)
                }
            }

        }





    }


    const getMetaUrl = (nfttokenId, metaUrl) => {

        axios.get("https://tranquil-garden-15529.herokuapp.com/" + metaUrl + nfttokenId)
            .then((response) => {
                const arr = response.data;
                // console.log("Value of array is", arr)

                const userArrayLength = exploreNFTs.length;
                if (exploreNFTs.filter(x => x.external_url === arr.external_url).length === 0) {
                    exploreNFTs.push(arr);
                    listOfNFTtemp.push(arr)
                    exploreNFTs[userArrayLength]["tokenId"] = nfttokenId;
                    setUserNFTs111([...exploreNFTs, arr]);
                }
                else {
                    console.log("duplicate Collections data")
                }

            }).catch((error) => {
                console.log("Error in GetMetadata Api---->", error)
            })
    }

    const mintNFTs = async (id) => {

        if (account == null || account == undefined || account == "") {
            window.location.href = "/connect/?1"
        }
        else {
            const web3 = new Web3(Web3.givenProvider);

            var tokenId = id
            var functionName;
            const docRef = doc(db, "Projects", queryParam.toLowerCase());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const ProjectData = docSnap.data();
                var Erc721ContractAddress = ProjectData.smartContractAddress;
                var Erc721ContractAbi = JSON.parse(ProjectData.smartContractAbi);
                var ContractNetwok = ProjectData.smartContractNetwork;
                const chainid = await new web3.eth.getChainId()
                if (chainid == ContractNetwok) {
                    setloading(true);
                    const daiToken = new web3.eth.Contract(Erc721ContractAbi, Erc721ContractAddress);

                    var amount = ProjectData.publicSalePrice
                    const coolNumber = await daiToken.methods.mintnft(tokenId).send({
                        from: account,
                        to: Erc721ContractAddress,
                        chain: 4,
                        value: amount
                    }).then(async (data) => {
                        window.location.href = "/congratsnft"
                    }).catch((error) => {
                        setloading(false);
                        console.log("error ============ ", error)
                    });
                } else {
                    setloading(false)
                    if (ContractNetwok == 1) {
                        openModal()
                        // alert("Please change network to Ethereum Mainnet First")

                    }
                    else if (ContractNetwok == 3) {
                        openModal()

                        // alert("Please change network to Ropsten Testnet First")


                    }
                    else if (ContractNetwok == 4) {
                        openModal()

                        // alert("Please change network to Rinkeby Testnet First")


                    }
                    else if (ContractNetwok == 137) {
                        openModal()

                        // alert("Please change network to Polygon Mainnet First")

                    }
                    else if (ContractNetwok == 80001) {
                        openModal()

                        // alert("Please change network to Mumbai Testnet First")

                    }

                }




            }
        }

    }
    const getMintedNFTS = async () => {

        const docRef = doc(db, "Projects", queryParam.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const ProjectData = docSnap.data();

            var Erc721ContractAddress = ProjectData.smartContractAddress;
            var contractNetwork = ProjectData.smartContractNetwork;

            var apiurl;
            if (contractNetwork == 4) {
                apiurl = "https://api-rinkeby.etherscan.io/"
                setContractNetworkName("Rinkeby");
                setContractNetworkId(4)
            }
            else if (contractNetwork == 3) {
                apiurl = "https://api-ropsten.etherscan.io/"
                setContractNetworkName("Ropsten");
                setContractNetworkId(3);

            }
            else if (contractNetwork == 1) {
                apiurl = "https://api.etherscan.io/"
                setContractNetworkName("Ethereum Mainnet")
                setContractNetworkId(1)

            }
            else if (contractNetwork == 137) {
                apiurl = "https://api.polygonscan.com/"
                setContractNetworkName("Polygon Mainnet")
                setContractNetworkId(89)

            }
            else if (contractNetwork == 80001) {
                apiurl = "https://api-testnet.polygonscan.com/"
                setContractNetworkName("Polygon Testnet")
                setContractNetworkId(13881)

            }

            axios.get(apiurl + "api?module=account&action=tokennfttx&contractaddress=" + Erc721ContractAddress + "&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8")
                .then((response) => {

                    var MintedData = response.data.result;

                    for (var i = 0; i < MintedData.length; i++) {
                        var mintedTokenId = MintedData[i].tokenID;
                        if (mintednfts.includes(mintedTokenId) === false) {
                            mintednfts.push(mintedTokenId);
                            setmintedListOfNFTtemp([mintNFTs, ...MintedData])
                        }
                    }
                    getProjectContent();

                }).catch((error) => {
                    console.log("Error in GetMetadata Api---->", error)
                })
        }

    }



    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            {console.log("bannerImg123", bannerImg)}
            <section style={{ background: `url(${bannerImg})` }} class="projects-details">
                <div class="container project-detail-container">
                    <button class="live-button" data-aos="fade-up">{status.toUpperCase()}</button>
                    {/* <button class="sold-button">Sold Out</button> */}
                    {launchDate == "" || launchDate == null || launchTime == "" || launchTime == null ? null :
                        <span class="project-date" data-aos="fade-up">{launchDate} {launchTime}</span>
                    }
                    <h3 data-aos="fade-up">{projectName}</h3>
                    {about == null || about == "" ? null :
                        <p class="detail-short-text" data-aos="fade-up">{about}</p>
                    }
                    <div class="detail-social-icon" data-aos="fade-up">
                        <a href={websiteUrl} target="_blank"><i class="fas fa-globe"></i></a>
                        <a href={discordUrl} target="_blank"><i class="fab fa-discord"></i></a>
                        <a href={twitterUrl} target="_blank"><i class="fab fa-twitter"></i></a>
                    </div>
                    {/* <button class="submit-project-btn" type="submit" ><span>Connect</span></button> */}
                    {exploreNFTs.length > 0 ? <h5 data-aos="fade-up">Collection</h5> : null}
                    <div class="tabcontent" style={{ margin: 0 }} data-aos="fade-up">
                        {exploreNFTs.length > 0 ?
                            <div>
                                {exploreNFTs.map((item) => (
                                    <div class="up-tab-data">
                                        <div class="tab-info">
                                            <img src={item.image} />
                                            <h4>{item.name}</h4>
                                            <button onClick={() => { mintNFTs(item.tokenId) }} class="detail-btn"><span>Mint</span></button>
                                        </div>
                                    </div>
                                ))}
                            </div> : null}
                    </div>
                    <h5 data-aos="fade-up">About us</h5>
                    <p class="detail-about-text" data-aos="fade-up">{about}</p>
                    {
                        videoUrl.includes("https" || "http") ?
                            <>
                                <h5 data-aos="fade-up">Video</h5>
                                <p data-aos="fade-up"><iframe width="800" height="450" src={videoUrl == "" ? "https://www.youtube.com/embed/yM9mT0kchtw?controls=0" : videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
                            </>
                            : null
                    }
                    {litePaperUrl ?

                        <div>
                            <section class="whitepaper" id="whitepaper">
                                <div class="container">
                                    <button class="download-btn"><a href={litePaperUrl} target="_blank"><span>View Litepaper</span></a></button>
                                </div>
                            </section>
                        </div> : null}


                    <h5 data-aos="fade-up">Team</h5>
                    {team.length > 0 ?
                        <div data-aos="fade-up">
                            {team.map((item) => (
                                <div class="project-team-info">
                                    <img src={item.teamThumbnailUrl == "" ? defaultimg : item.teamThumbnailUrl} />
                                    <h4>{item.teamName}</h4>
                                    <p>{item.Designation}<br />
                                    </p>
                                    <a href={item.teamDiscordUrl} target="_blank"><i class="fab fa-discord" aria-hidden="true"></i></a>
                                    <a href={item.teamTwitterUrl} target="_blank"><i class="fab fa-twitter" aria-hidden="true"></i></a>
                                    <a href={item.teamInstaUrl} target="_blank"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                                </div>
                            ))}
                        </div> : null}

                    {userNFTs.length > 0 ? <h5 data-aos="fade-up">My NFTS</h5> : null}
                    <div class="tabcontent" style={{ margin: 0 }} data-aos="fade-up">
                        {userNFTs.length > 0 ?
                            <div>
                                {userNFTs.map((item) => (
                                    <div class="up-tab-data">
                                        <div class="tab-info">
                                            <img src={item.image} />
                                            <h4>{item.name}</h4>
                                            {/* <button onClick={() => { mintNFTs(item.tokenId) }} class="detail-btn"><span>Mint</span></button> */}
                                        </div>
                                    </div>
                                ))}
                            </div> : null}
                    </div>
                </div>
            </section>
            {loading ? <div class="waiting-overlay"><div class="waiting" id="text">
                <div class="loading-img"></div>
                <div class="loader"></div>
            </div></div> : null}

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div class="infotext_Modal">
                    <img class="infoImg" src={InfoImg} />
                    <h2>Wrong Network!</h2>
                    <button onClick={() => { switchNetwork() }} class="detail-btn" ><span>Change Network</span></button>
                </div>
            </Modal>

            {/*<Footer />*/}
        </div>
    )
}