var path = require('path')
var util = require('util')
var express = require('express')
var address = require('network-address')
var updateNotifier = require('update-notifier')
var powerOff = require('power-off')
var sleepMode = require('sleep-mode')
var pkg = require('./package.json')
// for open a window
var child_process = require("child_process")

var app = express()
var notifier = updateNotifier({ pkg: pkg })

app.use(express.static(path.join(__dirname, 'public')))

app.delete('/', function (req, res) {
  res.end()
  util.log('exit')
  process.exit()
})

app.post('/power-off', function (req, res) {
  powerOff(function (err, stderr, stdout) {
    if (err) {
      util.log(err)
      res.status(500).json({ error: 'Can\'t run power-off' })
    } else {
      res.end()
    }
  })
})

app.post('/sleep', function (req, res) {
  sleepMode(function (err, stderr, stdout) {
    if (err) {
      util.log(err)
      res.status(500).json({ error: 'Can\'t run sleep' })
    } else {
      res.end()
    }
  })
})

app.get('/address', function (req, res) {
  res.json({ address: address() })
})

app.get('/update', function (req, res) {
  updateNotifier({
    pkg: pkg,
    callback: function (err, update) {
      if (err) return res.json({})
      res.json(update)
    }
  })
})

app.get('/open', function (req, res) {
  child_process.execFile("app.bat",null,{cwd:'C:\\Users\\user\\Desktop'}, function(error,stdout,stderr){
    if(error !== null){
        console.log("exec error"+error)
    }
    else console.log("成功")
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
})

var port = 5709

app.listen(port, function () {
  util.log('stop-server listening on port ' + port)
})
