// const fs = require('fs');
// const path = require('path');
// require('dotenv').config({path: '../.env'});

// const Web3 = require("web3");

// // setup a http provider
// let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


// const filePath = path.join(__dirname, '/build/contracts/EPB.json');
// const data = fs.readFileSync(filePath, 'utf8');
// const jsonData = JSON.parse(data);

// var contractAddress = process.env.CONTRACT_ADDRESS;


// let abi = (jsonData.abi);


// const contract = new web3.eth.Contract(abi, contractAddress);


// // call insertEvidence function
// /* const caseNo = 123;
// const caseName = 'case';
// const fileName = 'video';
// const fileType = 'mp4';
// const fileHash = '1234567890123456789012345678901239027890123456789012345678900911';
// contract.methods.insertEvidence(caseNo, caseName, fileName, fileType, fileHash).send({ from: process.env.FROM_ADDR, gas: 3000000 })
//   .then((receipt) => {
//     console.log(receipt.transactionHash);
//   })
//   .catch((error) => {
//     console.error(error);
//   }); */


//   // let evidenceList;
//   // contract.methods.viewEvidence(333).call().then((evidences) => {
//   //   evidenceList = evidences;
//   // }).catch((err) => {
//   //   console.error(err);
//   // })

//   // setTimeout(() => {
//   //   console.log(evidenceList);
//   // }, 1000);


//   // const getFileHashesWithIds = async (fileNames) => {
//   //   const evidenceList = await contract.methods.viewEvidence(100).call();
//   //   const result = {};
//   //   for (let i = 0; i < fileNames.length; i++) {
//   //     const fileName = fileNames[i];
//   //     const evidence = evidenceList.find((e) => e.file_name === fileName);
//   //     if (evidence) {
//   //       result[fileNames[i]] = {
//   //         file_hash_ipfs: "ipfs.io/ipfs/" + evidence.file_hash_ipfs,
//   //         id: evidence.id
//   //       };
//   //     }
//   //   }
//   //   return result;
//   // };
  
//   // getFileHashesWithIds(['road-accident.jpg'])
//   //   .then((result) => console.log(result))
//   //   .catch((error) => console.error(error));
  




// /* var transactionHash = '0xd28b5d028a63c7779aec302639f3405d436f838fdc7d940157be00bf6c530547'; */
// /* const transaction = web3.eth.getTransaction(transactionHash);

// const input = transaction.input;
// const decodedData = web3.eth.abi.decodeParameters(['uint256', 'string', 'string', 'string', 'string'], input);

// let case_name = decodedData[0];
// console.log(case_name); */


// /* web3.eth.getTransaction(transactionHash)
//   .then((transaction) => {
//     const inputData = transaction.input;
//     // Process the input data here
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const decodedInput = contract.methods.myFunctionName(...).decodeFunctionInput(inputData);

// console.log(decodedInput); */