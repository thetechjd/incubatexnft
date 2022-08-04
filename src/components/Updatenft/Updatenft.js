import React, { useReducer, useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from "axios";
import AWS from 'aws-sdk'

const S3_BUCKET = 'lofastag';
const REGION = 'us-east-1';

AWS.config.update({
  httpsOptions: {
    timeout: 3000 * 1000,
    connectTimeout: 3500 * 1000,
  },
  accessKeyId: 'AKIAVLT2Y4UVDVS3ONGD',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const Updatenft = () => {
  const ERC721TransferABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "IsonSaleToken", "outputs": [{ "internalType": "bool", "name": "status", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_MintedForPromotion", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PreSaleMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRICE_PER_NFT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PreSale_PRICE_PER_NFT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_getOnSalePlatformTokens", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "tokenPrice", "type": "uint256" }], "name": "_setTokenPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "collection_Supply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getCurrentPriceOfToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMyNFTs", "outputs": [{ "components": [{ "internalType": "uint256", "name": "token", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "internalType": "struct legendsofasians.myStruct[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "myStructs", "outputs": [{ "internalType": "uint256", "name": "token", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "preSaleGoatsMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "numberOfTokens", "type": "uint16" }], "name": "preSalemint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "presaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "baseURI", "type": "string" }], "name": "setMetaBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setPreSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "active", "type": "bool" }], "name": "setSaleIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transfergg", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  var contractAddress = "0x06921a86cDCf973F5133B6db78f413DaCf84f4f0";

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getData()
      console.log("After 1 hr")
    }, 3600000);

    return () => clearInterval(intervalID);
  }, []);


  const getData = async () => {

    const web3 = new Web3("https://rinkeby.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
    const daiToken = new web3.eth.Contract(ERC721TransferABI, contractAddress);
    console.log("daiToken>>", daiToken.methods.getMyNFTs().call())
    // if(calculatedHrs>=48){
    await daiToken.methods.getMyNFTs().call().then((data) => {
      data.map((e) => {
        console.log("getData timestamp---->", e["timestamp"])
        console.log("getData token---->", e["token"])
        var timestampValue = e["timestamp"]
        const date = new Date();
        const timestamp = date.getTime();
        const currentTimeStamp = Math.floor(timestamp / 1000);
        const difference = currentTimeStamp - timestampValue;
        var calculatedHrs = Math.floor(difference / 3600)
        var calculatedMinutes = difference / 60//For testing purpose using minutes
        console.log("calculatedMinutes", parseInt(calculatedMinutes))
        console.log("calculatedHrs", parseInt(calculatedHrs))
        var calmin = parseInt(calculatedMinutes);
        var calhrs = parseInt(calculatedHrs);
        console.log("calhrs", calhrs)
        if (calhrs >= 48) {
          console.log("run api now")
          var token = e["token"]
          updateUrl(token);
        }

      })



    }).catch((error) => {

      console.log("error ============ ", error)
    });
  }


  const updateUrl = (token) => {

    const web3 = new Web3("https://rinkeby.infura.io/v3/c4a896a1ff0e489fb4f730d8908d16b2");
    const daiToken = new web3.eth.Contract(ERC721TransferABI, contractAddress);
    const myMethod = daiToken.methods['tokenURI(uint256)'](token)
    myMethod.call().then(function (result) {
      console.log("url is", result)
      GetMetaData(token, result);
    })
  }

  const GetMetaData = (token, url) => {
    console.log("GetMetaData url", url)
    axios.get('https://tranquil-garden-15529.herokuapp.com/' + url)
      .then((response) => {
        const responseData = response.data;
        console.log("Value of array is", responseData)
        var NFTDetailsMeta = {
          "tokenid": token,
          "name": responseData.name,
          "symbol": responseData.symbol,
          "description": responseData.description,
          "image": "https://lofastag.s3.amazonaws.com/tetherImg/" + token + ".png",
        }
        console.log("Value NFTDetailsMeta", NFTDetailsMeta)
        const myJSON = JSON.stringify(NFTDetailsMeta);
        console.log("json file", myJSON);

        //upload on s3 and save in tokens folder where all main nfts are stored 
        // var NFTDetailKey = 'tokens/' + NFTDetailsMeta.tokenid + '/metadata.json';
        var NFTDetailKey = 'tether/' + NFTDetailsMeta.tokenid + '.json';
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
        console.log("myBucket")
      }).catch((error) => {
        console.log("Error in GetMetadata Api---->", error)
      })
  }

  return (
    <div>

    </div>
  );
}

export default Updatenft;