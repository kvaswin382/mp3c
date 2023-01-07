(function(){
  
  var ffmpeg = require('fluent-ffmpeg')
  const express = require('express')
  const app = express()
  
  const base64 = (str) => {
   return Buffer.from(str).toString('base64')
  }
  
  const fileName = () => {
    let date = Date.now()
    return base64(date)+'.mp3'
  }
  
  app.get('/mp3/:url', (req,res) => {
    
    let url = decodeURIComponent(req.params.url)
    console.log(url)
    const mp3_file = fileName()
    ffmpeg(url)
    .toFormat('mp3')
    .saveToFile(mp3_file, (stdout,stderr) => {
      console.log('Converted')
    })
    .on('error', (err) => {
      console.log(err)
    })
    .on('progress', (prog) => {
      console.log('...'+prog)
    })
    .on('end',() => {
      console.log('Finished')
    })
    .run()
    const mp3_path = mp3_file
    const data = {
      'ok': true,
      'mp3': mp3_path
    }
    res.json(data)
  })
  
})
