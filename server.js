var express = require('express')
var app = express()
var jade = require('jade')
var fs = require('fs')

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/:file', function (req, res) {
  const file = req.params.file;

  if (fs.existsSync('views/'+file+'.pug'))
    res.render(file)
  else
    res.render('default')

})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
