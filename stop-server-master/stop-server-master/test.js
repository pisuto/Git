// var request = require('supertest')
// var server = require('./')

// request('http://localhost:5709').get('/').expect(200, function(err){
//   if (err) throw err
//   process.exit()
// })

var child_process=require("child_process")
child_process.execFile("app.bat",null,{cwd:'C:\\Users\\user\\Desktop'},function(error,stdout,stderr){
    if(error !==null){
        console.log("exec error"+error)
    }
    else console.log("成功")
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
})