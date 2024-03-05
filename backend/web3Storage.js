const { filesFromPaths } = require("files-from-path")
require('dotenv').config({ path: '../.env' });


const web3StorageUpload = async () => {
  const { create } = await import('@web3-storage/w3up-client');

  // Creating the Client
  const client = await create()

  // Logging in to the client
  await client.login(process.env.W3UP_EMAIL)

  // Setting the did for our space
  await client.setCurrentSpace(process.env.W3UP_DID)


  const filePath = './uploads/';
  const files = await filesFromPaths(filePath);

  // for uploading the files
  const directoryCid = await client.uploadDirectory(files)
  const cid = directoryCid.toString();
  console.log("File Uploaded to IPFS")
  return cid;
}

// web3StorageUpload()
module.exports = { web3StorageUpload };