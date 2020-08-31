const express = require('express');
const bodyParser = require('body-parser');
const ipfsClient = require('ipfs-http-client');
var cors = require('cors');
const app = express();
const { dirname } = require('path');
const port = process.env.PORT || 4000;
const fs = require('fs');

const path = require('path');

const ipfs = new ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// CORS , to give access
app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/static', express.static(path.join(__dirname, '../build/contracts')));
app.use('/articles', express.static(path.join(__dirname, '../Articles')));

app.post('/postData', async (req,res,next)=> {

  const data = req.body;
  var filename = Date.now();
  var filePath = '../Articles/' + filename + '.txt';

  addFile(filename, filePath, req.body)
  .then(r=>{
    res.send({data: r});
  })
  .catch(e=>{
    console.log(r)
  })
});

const addFile = async (filename, filePath, data) => {
  return new Promise(function(resolve, reject){
  fs.appendFile(filePath, JSON.stringify(data), async function (err) {
    if (err) throw err;

    const file = fs.readFileSync(filePath);
    await ipfs.add({path: filename, content: file})
      .then(r=>{
        console.log(r.cid);
        resolve((r.cid).toString());
      })
      .catch(e=>{
        console.log(e);
        reject(e);
      })
    })
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
