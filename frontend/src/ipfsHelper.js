const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;


// bufffer is the file name
// ipfsHelper.files.add(buffer, async (error, result) => {
//   if (error) {
//     console.error(error)
//     return
//   }
