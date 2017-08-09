var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');
var bodyparser = require('body-parser');

// node filesystem to delete file when it's loaded to uploads folder
var fs = require('fs');

var app = express();

app.use( bodyparser.json() ); 

app.use(express.static(path.join(__dirname, 'public')));


app.post('/filedata', upload.single('file'), function(req, res, next) {

	var allFileInfo = req.file;
	var fileName = req.file.filename;

	// As we need only the filedata we directly delete the file in the uploads folder
	fs.unlink('uploads/' + fileName, function(err){
		if(err) throw err;
	});

	return res.json(allFileInfo);

}); 

// forward back to Index Page 
app.get('/filedata', function (req,res) {
	console.log("filedata get");
	 res.redirect("/");
})

app.listen(3000);