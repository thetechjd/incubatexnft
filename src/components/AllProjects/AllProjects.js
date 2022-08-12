
import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../NavBar/Navbar.js'
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import '../Styles/style-inner.css'
import Footer from '../Footer/Footer.js';
import Stickysocial from '../StickySocials/Stickysocial.js';
import { UserContext } from '../UseContext.js';
import comingsoon from '../../assets/images/coming-soon.gif';
import member from '../../assets/images/membership.gif';
import Modal from 'react-modal';

export default function AllProjects() {

    const [projectType, setProjectType] = useState(0);
    const [projectsDataUpcoming, setProjectsDataUpcoming,] = useState([]);
    const [projectsDataUpcomingtemp, setProjectsDataUpcomingtemp] = useState([]);
    const { userGensisMebershipCount, setUserGensisMebershipCount, userMetaMebershipCount, setUserMetaMebershipCount } = useContext(UserContext);


    const [projectsDataLaunched, setProjectsDataLaunched,] = useState([]);
    const [projectsDataLaunchedtemp, setProjectsDataLaunchedtemp] = useState([]);
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
        getProjectsDetails()
    }, [])

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
            } else {

            }


        });
    }

    const gotoSubmitProject = () => {
        window.location.href = "/submitproject";
    }
    const gotoDetailPage = (id, projectTier) => {

        var ProjectTier = projectTier;
        if (userGensisMebershipCount > 0 && ProjectTier == "tier1") {
            window.location.href = "/projectdetails?detail=" + id;
        }
        else if (userMetaMebershipCount > 0 && ProjectTier == "tier2") {
            window.location.href = "/projectdetails?detail=" + id;
        }
        else {
            window.location.href = "/projectdetails?detail=" + id;
            // openModal()
        }
    }

    return (
        <div>
            <Navbar />
            <Stickysocial />
            {/* <!-- Upcoming projects --> */}

            <section class="inner-banner"></section>
            <section class="projects-launched" data-aos="fade-up">
                <div class="container">
                    <h3>Upcoming Projects</h3>
                    <div id="create" class="tabcontent">
                        {console.log("projectsDataUpcoming", projectsDataUpcoming)}

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
                                            <p>{item.about}</p>
                                            <span>{item.projectTier}</span>
                                            <button onClick={() => { gotoDetailPage(item.id, item.projectTier) }} class="detail-btn"><span>Details</span></button>

                                        </div>
                                    </div>
                                ))}
                            </div> : <img src={comingsoon} class="coming-soon" />

                        }



                    </div>
                </div>
            </section>


            {/* <!-- Launched projects --> */}
            <section class="projects-launched" data-aos="fade-up">
                <div class="container">
                    <h3>Launched Projects</h3>
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
                                            <p>{item.about}</p>
                                            <span>{item.projectTier}</span>
                                            <button onClick={() => { gotoDetailPage(item.id, item.projectTier) }} class="detail-btn"><span>Details</span></button>
                                            {/* <button disabled style={{cursor:'not-allowed'}} class="detail-btn"><span>Details</span></button> */}

                                        </div>
                                    </div>
                                ))}
                            </div> : <img src={comingsoon} class="coming-soon" />}

                    </div>

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
                        <button onClick={() => { window.location.href = "/#membership" }} class="detail-btn"><span>Get Membership</span></button>
                    </div>
                </Modal>

            </section>
            <Footer />
        </div>
    )
}
