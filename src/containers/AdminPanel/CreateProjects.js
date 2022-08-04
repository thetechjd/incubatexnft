import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import nextId from "react-id-generator";
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';
export default function CreateProjects() {
    const [projectID, setProjectID] = useState(0);
    const [projectName, setProjectName] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [launchTime, setLaunchTime] = useState("");
    const [status, setStatus] = useState("launched");
    const [projectTier, setProjectTier] = useState("tier1");
    const [shortdes, setShortdes] = useState("");
    const [about, setAbout] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [discordUrl, setDiscordUrl] = useState("");
    const [thumbnailImg, setThumbnailImg] = useState("");
    const [litePaperFile, setLitePaperFile] = useState("");
    const [litePaperFileName, setLitePaperFileName] = useState("");
    const [bannerImg, setbannerImg] = useState("");

    const [contractAddress, setContractAddress] = useState("");
    const [contractAbi, setContractAbi] = useState("");
    const [contractNetwork, setContractNetwork] = useState("4")
    const [maxsupply, setMaxSupply] = useState("");
    const [metaDataUrl, setMetaDataUrl] = useState("");
    const [preSalefuncName, setPreSalefuncName] = useState("");
    const [publicSalefuncName, setPublicSalefuncName] = useState("");
    const [preSalePrice, setPreSalePrice] = useState("");
    const [publicSalePrice, setPublicSalePrice] = useState("");
    const [preSaleActiveFunc, setPreSaleActiveFunc] = useState("");
    const [publicSaleActiveFunc, setPublicSaleActiveFunc] = useState("");

    const [inputList, setInputList] = useState([{ teamName: "", Designation: "", teamTwitterUrl: "", teamDiscordUrl: "", teamInstaUrl: "", teamThumbnailUrl: "" }]);
    const [teamThumbImg, setTeamThumbImg] = useState("")
    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

    const [displayprojthumbnail, setDisplayprojthumbnail] = useState("")
    const [displayprojbanner, setDisplayprojbanner] = useState("")


    const [loading, setloading] = useState(false)

    useEffect(() => {
        getCurrentProjectId()
    }, [])

    const getCurrentProjectId = async () => {

        var getProjectId = Date.now()
        setProjectID(getProjectId);
    }

    const addProject = async () => {

        var projectThumbnailUrl;
        var projectBannerUrl;
        var litepaperUrl;
        console.log("hey there")
        if (status == "upcoming") {
            if (projectName.trim() == "" || projectName.trim() == null) {
                alert("Project Name is required")
            }
            else if (status.trim() == "" || status.trim() == null) {
                alert("Please select project status")
            }
            else if (projectTier.trim() == "" || projectTier.trim() == null) {
                alert("Please select project tier")
            }
            else if (shortdes.trim() == "" || shortdes.trim() == null) {
                alert("Please add project short description")
            }
            else if (about.trim() == "" || about.trim() == null) {
                alert("Please add about project")
            }
            else if (thumbnailImg.name == "" || thumbnailImg.name == null) {
                alert("Please add project thumbnail Image")
            }
            else if (bannerImg.name == "" || bannerImg.name == null) {
                alert("Please add project banner Image")
            }
            else if (contractAddress.trim() == "" || contractAddress.trim() == null) {
                alert("Please add project contract address")
            }
            else if (contractAbi.trim() == "" || contractAbi.trim() == null) {
                alert("Please add project contract ABI")
            }
            else if (contractNetwork.trim() == "" || contractNetwork.trim() == null) {
                alert("Please add contract network")
            }
            else if (maxsupply.trim() == "" || maxsupply.trim() == null) {
                alert("Please add Max Supply")
            }
            else if (metaDataUrl.trim() == "" || metaDataUrl.trim() == null) {
                alert("Please add Metadata Url")
            }
            else if (publicSalePrice.trim() == "" || publicSalePrice.trim() == null) {
                alert("Please add Public Sale Price")
            }

            else {
                setloading(true);
                console.log("is it here")
                var projImageUrl = thumbnailImg;
                console.log("newsImageUrl", projImageUrl.name)
                if (thumbnailImg.name) {
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID + ".png");
                    await uploadBytes(storageRef, thumbnailImg);
                    await getDownloadURL(storageRef).then((url) => { projectThumbnailUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("projImageUrl ======== ", projectThumbnailUrl)
                }
                var projbannerImageUrl = bannerImg;
                if (bannerImg.name) {
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID + '_' + ".png");
                    await uploadBytes(storageRef, bannerImg);
                    await getDownloadURL(storageRef).then((url) => { projectBannerUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("projImageUrl ======== ", projectBannerUrl)
                }
                if (litePaperFile.name) {
                    setLitePaperFileName(litePaperFile.name)
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID);
                    await uploadBytes(storageRef, litePaperFile);
                    await getDownloadURL(storageRef).then((url) => { litepaperUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("litepaperUrl ======== ", litepaperUrl)
                }

                const washingtonRef = doc(db, "Projects", projectID.toString());
                console.log("washingtonRef list", inputList)
                var ProjectDetails = {
                    id: projectID,
                    projectName: projectName.trim(),
                    launchDate: launchDate,
                    launchTime: launchTime,
                    status: status,
                    projectTier: projectTier,
                    about: about,
                    shortdes: shortdes,
                    videoUrl: videoUrl,
                    websiteUrl: websiteUrl,
                    twitterUrl: twitterUrl,
                    discordUrl: discordUrl,
                    thumbnailImg: projectThumbnailUrl,
                    litePaperFileUrl: litepaperUrl,
                    litePaperFileName: litePaperFile.name,
                    bannerUrl: projectBannerUrl,
                    team: inputList,
                    smartContractAddress: contractAddress,
                    smartContractAbi: contractAbi,
                    smartContractNetwork: contractNetwork,
                    maxSupply: maxsupply,
                    metaUrl: metaDataUrl,
                    publicSalePrice: publicSalePrice,
                }
                console.log("ProjectDetails", ProjectDetails)
                const aaa = await setDoc(washingtonRef, ProjectDetails);


                //   setNewsThumbnail("")
                setloading(false);
                alert("Project Added Sucessfully.");
                window.location.href = "/admin/projects"
            }
        } else {
            console.log("inputList", inputList)
            if (projectName.trim() == "" || projectName.trim() == null) {
                alert("Project Name is required")
            }
            else if (status.trim() == "" || status.trim() == null) {
                alert("Please select project status")
            }
            else if (launchDate.trim() == "" || launchDate.trim() == null) {
                alert("Please select project launch date")
            }
            else if (launchTime.trim() == "" || launchTime.trim() == null) {
                alert("Please select project launch Time")
            }
            else if (inputList[0].teamName == "") {
                alert("Please select team")
            }
            else if (inputList[0].Designation == "") {
                alert("Please add team member Designation")
            }
            else if (inputList[0].teamTwitterUrl == "") {
                alert("Please add team member teamTwitterUrl")
            }
            else if (inputList[0].teamInstaUrl == "") {
                alert("Please select team member teamInstaUrl")
            }
            else if (inputList[0].teamDiscordUrl == "") {
                alert("Please select team member teamDiscordUrl")
            }
            else if (projectTier.trim() == "" || projectTier.trim() == null) {
                alert("Please select project tier")
            }
            else if (shortdes.trim() == "" || shortdes.trim() == null) {
                alert("Please add project short description")
            }
            else if (about.trim() == "" || about.trim() == null) {
                alert("Please add about project")
            }

            else if (videoUrl.trim() == "" || videoUrl.trim() == null) {
                alert("Please add project video url")
            }
            else if (websiteUrl.trim() == "" || websiteUrl.trim() == null) {
                alert("Please add project website url")
            }
            else if (twitterUrl.trim() == "" || twitterUrl.trim() == null) {
                alert("Please add project twitter url")
            }
            else if (discordUrl.trim() == "" || discordUrl.trim() == null) {
                alert("Please add project discord url")
            }
            else if (thumbnailImg.name == "" || thumbnailImg.name == null) {
                alert("Please add project thumbnail Image")
            }
            else if (bannerImg.name == "" || bannerImg.name == null) {
                alert("Please add project banner Image")
            }
            else if (contractAddress.trim() == "" || contractAddress.trim() == null) {
                alert("Please add project contract address")
            }
            else if (contractAbi.trim() == "" || contractAbi.trim() == null) {
                alert("Please add project contract ABI")
            }
            else if (contractNetwork.trim() == "" || contractNetwork.trim() == null) {
                alert("Please add contract network")
            }
            else if (maxsupply.trim() == "" || maxsupply.trim() == null) {
                alert("Please add Max Supply")
            }
            else if (metaDataUrl.trim() == "" || metaDataUrl.trim() == null) {
                alert("Please add Metadata Url")
            }
            else if (publicSalePrice.trim() == "" || publicSalePrice.trim() == null) {
                alert("Please add Public Sale Price")
            }

            else {
                setloading(true);
                console.log("is it here")
                var projImageUrl = thumbnailImg;
                console.log("newsImageUrl", projImageUrl.name)
                if (thumbnailImg.name) {
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID + ".png");
                    await uploadBytes(storageRef, thumbnailImg);
                    await getDownloadURL(storageRef).then((url) => { projectThumbnailUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("projImageUrl ======== ", projectThumbnailUrl)
                }
                var projbannerImageUrl = bannerImg;
                if (bannerImg.name) {
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID + '_' + ".png");
                    await uploadBytes(storageRef, bannerImg);
                    await getDownloadURL(storageRef).then((url) => { projectBannerUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("projImageUrl ======== ", projectBannerUrl)
                }

                if (litePaperFile.name) {
                    setLitePaperFileName(litePaperFile.name);
                    const storageRef = ref(storage, '/Images/ProjectImages/' + projectName + projectID);
                    await uploadBytes(storageRef, litePaperFile);
                    await getDownloadURL(storageRef).then((url) => { litepaperUrl = url }).catch((e) => { console.log("err", e) });
                    console.log("litepaperUrl ======== ", litepaperUrl)
                }


                const washingtonRef = doc(db, "Projects", projectID.toString());
                console.log("washingtonRef list", inputList)
                var ProjectDetails = {
                    id: projectID,
                    projectName: projectName.trim(),
                    launchDate: launchDate,
                    launchTime: launchTime,
                    status: status,
                    projectTier: projectTier,
                    about: about,
                    shortdes: shortdes,
                    videoUrl: videoUrl,
                    websiteUrl: websiteUrl,
                    twitterUrl: twitterUrl,
                    discordUrl: discordUrl,
                    thumbnailImg: projectThumbnailUrl,
                    bannerUrl: projectBannerUrl,
                    litePaperFileUrl: litepaperUrl,
                    litePaperFileName: litePaperFile.name,
                    team: inputList,
                    smartContractAddress: contractAddress,
                    smartContractAbi: contractAbi,
                    smartContractNetwork: contractNetwork,
                    maxSupply: maxsupply,
                    metaUrl: metaDataUrl,
                    publicSalePrice: publicSalePrice,
                }
                console.log("ProjectDetails", ProjectDetails)
                const aaa = await setDoc(washingtonRef, ProjectDetails);


                //   setNewsThumbnail("")
                setloading(false);
                alert("Project Added Sucessfully.");
                window.location.href = "/admin/projects"
            }
        }


    }
    const onLitePaperChoose = (event) => {
        if (event.target.files && event.target.files[0]) {
            let litefile = event.target.files[0];
            setLitePaperFile(litefile)
            console.log(litefile)
        }
    };

    const onImageChoose = (event) => {
        setDisplayprojthumbnail("")
        console.log("event", event)

        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setThumbnailImg(img)
            console.log(img)
            setDisplayprojthumbnail(URL.createObjectURL(event.target.files[0]))
        }
    };

    const onImageBannerChoose = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setbannerImg(img)
            console.log(img)
            setDisplayprojbanner(URL.createObjectURL(event.target.files[0]))
        }
    }


    // handle input change
    const handleInputChange = (e, index) => {
        console.log("e.target", e.target)
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleInputChangeImage = async (e, index) => {
        var createImgId = Date.now()
        console.log("handleInputChangeImage12")
        console.log("e.target", e.target.files[0])

        const { name, value } = e.target;
        const list = [...inputList];
        //ethe oh value ainne jede ase set krana chahde field ch
        let img = e.target.files[0];
        setTeamThumbImg(img);
        var teamThumbnailUrl;
        var teamImageUrl = e.target.files[0];
        console.log("newsImageUrl123", teamImageUrl)
        console.log("newsImageUrl", teamImageUrl.name)
        console.log("img22", img)
        if (teamImageUrl.name) {
            console.log("here", teamImageUrl.name)
            const storageRef = ref(storage, '/Images/TeamImages/' + teamImageUrl.name);
            await uploadBytes(storageRef, img);
            await getDownloadURL(storageRef).then(async (url) => {
                console.log("getTeamThumnailUrl", url)
                if (url) {
                    list[index][name] = url
                    console.log("list", list)
                    setInputList(list);
                }
                else {
                    console.log("url is ", url)
                }
            }).catch((e) => { console.log("err", e) });
            console.log("teamImageUrl ======== ", teamThumbnailUrl)
        }


    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { teamName: "", Designation: "", teamTwitterUrl: "", teamDiscordUrl: "", teamInstaUrl: "", teamThumbnailUrl: "" }]);
    };
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    return (
        <div class="bg-color">
            <AdminHeader />
            <Sidebar />

            <section class="right-panel">
                <div class="top-listing-add-edit">
                    <h2>Add new project</h2>
                </div>

                <div class="bottom-listing-add-edit">
                    <table class="first-table">
                        <tr>
                            <td class="first">Project name</td>
                            <td class="second"><input value={projectName} onChange={(e) => { setProjectName(e.target.value) }} type="text" /></td>
                        </tr>
                        <tr>
                            <td class="first">Launch date</td>
                            <td class="second"><input value={launchDate} onChange={(e) => { setLaunchDate(e.target.value) }} type="date" /></td>
                        </tr>
                        <tr>
                            <td class="first">Launch time</td>
                            <td class="second"><input value={launchTime} onChange={(e) => { setLaunchTime(e.target.value) }} type="time" name="ltime" /></td>
                        </tr>
                        <tr>
                            <td class="first">Status</td>
                            <td class="second">
                                <select value={status} onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="launched">Launched</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td class="first">Project For Tier</td>
                            <td class="second">
                                <select value={projectTier} onChange={(e) => { setProjectTier(e.target.value) }}>
                                    <option value="tier1">Tier 1</option>
                                    <option value="tier2">Tier 2</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Short Description(b/w 2 to 50 words)</td>
                            <td class="second"><textarea maxlength="100" value={shortdes} onChange={(e) => { setShortdes(e.target.value) }}></textarea></td>
                        </tr>
                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>About project</td>
                            <td class="second"><textarea value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea></td>
                        </tr>
                        <tr>
                            <td class="first">Video Url</td>
                            <td class="second"><input value={videoUrl} onChange={(e) => { setVideoUrl(e.target.value) }} type="text" /></td>
                        </tr>
                        <tr>
                            <td class="first">Website url</td>
                            <td class="second"><input value={websiteUrl} onChange={(e) => { setWebsiteUrl(e.target.value) }} type="text" /></td>
                        </tr>
                        <tr>
                            <td class="first">Twitter url</td>
                            <td class="second"><input value={twitterUrl} onChange={(e) => { setTwitterUrl(e.target.value) }} type="text" /></td>
                        </tr>
                        <tr>
                            <td class="first">Discord url</td>
                            <td class="second"><input value={discordUrl} onChange={(e) => { setDiscordUrl(e.target.value) }} type="text" /></td>
                        </tr>
                    </table>
                    <table class="second-table">

                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Add LitePaper</td>
                            <td class="second"><input type="file" onChange={(e) => { onLitePaperChoose(e) }} />
                                <div class="file-overlay">

                                    <span><i class="fas fa-file-upload"></i>Choose File</span>
                                    <span>{litePaperFile.name}</span>

                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Thumbnail Image</td>
                            <td class="second"><input type="file" onChange={(e) => { onImageChoose(e) }} />
                                <div class="file-overlay">

                                    <span><i class="fas fa-file-upload"></i>For best result upload dimensions- 350 X 350</span>


                                </div>
                                <img src={displayprojthumbnail} className="news-image" />

                            </td>

                        </tr>
                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Banner Image</td>
                            <td class="second"><input type="file" onChange={(e) => { onImageBannerChoose(e) }} />
                                <div class="file-overlay">
                                    <span><i class="fas fa-file-upload"></i>For best result upload dimensions- 1920X600</span>


                                </div>
                                <img src={displayprojbanner} className="news-image" />
                            </td>

                        </tr>
                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Team</td>
                            <td class="second">
                                {inputList.map((x, i) => {
                                    return (
                                        <div class="add-new">
                                            <table>
                                                <tr>
                                                    <td>Name</td>
                                                    <td><input name="teamName" value={x.teamName} onChange={(e) => { handleInputChange(e, i) }} type="text" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Designation</td>
                                                    <td><input name="Designation" value={x.Designation} onChange={(e) => { handleInputChange(e, i) }} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Twitter url</td>
                                                    <td><input name="teamTwitterUrl" value={x.teamTwitterUrl} onChange={(e) => { handleInputChange(e, i) }} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Discord url</td>
                                                    <td><input name="teamDiscordUrl" value={x.teamDiscordUrl} onChange={(e) => { handleInputChange(e, i) }} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Instagram url</td>
                                                    <td><input type="text" name="teamInstaUrl" value={x.teamInstaUrl} onChange={(e) => { handleInputChange(e, i) }} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Thumbnail</td>
                                                    <td><input name="teamThumbnailUrl" onChange={(e) => { handleInputChangeImage(e, i) }} type="file" /></td>
                                                </tr>
                                            </table>
                                            <div>
                                                {inputList.length !== 1 && <button
                                                    class="add-more"
                                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                                {inputList.length - 1 === i && <button class="add-more" onClick={handleAddClick}>Add More</button>}
                                            </div>
                                        </div>

                                    );
                                })}


                                {/* <button class="add-more"><i class="fas fa-plus"></i> Add More</button> */}
                            </td>
                        </tr>
                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Smart Contract</td>
                            <td class="second">
                                <div class="add-new">
                                    <table>
                                        <tr>
                                            <td>Contract Address</td>
                                            <td><input type="text" value={contractAddress} onChange={(e) => { setContractAddress(e.target.value) }} /></td>
                                        </tr>
                                        <tr>
                                            <td>Contract Abi</td>
                                            <td><textarea value={contractAbi} onChange={(e) => { setContractAbi(e.target.value) }}></textarea></td>
                                        </tr>

                                        <tr>
                                            <td>Max Supply</td>
                                            <td><input value={maxsupply} onChange={(e) => { setMaxSupply(e.target.value) }} type="text" /></td>
                                        </tr>

                                        <tr>
                                            <td>Contract Network</td>
                                            <select value={contractNetwork} onChange={(e) => { setContractNetwork(e.target.value) }}>
                                                <option value="1"> Ethereum Mainnet</option>
                                                <option value="137">Polygon Mainnet</option>
                                                <option value="13881">Mumbai Testnet</option>
                                                <option value="4">Rinkeby Testnet</option>
                                                <option value="3">Ropston Testnet</option>



                                            </select>
                                        </tr>

                                        <tr>
                                            <td>MetaData Url</td>
                                            <td><input value={metaDataUrl} onChange={(e) => { setMetaDataUrl(e.target.value) }} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td>NFT Price(in wei)</td>
                                            <td><input value={publicSalePrice} onChange={(e) => { setPublicSalePrice(e.target.value) }} type="text" /></td>
                                        </tr>

                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="first"></td>
                            <td class="second buttons">
                                <button onClick={() => { addProject() }} class="update-button">Add</button>
                                <button class="close-button">Close</button>
                            </td>
                        </tr>
                    </table>
                </div>

            </section>
            {loading ? <div class="waiting-overlay"><div class="waiting" id="text">
                <div class="loading-img"></div>
                <div class="loader"></div>
            </div></div> : null}

        </div>
    )
}
