
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { FontAwesome } from 'react-web-vector-icons';
//import Footer from '../../components/Footer/Footer.js';
import Navbar from '../../components/NavBar/Navbar.js';
import AWS from 'aws-sdk'

const S3_BUCKET = 'lostboyassets';
const REGION = 'us-east-1';

AWS.config.update({
  httpsOptions: {
    timeout: 3000 * 1000,
    connectTimeout: 3500 * 1000,
  },
  accessKeyId: 'AKIAUU2HG4NYALZYDRSH',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const adminuploadregular = () => {
  let history = useHistory();

  const [scrollingImages, setScrollingImages] = useState([]);

  const [footer, setFooter] = useState('');

  const UpdateSmartContract = async () => {

    var scrollingList = [];
    if (scrollingImages[0].name) {
      for (var i = 0; i < scrollingImages.length; i++) {
        console.log("scrollingList 11111 ======== ", scrollingImages.length);
        const storageRef = ref(storage, '/Images/Assets/scrollImage' + i + '.png');
        await uploadBytes(storageRef, scrollingImages[i]);
        var scrollImageURL = "";
        await getDownloadURL(storageRef).then((url) => { scrollImageURL = url });
        scrollingList.push(scrollImageURL);
      }
      console.log("scrollingList ======== ", JSON.stringify(scrollingList));
    } else {
      scrollingList = scrollingImages;
    }
    alert("Updated Successfully.");
  }



  const [fileName, setFileName] = useState('');


  //Excel Sheet function
  const fileHandler = (event) => {
    var abc = [3, 4]; //for video
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        // console.log("response ======== ", resp)
        var abc111 = 0;
        for (var i = 1; i <= 2323; i++) {
          if (abc.includes(i)) {
            console.log("abc111 ----- " + abc111);
            var aaa = (resp.rows[abc111][0]).split('#');
            console.log("aaa is", aaa)
            console.log("id ============ " + aaa[1] + " ---- " + i)
            for (var j = 0; j < resp.rows[abc111].length; j++) {
              var NFTDetailsMeta = {
                "tokenid": i,
                "name": aaa[0] + "#" + i,
                "symbol": resp.rows[abc111][1],
                "description": resp.rows[abc111][2],
                "image": "https://lostboyassets.s3.amazonaws.com/tokens/" + i + ".mp4",
                "downloadUrl": "https://lostboyassets.s3.amazonaws.com/tokens/" + i + ".zip",
                "attributes": [
                  {
                    "trait_type": "backgrounds",
                    "value": resp.rows[abc111][4]
                  },
                  {
                    "trait_type": "skin color",
                    "value": resp.rows[abc111][5]
                  },
                  {
                    "trait_type": "mouth",
                    "value": resp.rows[abc111][6]
                  },
                  {
                    "trait_type": "eyes",
                    "value": resp.rows[abc111][7]
                  },
                  {
                    "trait_type": "eyewear",
                    "value": resp.rows[abc111][8]
                  },
                  {
                    "trait_type": "clothes",
                    "value": resp.rows[abc111][9]
                  },
                  {
                    "trait_type": "accessories",
                    "value": resp.rows[abc111][10]
                  }
                ]
              }
            }
            abc111++;
          } else {
            console.log("abc111 ----- " + abc111);
            var aaa = (resp.rows[abc111][0]).split('#');
            console.log("aaa is", aaa)
            console.log("id ============ " + aaa[1] + " ---- " + i)
            for (var j = 0; j < resp.rows[abc111].length; j++) {
              var NFTDetailsMeta = {
                "tokenid": i,
                "name": aaa[0] + "#" + i,
                "symbol": resp.rows[abc111][1],
                "description": resp.rows[abc111][2],
                "image": "https://lostboyassets.s3.amazonaws.com/tokens/" + i + ".jpg",
                "audio_url": "https://lostboyassets.s3.amazonaws.com/tokens/" + i + ".mp3",
                "downloadUrl": "https://lostboyassets.s3.amazonaws.com/tokens/" + i + ".zip",
                "attributes": [
                  {
                    "trait_type": "backgrounds",
                    "value": resp.rows[abc111][4]
                  },
                  {
                    "trait_type": "skin color",
                    "value": resp.rows[abc111][5]
                  },
                  {
                    "trait_type": "mouth",
                    "value": resp.rows[abc111][6]
                  },
                  {
                    "trait_type": "eyes",
                    "value": resp.rows[abc111][7]
                  },
                  {
                    "trait_type": "eyewear",
                    "value": resp.rows[abc111][8]
                  },
                  {
                    "trait_type": "clothes",
                    "value": resp.rows[abc111][9]
                  },
                  {
                    "trait_type": "accessories",
                    "value": resp.rows[abc111][10]
                  }
                ]
              }
            }
            abc111++;

          }

          //Json File
          const myJSON = JSON.stringify(NFTDetailsMeta);
          console.log("json file", myJSON);

          //upload on s3 and save in tokens folder where all main nfts are stored 
          // var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
          var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
          console.log("NFTDetails", NFTDetailsMeta)
          const params = {
            ACL: 'public-read',
            Body: myJSON,
            Bucket: S3_BUCKET,
            Key: NFTDetailKey,
            ContentType: 'application/json'
          };

          myBucket.putObject(params)
            .on('httpUploadProgress', async (evt) => {
              console.log("evnt is", evt)
            })
            .send((err) => {
              if (err) console.log(err)
            })
        }

        console.log("response ============ ", resp)
      }
    });

  }

  //For Images
  const onScrollSelect = (event) => {
    console.log("Event trdgfgfdgdfg", event.target.files[0].name);
    var abc = [];
    var list = [];
    var abc111 = 0;

    for (var i = 1; i <= 2323; i++) {
      if (i <= (event.target.files).length) {
        if (abc.includes(i)) {
        } else {
          var checkFileName = (event.target.files[abc111].name).split(".png");
          console.log('file name111', checkFileName);
          var c = abc111 + 1;
          console.log("CCC", c);
          //We need to upload all but for now we are doing it in batches like for first 1200 i<=1200 && for last 1200 i> 1200. 
          if (checkFileName[0] && i <= 1200) {
            console.log('file name', c + " ----- " + i);
            list.push(event.target.files[abc111])

            var imageId = 'tokens/' + i + '.png';
            //var imageId =  'tokens/' + i+ '/metadata.png';
            console.log("event.target.files[abc111]", event.target.files[abc111])
            const params = {
              ACL: 'public-read',
              Body: event.target.files[abc111],
              Bucket: S3_BUCKET,
              Key: imageId,
              ContentType: 'image/png'
            };

            myBucket.putObject(params)
              .on('httpUploadProgress', (evt) => {
                console.log("evnt is ===== " + abc111 + " ----- " + i, evt)

              })
              .send((err) => {
                if (err) console.log(err)
              })
          } else {

          }
          abc111++;
        }
      } else {
        break;
      }
    }

  };


  //For Video
  const onScrollSelectVideo = (event) => {
    console.log("Event trdgfgfdgdfg", event.target.files[0].name);
    var abc = [];
    var list = [];
    var abc111 = 0;

    for (var i = 1; i <= 2323; i++) {
      if (i <= (event.target.files).length) {
        if (abc.includes(i)) {
        } else {
          var checkFileName = (event.target.files[abc111].name).split(".mp4");
          console.log('file name111', checkFileName);
          var c = abc111 + 1;
          console.log("CCC", c);
          //We need to upload all but for now we are doing it in batches like for first 1200 i<=1200 && for last 1200 i> 1200. 
          if (checkFileName[0] && i <= 1200) {
            console.log('file name', c + " ----- " + i);
            list.push(event.target.files[abc111])

            var imageId = 'tokens/' + i + '.mp4';
            //var imageId =  'tokens/' + i+ '/metadata.png';
            console.log("event.target.files[abc111]", event.target.files[abc111])
            const params = {
              ACL: 'public-read',
              Body: event.target.files[abc111],
              Bucket: S3_BUCKET,
              Key: imageId,
              ContentType: 'video/mp4'
            };

            myBucket.putObject(params)
              .on('httpUploadProgress', (evt) => {
                console.log("evnt is ===== " + abc111 + " ----- " + i, evt)

              })
              .send((err) => {
                if (err) console.log(err)
              })
          } else {

          }
          abc111++;
        }
      } else {
        break;
      }
    }

  };

  //For Zip
  const onScrollSelectZip = (event) => {
    console.log("Event trdgfgfdgdfg", event.target.files[0].name);
    var abc = [];
    var list = [];
    var abc111 = 0;

    for (var i = 1; i <= 2323; i++) {
      if (i <= (event.target.files).length) {
        if (abc.includes(i)) {
        } else {
          var checkFileName = (event.target.files[abc111].name).split(".mp4");
          console.log('file name111', checkFileName);
          var c = abc111 + 1;
          console.log("CCC", c);
          //We need to upload all but for now we are doing it in batches like for first 1200 i<=1200 && for last 1200 i> 1200. 
          if (checkFileName[0] && i <= 1200) {
            console.log('file name', c + " ----- " + i);
            list.push(event.target.files[abc111])

            var imageId = 'tokens/' + i + '.mp4';
            //var imageId =  'tokens/' + i+ '/metadata.png';
            console.log("event.target.files[abc111]", event.target.files[abc111])
            const params = {
              ACL: 'public-read',
              Body: event.target.files[abc111],
              Bucket: S3_BUCKET,
              Key: imageId,
              ContentType: 'application/zip'
            };

            myBucket.putObject(params)
              .on('httpUploadProgress', (evt) => {
                console.log("evnt is ===== " + abc111 + " ----- " + i, evt)

              })
              .send((err) => {
                if (err) console.log(err)
              })
          } else {

          }
          abc111++;
        }
      } else {
        break;
      }
    }

  };

  return (
    <div>

      <div className={"root-div"}>
        <div className={"sub-root-div12"} style={{ marginBottom: 100 }}>
          <div className={"homepage-head"} style={{ height: '100%', width: '100%' }}>
            <div className={"h1-style1"}>{"Edit Home Page"}</div>
          </div>
          <div style={{ marginBottom: 30, marginTop: 60, }}>
            <span style={{ fontSize: 24, fontWeight: 'bold', borderRadius: 50, padding: '5px 30px', backgroundColor: '#eee' }}>{'Home Page'}</span>
          </div>
          <div className='grey-box-css' style={{ margin: 15 }}>
            <div style={{ marginBottom: 30, padding: 20, display: 'flex', flexDirection: 'column' }}>

              <div className='inside-modal-input-scroll'>
                <label style={{ flex: 0.4, textAlign: 'left', fontWeight: 'bold', marginRight: 20 }}>Scrolling Images Regular Goats</label>
                <div style={{ flex: 0.6, width: '100%' }}>
                  <h1>For Images</h1>
                  <input onChange={onScrollSelect} type="file" name="myImage" multiple />
                  <h1>For Video</h1>
                  <input onChange={onScrollSelectVideo} type="file" name="myImage" multiple />
                  <h1>For Zip</h1>
                  <input onChange={onScrollSelectZip} type="file" name="myImage" multiple />
                  <br />
                  {scrollingImages && scrollingImages.length >= 5 && scrollingImages.length <= 10 &&
                    (
                      <div className='scroll-image-div'>
                        {
                          (scrollingImages).map((link) => { return <img src={link.name ? URL.createObjectURL(link) : link} style={{ height: 150, margin: 10 }} alt="Scrolling Image" /> }
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>

            </div>

            <div class="admin-working-panel">
              <h1>Choose Excel File </h1>
              <input onChange={(event) => { setFileName(event) }} type="file" style={{ "padding": "10px" }} />

              <button onClick={() => { fileHandler(fileName) }} style={{ backgroundColor: '#000', color: '#fff', display: 'flex', width: '100%', padding: '10px', justifyContent: 'center', border: 'none', borderRadius: 50 }}>
                <span style={{ fontSize: 18, fontWeight: 'bold' }}>Publish NFTs</span>
              </button>

            </div>

            <button onClick={() => { UpdateSmartContract() }} style={{ backgroundColor: '#000', color: '#fff', display: 'flex', width: '100%', padding: '10px', justifyContent: 'center', border: 'none', borderRadius: 50 }}>
              <span style={{ fontSize: 18, fontWeight: 'bold' }}>Update Home Page</span>
            </button>
          </div>
        </div>
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default adminuploadregular;

