
import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import { useHistory } from "react-router-dom";
import defaultimg from '../../assets/images/default-img.png';
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';

export default function Projects() {
    let history = useHistory();
    const [projectsData, setProjectsData] = useState([]);
    const [projectsDatatemp, setProjectsDatatemp] = useState([]);
    const [projectsDatatemp2, setProjectsDatatemp2] = useState([]);



    useEffect(() => {
        getProjectsDetails()
    }, [])



    const getProjectsDetails = async () => {
        console.log("getProjectsDetails", getProjectsDetails)
        const querySnapshot = await getDocs(collection(db, "Projects"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (projectsData.filter(x => x.id === data.id).length === 0) {
                projectsData.push(data);
                projectsDatatemp.push(data)

                setProjectsDatatemp2([...projectsData, data])
            }
            else {
                console.log("duplicate collection")
            }
        });
    }
    const filterProject = (value) => {
        console.log("value to filter", value);
        var fulldata = projectsDatatemp;
        console.log("fulldata to filter", fulldata);
        if (value == "all") {

            setProjectsData(fulldata);
        }
        else {
            var filteredData = fulldata.filter(x => x.status == value);
            setProjectsData(filteredData);
            console.log("filterProject-----", projectsData)
            console.log("filterProject", projectsData);
        }




    }

    const gotoEditPage = (id) => {
        window.location.href = "/admin/editproject?edit=" + id;
    }

    const deleteProject = async (id) => {
        await deleteDoc(doc(db, "Projects", id.toString()));
        alert("Project Deleted Sucessfully")
        window.location.reload()
    }

    const createProject = () => {
        window.location.href = "/admin/createproject"
    }

    return (
        <div class="bg-color">
            <AdminHeader />
            <Sidebar />

            <section class="right-panel">
                <div class="top-listing">
                    <h2>Projects</h2>
                    <div class="add-button"><a href="/admin/createproject">Add Project</a></div>
                    <div class="filter">
                        Filter by :
                        <select onChange={(e) => { filterProject(e.target.value) }}>
                            <option value="all">All</option>
                            <option value="launched">Launched</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                </div>

                <div class="bottom-listing">
                    {projectsData.length > 0 ?
                        <div>
                            <table>
                                <tr class="top-border">
                                    <td class="w-10">Image</td>
                                    <td class="w-20">Project Name</td>
                                    <td class="w-15">Launch Date</td>
                                    <td class="w-15">Launch Time</td>
                                    <td class="w-15">Website Url</td>
                                    <td class="w-10">Status</td>
                                    <td class="w-15">Actions</td>
                                </tr>

                                {console.log("projectsData", projectsData)}
                                {projectsData.map((item) => (
                                    <tr>
                                        <td><img src={item.thumbnailImg == "" ? defaultimg : item.thumbnailImg} /></td>
                                        <td>{item.projectName}</td>
                                        {item.status == "upcoming" ? <td>--</td> : <td>{item.launchDate}</td>}
                                        {item.status == "upcoming" ? <td>--</td> : <td>{item.launchTime}</td>}

                                        <td>{item.websiteUrl}</td>
                                        <td><select class="upcoming"><option selected>{item.status}</option></select></td>
                                        <td><button onClick={() => { gotoEditPage(item.id) }} class="edit"><i class="fas fa-pencil-alt"></i> Edit</button>
                                            <button onClick={() => { deleteProject(item.id) }} class="delete"><i class="fas fa-trash-alt"></i> Delete</button></td>

                                    </tr>
                                ))}

                            </table>
                        </div> : null}
                </div>

            </section>
        </div>
    )
}
