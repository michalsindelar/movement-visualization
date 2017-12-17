const express = require('express');
const path = require('path');
const fs = require('fs');
const NodeCache = require('node-cache');
const R = require('ramda');

const ApisCache = new NodeCache();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

// Formatters
// ===
const limitResults = R.compose(
  // R.take(20),
  R.prop('data')
)
// Get filenames of particular filetype
// ===
function getFilenamesFromDir(startPath,filter){

  let res = []

  if (!fs.existsSync(startPath)){
    console.log("no dir ",startPath);
    return res;
  }

  const files = fs.readdirSync(startPath);

  for(let i=0;i<files.length;i++){
    let filename=path.join(startPath,files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
      res = R.union(res, getFilenamesFromDir(filename, filter)); //recurse
    }

    else if (filename.indexOf(filter)>=0) {
      console.log(filename)
      res.push(filename)
    }

  }
  return res
}


// Helper for cached api requests
// ===
const cachedApiRequest = (res, key) =>  {
  res.set('Content-Type', 'application/json');
  let data

  try {
    data = ApisCache.get(key, true);
  } catch (e) {
    // Not cached / needs update
    ApisCache.set(key, fs.readFileSync(path.resolve(__dirname, `../fixtures/${key}.json`)));
    data = ApisCache.get(key)
  } finally {
    res.send(limitResults(JSON.parse(data)))
  }
}

// Set cors headers<x
// ===
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Apis
// ===
app.get('/getMovementData', function (req, res) {
  // cachedApiRequest(res, '')
  res.send(getFilenamesFromDir('fixtures', '.bvh'))
});


// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../app/build')));


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});