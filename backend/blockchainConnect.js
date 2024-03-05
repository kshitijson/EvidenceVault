const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const blockchainInsert = async (id, caseNo, caseName, fileName, fileType, fileHash, _status_) => {
    const Web3 = require("web3");

    // setup a http provider
    let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


    const filePath = path.join(__dirname, '../blockchain/build/contracts/EPB.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = await JSON.parse(data);

    var contractAddress = process.env.CONTRACT_ADDRESS;
    let abi = (jsonData.abi);

    // Creating an instance of the contract
    const contract = new web3.eth.Contract(abi, contractAddress);

    //calling insert evidence method
    await contract.methods.insertEvidence(id, caseNo, caseName, fileName, fileType, fileHash, _status_).send({ from: process.env.FROM_ADDR, gas: 3000000 })
        .then((receipt) => {
            console.log("Evidence data uploaded on blockchain");
        })
        .catch((error) => {
            console.error(error);
        });
}


const getEvidencesLink = async (_caseNo_, _fileNames_) => {
    const Web3 = require("web3");

    // setup a http provider
    let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


    const filePath = path.join(__dirname, '../blockchain/build/contracts/EPB.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = await JSON.parse(data);

    var contractAddress = process.env.CONTRACT_ADDRESS;
    let abi = (jsonData.abi);

    // Creating an instance of the contract
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        const evidenceList = await contract.methods.viewEvidence(_caseNo_).call();
        const result = {};
        for (let i = 0; i < _fileNames_.length; i++) {
            const fileName = _fileNames_[i];
            const evidence = evidenceList.find((e) => e.file_name === fileName);
            if (evidence) {
                result[_fileNames_[i]] = {
                    file_hash_ipfs: `https://${evidence.file_hash_ipfs}.ipfs.w3s.link/${evidence.file_name}`,
                    id: evidence.id
                };
            }
        }
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const insertLog = async (id, caseNo, caseName, fileName, fileType, _status_) => {
    const Web3 = require("web3");

    // setup a http provider
    let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


    const filePath = path.join(__dirname, '../blockchain/build/contracts/EPB.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = await JSON.parse(data);

    var contractAddress = process.env.CONTRACT_ADDRESS;
    let abi = (jsonData.abi);

    // Creating an instance of the contract
    const contract = new web3.eth.Contract(abi, contractAddress);

    //calling insert evidence method
    await contract.methods.insertNewEvidence(id, caseNo, caseName, fileName, fileType, _status_).send({ from: process.env.FROM_ADDR, gas: 3000000 })
        .then((receipt) => {
            console.log("Log uploaded on blockchain");
        })
        .catch((error) => {
            console.error(error);
        });
}

const chainOfCustody = async (caseNo) => {
    const Web3 = require("web3");

    // setup a http provider
    let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));


    const filePath = path.join(__dirname, '../blockchain/build/contracts/EPB.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = await JSON.parse(data);

    var contractAddress = process.env.CONTRACT_ADDRESS;
    let abi = (jsonData.abi);

    // Creating an instance of the contract
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        const result = await contract.methods.viewEvidenceByCaseNo(caseNo).call();
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    blockchainInsert,
    getEvidencesLink,
    insertLog,
    chainOfCustody
};