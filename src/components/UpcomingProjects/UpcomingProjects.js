
import React, { useState, useEffect, useContext } from 'react'
import '../Styles/style-front.css';
import defaultimg from '../../assets/images/default-img.png';
import comingsoon from '../../assets/images/coming-soon.gif';
import member from '../../assets/images/membership.gif';
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import { UserContext } from '../UseContext.js';
import { useEthers } from "@usedapp/core";
import Modal from 'react-modal';


export default function UpcomingProjects() {

	var ERC721ContractAddress='0xB793f891426D5fc9e883c2c8c14F5C8cc991e4a6'
    var ERCContractAbi=[{"inputs":[{"internalType":"string","name":"MetaUri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"Genesis_Supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_TX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_WALLET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Max_ReservedGenesis","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Max_ReservedMeta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Max_Supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Meta_Supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE_PER_NFT_Genesis","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE_PER_NFT_Meta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WL_Supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"members","type":"address[]"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allCapsules","outputs":[{"internalType":"uint256","name":"tokenid","type":"uint256"},{"internalType":"address","name":"capsuleownerAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allGenesis","outputs":[{"internalType":"uint256","name":"tokenid","type":"uint256"},{"internalType":"address","name":"genesisownerAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"genesisCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMintedGenesisTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMintedMetaCapsule","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"numberOfTokens","type":"uint16"}],"name":"mintGenesisNftPreSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint16","name":"numberOfTokens","type":"uint16"}],"name":"mintMetaCapsuleNftPreSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftsMintedReserveGenesis","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftsMintedReserveMeta","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"numberOfTokens","type":"uint16"}],"name":"reserveMintGenesis","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"numberOfTokens","type":"uint16"}],"name":"reserveMintMeta","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setGenesisPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMax","type":"uint256"}],"name":"setMaxPerWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setMetaBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setMetaNFTPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setSaleIsActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setWhiteListEnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    // var netwokUrl = 'https://polygon-mumbai.g.alchemy.com/v2/deAwtSML_l5cXUEMuwl2IqjyAD0lRTmy'
    var netwokUrl= 'https://polygon-mainnet.g.alchemy.com/v2/SVdVVUkdUK6uFUDAMxRVe6n3epdLaZqD'

    // var netwokUrl= 'https://polygon-mainnet.g.alchemy.com/v2/SVdVVUkdUK6uFUDAMxRVe6n3epdLaZqD'
	const { activateBrowserWallet, account, deactivate } = useEthers();
	const [projectType, setProjectType] = useState(0);
	const [projectsDataUpcoming, setProjectsDataUpcoming,] = useState([]);
	const [projectsDataUpcomingtemp, setProjectsDataUpcomingtemp] = useState([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [projectsDataLaunched, setProjectsDataLaunched,] = useState([]);
	const [projectsDataLaunchedtemp, setProjectsDataLaunchedtemp] = useState([]);
	const { userGensisMebershipCount, setUserGensisMebershipCount, userMetaMebershipCount, setUserMetaMebershipCount } = useContext(UserContext);



	useEffect(() => {
		getProjectsDetails()
	}, [])

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





	const getProjectsDetails = async () => {
		const querySnapshot = await getDocs(collection(db, "Projects"));
		querySnapshot.forEach((doc) => {
			var data = doc.data()
			if (data.status == 'upcoming') {
				if (projectsDataUpcoming.filter(x => x.id === data.id).length === 0) {
					projectsDataUpcoming.push(data);
					projectsDataUpcomingtemp.push(data)
					setProjectsDataUpcomingtemp([...projectsDataUpcoming, data])
				}
				else {
					console.log("duplicate collection")
				}
			}
			else if (data.status == 'launched') {
				if (projectsDataLaunched.filter(x => x.id === data.id).length === 0) {
					projectsDataLaunched.push(data);
					projectsDataLaunchedtemp.push(data)
					setProjectsDataLaunchedtemp([...projectsDataLaunched, data])
				}
				else {
					console.log("duplicate collection")
				}
			}
			else {

			}
		});
	}

	const checkCurrentMembership = async () => {
		var result1;
		var result2;
		const web3 = new Web3(netwokUrl);
		const daiToken = new web3.eth.Contract(ERCContractAbi, ERC721ContractAddress);
		await daiToken.methods.getMintedGenesisTokens().call().then((data1) => {
			result1 = data1
		}).catch((error) => {
			console.log("Error in GetNFT Api---->", error)
		})
		await daiToken.methods.getMintedMetaCapsule().call().then((data2) => {

			result2 = data2
		}).catch((error) => {
			console.log("Error in GetNFT Api---->", error)
		})
		GetNft(result1, result2)


	}


	const GetNft = async (value1, value2) => {
		console.log("value1", value1)
		console.log("value2", value2)

		var mintedTier1Tokens = value1;
		var mintedTier2Tokens = value2;

		console.log("account in GetNft", account);
		var userWalletAddress = window.localStorage.getItem("walletAddress");
		console.log("userWalletAddress in MyNFT.js", userWalletAddress)
		var i;
		var data = [];
		console.log(">>", "https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
		await axios.get("https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=" + ERC721ContractAddress + "&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=V9UQDWAWUTDV32TEHJMEFXTSVT71VTHFF8" + "&address=" + userWalletAddress)
			.then(async (response) => {
				data = response.data.result
				console.log("data Array---->>", data)
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
					console.log("tokendata", tokendata)

					console.log("daiToken12", daiToken.methods)
					await daiToken.methods.ownerOf(tokendata).call().then(async (data) => {
						console.log("data---->", JSON.stringify(data))
						console.log("userWalletAddress---->", JSON.stringify(userWalletAddress));
						var data = JSON.stringify(data);
						var addrss = JSON.stringify(userWalletAddress);
						var accontAdd = data.toLowerCase()
						var wallAdd = addrss.toLowerCase()
						if (accontAdd == wallAdd) {
							var userArrayLength = userNFTs.length

							if (mintedTier1Tokens.includes(tokendata)) {
								var obj = {
									"tokenid": tokendata,
									"name": "NFT" + tokendata,
								}
								if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
									userNFTs.push(obj);
									listOfNFTtemp.push(obj)
									userNFTs[userArrayLength]["membership"] = "tier1";
									setUserNFTs111([...userNFTs, obj]);
								}

							}
							else if (mintedTier2Tokens.includes(tokendata)) {
								var obj = {
									"tokenid": tokendata,
									"name": "NFT" + tokendata,
								}
								if (userNFTs.filter(x => x.tokenid === tokendata).length === 0) {
									userNFTs.push(obj);
									listOfNFTtemp.push(obj)
									userNFTs[userArrayLength]["membership"] = "tier2";
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
							// CurrentMembership()

						}
					}).catch((error) => {
						console.log("error ownerof ============ ", error)
					});
				}

			}).catch((error) => {
				console.log("Error in GetNFT Api---->", error)
			})
	}


	const gotoDetailPage = (id, projectTier) => {
		if (account == "" || account == undefined || account == null) {
			window.location.href = "/connect"
		} else {
			var ProjectTier = projectTier;
			if (userGensisMebershipCount > 0 && ProjectTier == "tier1") {
				window.location.href = "/projectdetails?detail=" + id;
			}
			else if (userMetaMebershipCount > 0 && ProjectTier == "tier2") {
				window.location.href = "/projectdetails?detail=" + id;
			}
			else {
				openModal();
			}
		}



	}

	const goformembership = () => {
		closeModal();
		window.location.href = "/#membership"
	}

	return (
		<div>
			<section class="upcoming-section" data-aos="fade-up">
				<div class="container">
					<div class="tab">
						<button class={projectType == 0 ? "tablinks lactive" : null} onClick={() => { setProjectType(0) }} >UPCOMING</button>
						<button class={projectType == 1 ? "tablinks  octive" : null} onClick={() => { setProjectType(1) }}>LAUNCHED</button>
					</div>
					{/* Upcoming */}

					{projectType == 0 ?

						<div id="select" class="tabcontent">
							{projectsDataUpcoming.length > 0 ?
								<div>
									{projectsDataUpcoming.map((item) => (
										<div class="up-tab-data">
											<div class="tab-info">
												<img src={item.thumbnailImg} />
												<h4>{item.projectName}</h4>
												<span>Date : {item.launchDate}</span>
												<div class="tab-icons">
													<a href={item.websiteUrl} target="_blank"><i class="fas fa-globe"></i></a>
													<a href={item.discordUrl} target="_blank"><i class="fab fa-discord"></i></a>
													<a href={item.twitterUrl} target="_blank"><i class="fab fa-twitter"></i></a>
												</div>
												<p>{(item.shortdes)}</p>

											</div>
										</div>
									))}

								</div> :
								<img src={comingsoon} class="coming-soon" />

							}



						</div> :

						// launched
						<div id="create" class="tabcontent">



							{projectsDataLaunched.length > 0 ?
								<div>
									{projectsDataLaunched.map((item) => (
										<div class="up-tab-data">
											<div class="tab-info">
												<img src={item.thumbnailImg} />
												<h4>{item.projectName}</h4>
												<span>Date : {item.launchDate}</span>
												<div class="tab-icons">
													<a href={item.websiteUrl} target="_blank"><i class="fas fa-globe"></i></a>
													<a href={item.discordUrl} target="_blank"><i class="fab fa-discord"></i></a>
													<a href={item.twitterUrl} target="_blank"><i class="fab fa-twitter"></i></a>
												</div>
												<p>{item.shortdes}</p>
												<span>{item.projectTier}</span>
												<button onClick={() => { gotoDetailPage(item.id, item.projectTier) }} class="detail-btn"><span>Details</span></button>
												{/* <button disabled style={{cursor:'not-allowed'}} class="detail-btn"><span>Details</span></button> */}

											</div>
										</div>
									))}
								</div> : <img src={comingsoon} class="coming-soon" />
							}



						</div>

					}
					
				</div>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
					shouldCloseOnOverlayClick={false}
				>
					<div class="infotext_Modal">
						<img class="infoImg" src={member} />
						<h2>No Membership!</h2>
						<button onClick={() => { goformembership() }} class="detail-btn"><span>Get Membership</span></button>
					</div>
				</Modal>

			</section>
		</div>
	)
}
