var env = require('node-env-file')
var express = require('express')
var app = express()
var jade = require('jade')
var fs = require('fs')

env(__dirname + '/.env')

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/:file?', function (req, res) {
  const file = req.params.file;
  const viewsDir = 'views';

  if (fs.existsSync(viewsDir+'/'+file+'.pug'))
    res.render(file)
  else if (file === undefined)
    fs.readdir(viewsDir, (err, files) => {
      //remove default view in list
      // let index = files.indexOf('default.pug');
      // files.splice(index, 1);
      //
      // files = files.map( (t) => t.replace(".pug", "") )
      // files = files.map( (t) => '<a href="/' + t + '">' + t + '</a>' )
      //
      // let list = files.join("<br/>")
      fs.readFile('./slides.json', 'utf8', (err, data) => {
          if (err) throw err;
          let list = JSON.parse(data)

          res.render('index', {items: list})
      });
    })
  else
    res.render('default')

})

const port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port '+port+'!')
})
