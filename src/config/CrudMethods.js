import { collection, getDocs, onSnapshot, setDoc, doc, query, where, orderBy, collectionGroup, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

const CrudMethods = {
    RegisterUser: async function (collectionName, RegisterData, docID) {

        //const res = await setDoc(collection(db, collectionName), RegisterData, '0');

        const docRef = doc(db, collectionName, docID);
        const res = await setDoc(docRef, RegisterData);

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log('Added document with ID: ', JSON.stringify(res));
        }

    },

    queryDocId: async function (collectionName, docID) {
        var docIDName = '';

        const collectionRef = collection(db, collectionName);

        const queryRef = query(collectionRef, where("wallet_id", "==", docID));

        const querySnapshot = await getDocs(queryRef);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            docIDName = doc.id;
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(doc.id, " => ", doc.data());
            }
        });

        //console.log("Query of the Database: ", JSON.stringify(queryRef));

        return '' + docIDName;
    },

    queryList: async function (collectionName, setList1, setList2, varData, condition, value) {
        const collectionRef = collection(db, collectionName);

        const queryRef = query(collectionRef, where(varData, condition, value));

        const querySnapshot = await getDocs(queryRef);

        var list = [];
        querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data())
        });
        list.sort(GetSortOrder('nftName'));
        setList2(list)
        //console.log("Query of the Database: ", JSON.stringify(queryRef));

        return setList1(list);
    },

    getSnapShots: async function (collectionName, setArtWork, status) {
        onSnapshot(collection(db, collectionName),
            (snapshot) => {
                //console.log('Snapshot Data ', snapshot);

                const balls = [];

                snapshot.forEach((doc) => {
                    balls.push(doc.data());
                });



                // console.log("Current Balls: ", balls);

                if (status == '1') {
                    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                        console.log("Dev Team Data: ", balls);
                    }

                    return setArtWork(balls);
                } else {
                    var ArrayInsideObject = { title: "", rows: balls };

                    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                        console.log("Array of faq Inside Object : ", ArrayInsideObject);
                    }

                    return setArtWork(ArrayInsideObject);
                }

            },
            (error) => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('Error in the Snapshot', error);
                }

                return error;
            });
    },

    getSingleDoc: async function (collectionName, docID, setData) {

        // const docRef = doc(db, collectionName, docID);
        // const docSnap = await getDoc(docRef);
        onSnapshot(doc(db, collectionName, docID), (docInfo) => {
            console.log("Current data: ", docInfo.data())

            var arrayMethod = docInfo.data();

            // var Variables = normalFunctions.replaceJSX(docInfo.data().overviewTitle, "\n", "<br />")

            // var PostMintText = normalFunctions.replaceJSX(docInfo.data().sectionFooterSubtitle3, "\n", "<br />")

            // Variables = JSON.parse(Variables);

            // PostMintText = JSON.parse(PostMintText);

            // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            //     console.log('asfsafjafjagfigaf : ', Variables + '   ' + PostMintText);
            // }

            // arrayMethod.overviewTitle = Variables;

            // arrayMethod.sectionFooterSubtitle3 = PostMintText;

            setData(arrayMethod);
        },
            (error) => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('Error in the Single Snapshot', error);
                }

                return error;
            });

    },

    getSingleDocbyId: async function (collectionName, docID, setData) {

        // const docRef = doc(db, collectionName, docID);
        // const docSnap = await getDoc(docRef);
        onSnapshot(doc(db, collectionName, docID), (docInfo) => {
            //console.log("Current data: ", docInfo.data())

            var arrayMethod = {};

            arrayMethod = docInfo.data();

            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log('getSingleDocbyId : ', arrayMethod);
            }

            setData(arrayMethod);
        },
            (error) => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('Error in the Single Snapshot', error);
                }

                return error;
            });

    },

    updateSingleDocbyId: async function (collectionName, docID, loginData) {
        const locationRef = doc(db, collectionName, docID);

        const res = await updateDoc(locationRef, loginData);

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log('Updated Document with ID: ', JSON.stringify(res));
        }
    },

    getQueryDocsbyAsc: async function (collectionName, setData, keyName) {

        const collectionRef = collection(db, collectionName);

        const queryRef = query(collectionRef, orderBy(keyName, "asc"));

        const querySnapshot = await getDocs(queryRef);

        const roadMapArray = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            roadMapArray.push(doc.data());
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(" => ", doc.data());
            }
        });

        return setData(roadMapArray)

    },

    addAsubCollection: async function (collectionName, docID, subuCollectionName, subDocId, ballData) {

        const collectionRef = collection(db, collectionName);

        const res = await setDoc(doc(collectionRef, docID, subuCollectionName, subDocId), ballData);

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log('Added document of the Sub Collection with ID: ', JSON.stringify(res));
        }

    },

    getsubCollections: async function (collectionName, setData) {

        onSnapshot(collection(db, collectionName),
            (snapshot) => {
                console.log('Snapshot Data ', collectionName);

                var balls = [];

                snapshot.forEach((doc) => {
                    balls.push(doc.data());
                });
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log("Snapshot Balls Data: ", balls);
                }

                return setData(balls);
            }


        )
    },

    getsubCollectionsDetails: async function (collectionName, docID, setData) {
        onSnapshot(doc(db, collectionName, docID), (docInfo) => {
                console.log("collectionName ======= ", collectionName)
                console.log("collectionName ======= ", docID)
                var arrayMethod = {};
                arrayMethod = docInfo.data();
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('getSingleDocbyId : ', arrayMethod);
                }
                return setData(arrayMethod);
            },
            (error) => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log('Error in the Single Snapshot', error);
                }
                return error;
            }
        );
    }

}

export default CrudMethods;