var express = require('express')
var app = express()
var jade = require('jade')
var fs = require('fs')

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
      let index = files.indexOf('default.pug');
      files.splice(index, 1);

      files = files.map( (t) => t.replace(".pug", "") )
      files = files.map( (t) => '<a href="/' + t + '">' + t + '</a>' )

      let list = files.join("<br/>")
      res.send(list)
    })
  else
    res.render('default')

})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
