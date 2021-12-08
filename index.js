const express = require('express')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/.well-known/assetlinks.json', (req, res) => {
    fs.readFile('views/pages/assetlinks.json', (error, data) => {
      if (error) {
        console.error(error);
        return;
      }
      res.setHeader('content-type', 'application/json')
      res.end(data)
    })
  })
  .get("/music_links/*", (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
